// Synchronize the static homepage from the same modules used by browser navigation.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = {window: {}, document: {}, location: {hash: '#home'}, Date, Intl, URLSearchParams, setTimeout};
vm.createContext(context);
for (const name of ['data', 'shared', 'discovery', 'views']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'dist/js', name + '.js'), 'utf8'), context);
}
const L = context.window.Luna;
const home = L.businessText(L.pages.home());
if (!home.includes('immersive-hero') || !home.includes('occasion-shopping') || !home.includes('celebration-paths')) throw new Error('Incomplete homepage.');
const shell = fs.readFileSync(path.join(root, 'templates/shell.html'), 'utf8');
fs.writeFileSync(path.join(root, 'dist/index.html'), L.businessText(shell.replace('<!-- HOME_CONTENT -->', home)));
console.log('Static celebration-brand homepage generated; ' + home.length + ' characters.');
