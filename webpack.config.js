function buildConfig(env) {
  console.log(`env is: ${env}`);
  console.log(`process env is: ${process.env.NODE_ENV}`);
  var file = require('./webpack.' + env + '.js');
  console.log(file);
  return require('./webpack.' + env + '.js')
}
module.exports = buildConfig;