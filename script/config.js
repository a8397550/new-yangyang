const os = require('os');
const osPath = os.homedir();
const fs = require('fs');

module.exports = function () {
  try {
    const configBf = fs.readFileSync(`${osPath}\\yangyang.config.json`);
    const configStr = configBf.toString()
    const config = JSON.parse(configStr);

    return config;
  } catch (e) {
    console.error(e);
  }
}




