var shell = require('shelljs');

var runScriptOnChangePreprocessor = function(args, logger, config) {

  var log = logger.create('preprocessor.custom');

  var script = (config && config.script) || null;

  var stopOnError = (config && config.stopOnError) || false;

  var messageOnError = (config && config.messageOnError) || null;

  return function(content, file, done) {
    var result = null;

    if (script) {
      result = shell.exec(script);
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