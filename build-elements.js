const fs = require('fs-extra');
const concat = require('concat');
const cheerio = require('cheerio');

(async function build() {
  const files = [
    './dist/@senzing/sdk-components-web/runtime.js',
    './dist/@senzing/sdk-components-web/polyfills.js',
    './dist/@senzing/sdk-components-web/main.js'
  ];

  await fs.ensureDir('./dist/@senzing/sdk-components-web/');
  await concat(files, './dist/@senzing/sdk-components-web/senzing-components-web.js');

  await fs.rename('./dist/@senzing/sdk-components-web/styles.css','./dist/@senzing/sdk-components-web/senzing-components-web.css');
  await fs.copy(
    './node_modules/@senzing/sdk-components-ng/styles/themes',
    './dist/@senzing/sdk-components-web/themes'
  ).catch(()=>{ console.log('build error #1'); });
  await fs.copyFile(
    './projects/sdk-components-web/package.json',
    './dist/@senzing/sdk-components-web/package.json'
  ).catch(()=>{ console.log('build error #2'); });
  await fs.copyFile(
    './README.md',
    './dist/@senzing/sdk-components-web/README.md'
  ).catch(()=>{ console.log('build error #3'); });

  // remove extraneous files
  await fs.remove('./dist/@senzing/sdk-components-web/favicon.ico').catch(()=>{ console.log('build error #4'); });
  await fs.remove('./dist/@senzing/sdk-components-web/polyfills.js').catch(()=>{ console.log('build error #5'); });
  await fs.remove('./dist/@senzing/sdk-components-web/runtime.js').catch(()=>{ console.log('build error #6'); });
  await fs.remove('./dist/@senzing/sdk-components-web/main.js').catch(()=>{ console.log('build error #7'); });

  // rename index.html to example.html
  // await fs.rename('./dist/@senzing/sdk-components-web/index.html','./dist/@senzing/sdk-components-web/example.html').catch(()=>{ console.log('build error #8'); });

  // replace script refs in example.html
  await fs.readFile((__dirname + '/dist/@senzing/sdk-components-web/index.html'), {encoding: 'utf8'}, (error, data) => {
    if(error){
      console.log('build error #8');
      return;
    }
    var $ = cheerio.load(data); // load in the HTML into cheerio
    // remove base
    $('base').remove();

    // remove all other scripts
    $('script[src="runtime.js"]').remove();
    $('script[src="polyfills.js"]').remove();

    // replace with bundle script
    $('script[src="main.js"]').attr('src','senzing-components-web.js');

    // replace stylesheet with bundled one
    $('link[href="styles.css"]').attr('href', 'senzing-components-web.css');

    // write file
    fs.writeFile((__dirname + '/dist/@senzing/sdk-components-web/example.html'), $.html(), (error) => {
      if(error){
        console.error('build error #9');
        return;
      }
      // now remove original
      fs.remove('./dist/@senzing/sdk-components-web/index.html', (err)=>{
        if(err){
          console.log('build error #10');
        }
      });
    });
  });

})();
