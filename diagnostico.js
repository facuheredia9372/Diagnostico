const { execSync } = require('child_process');

console.log(process.version)
console.log(process.platform)
console.log(process.argv)
console.log(execSync('npm -v').toString().trim());
