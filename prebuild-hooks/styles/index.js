const fs = require('node:fs');
const path = require('node:path');

module.exports = () => {
  const colors = fs.readFileSync(path.resolve(__dirname, './colors.xml'));
  const styles = fs.readFileSync(path.resolve(__dirname, './styles.xml'));

  fs.writeFileSync(path.resolve(__dirname, '../../android/app/src/main/res/values/colors.xml'), colors);
  console.log('Rewrote colors.xml');

  fs.writeFileSync(path.resolve(__dirname, '../../android/app/src/main/res/values/styles.xml'), styles);
  console.log('Rewrote styles.xml');
};
