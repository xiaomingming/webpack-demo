function buildConfig(env) {
  // console.log('env is:' + env);
  return require('./webpack.' + env + '.js')({
    env: env
  })
}
module.exports = buildConfig;