const mysql = require('mysql');
const envs = {
  dev: {
    connectionLimit: 100,

    debug:  false
  }
};

let pools = {}

exports.getOrCreatePool = (env = '') => {
  let config = envs[env];

  if(config === undefined) {
    throw 'Invalid Env';
  }

  pools[env] = pools[env] || mysql.createPool(config);

  return pools[env];
}