// Added handoff helper; invokes the unchanged original homepage generator.
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [path.join(root, 'scripts/render-home.cjs')], {cwd:root, stdio:'inherit'});
const output = path.join(root, 'build');
fs.rmSync(output, {recursive:true, force:true}); // Generated release files only.
fs.cpSync(path.join(root, 'dist'), output, {recursive:true});
console.log('Static release files ready in build/. No deployment performed.');
