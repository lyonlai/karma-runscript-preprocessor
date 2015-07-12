var shell = require('shelljs');

var runScriptOnChangePreprocessor = function(args, logger, config) {

  var log = logger.create('preprocessor.custom');

  var script = (config && config.script) || null;

  var stopOnError = (config && config.stopOnError) || false;

  var messageOnError = (config && config.messageOnError) || null;

  var runOnlyOnce = (config && config.runOnlyOnce) || null;

  var scriptHasRun = false;

  return function(content, file, done) {
    var result = null;

    if(runOnlyOnce && scriptHasRun) {
      log.debug('script has been executed, not gonna run again, exiting');
      return done(null, content);
    }

    if (script) {
      result = shell.exec(script);

      scriptHasRun = true;
    }

    log.debug('shell execution result', result);

    if (result && result.code !== 0 && stopOnError) {
      if (messageOnError) {
        log.error(messageOnError);
      }
      done(new Error(result.output), null);
    } else {
      done(null, content);
    }

  };
};

runScriptOnChangePreprocessor.$inject = ['args', 'logger', 'config.runscript'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:runscript': ['factory', runScriptOnChangePreprocessor]
};