const { memoize, partial, isString } = require('lodash');
const pmx = require('pmx');
const pkg = require('./package');
const os = require('os');
const pm2 = require('pm2');
const ip = require('ip');
const loggerName = 'PM2-looger';
/******************************
 *    ______ _______ ______
 *   |   __ \   |   |__    |
 *   |    __/       |    __|
 *   |___|  |__|_|__|______|
 *
 *      PM2 Module
 *
 ******************************/

pmx.initModule({

  // Options related to the display style on Keymetrics
  widget : {

    // Logo displayed
    logo : 'https://app.keymetrics.io/img/logo/keymetrics-300.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme : ['#141A1F', '#222222', '#3ff', '#3ff'],

    // Section to show / hide
    el : {
      probes  : true,
      actions : true
    },

    // Main block to show / hide
    block : {
      actions : false,
      issues  : true,
      meta    : true,

      // Custom metrics to put in BIG
      main_probes : [loggerName]
    }

  }

}, (err, conf) => {

  function _getLogger(type) {
    console.log(`Creating logger for ${type}`);
    return require('logzio-nodejs').createLogger({
      token: conf.api_token,
      type
    })
  };

  const getLogger = memoize(_getLogger);


  function logEvent(source, data) {
    if (data.process.name !== pkg.name) {
      const logger = getLogger(data.process.name)
      const info = Object.assign({
        logger: loggerName,
        host: os.hostname(),
        'host-ip': ip.address(),
        'io-stream': source
      }, data)
      info[conf.env_key_name] = process.env.NODE_ENV || conf.default_env
      if (conf.log_string_as_message && isString(data.data)) {
        info.message = data.data
      }
      logger.log(info)
    }
  }

  pm2.launchBus((err, bus) => {
    bus.on('log:err', partial(logEvent, 'stderr'))
    bus.on('log:out', partial(logEvent, 'stdout'))
  });

});
