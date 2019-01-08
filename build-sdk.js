const fs = require('fs-extra');
const concat = require('concat');
var sass = require('node-sass');

(async function build() {
  // do styles first
  await sass.render({
    file: "./projects/sdk/src/lib/scss/styles.scss",
    includePaths: ["./projects/sdk/src/lib/scss/"]
  }, function(err, result) {
    if(err){
      console.log('SASSY ERROR: ',err.message);
    } else {
      fs.writeFile('./dist/@senzing/sdk/styles/styles.css', result.css, function(err){
        if(!err){
          //file written on disk
        }
      });
    }
  });

  // now themes
  await fs.copy(
    './projects/sdk/src/lib/scss/themes',
    './dist/@senzing/sdk/styles/themes'
  ).catch((err)=>{
    console.log('build err #1: could not copy themes to package.');
  });

  // do readme and markdown files
  await fs.copyFile(
    './projects/sdk/README.md',
    './dist/@senzing/sdk/README.md'
  ).catch((err)=>{
    console.log('build err #2: could not copy README.md to package.');
  });
  await fs.copyFile(
    './projects/sdk/LICENSE',
    './dist/@senzing/sdk/LICENSE'
  ).catch((err)=>{
    console.log('build err #3: could not copy LICENSE to package.');
  });

})();
