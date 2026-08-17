console.log('Versión de Node:', process.version);
console.log('Versión de NPM:', require('child_process').execSync('npm -v').toString().trim());
console.log('Versión de Git:', require('child_process').execSync('git --version').toString().trim());
