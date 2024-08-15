const { version } = require('../../package.json')

const getVersion = () => {
  console.log(version) 
}

exports.getVersion = getVersion;