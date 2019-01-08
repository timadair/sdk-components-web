const fs = require('fs-extra');
const concat = require('concat');
//var sass = require('node-sass');

(async function build() {
  const files = [
    './dist/@senzing/elements/runtime.js',
    './dist/@senzing/elements/polyfills.js',
    './dist/@senzing/elements/main.js'
  ];

  await fs.ensureDir('./dist/@senzing/elements/');
  await concat(files, './dist/@senzing/elements/senzing-components-web.js');

  await fs.rename('./dist/@senzing/elements/styles.css','./dist/@senzing/elements/senzing-components-web.css');
  await fs.copy(
    './node_modules/@senzing/sdk-components-ng/styles/themes',
    './dist/@senzing/elements/themes'
  ).catch(()=>{ console.log('build error #1'); });
  await fs.copyFile(
    './projects/elements/package.json',
    './dist/@senzing/elements/package.json'
  ).catch(()=>{ console.log('build error #2'); });
  await fs.copyFile(
    './projects/elements/README.md',
    './dist/@senzing/elements/README.md'
  ).catch(()=>{ console.log('build error #3'); });
  await fs.remove('./dist/@senzing/elements/favicon.ico').catch(()=>{ console.log('build error #4'); });
  await fs.remove('./dist/@senzing/elements/polyfills.js').catch(()=>{ console.log('build error #5'); });
  await fs.remove('./dist/@senzing/elements/runtime.js').catch(()=>{ console.log('build error #6'); });
  await fs.remove('./dist/@senzing/elements/main.js').catch(()=>{ console.log('build error #7'); });
  await fs.rename('./dist/@senzing/elements/index.html','./dist/@senzing/elements/example.html').catch(()=>{ console.log('build error #8'); });
})();
