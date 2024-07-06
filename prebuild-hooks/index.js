const fs = require('node:fs');

const hooks = fs.readdirSync(__dirname).filter((i) => i !== 'index.js');

hooks.forEach((i) => require(`./${i}`)());
