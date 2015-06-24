# karma-runscript-preprocessor

Runs a script on rebuild. Suitable to use on karma-webpack with a single test-loader file. The script execution can bail the test running if error happens, which is handy to run some checks even before the test run (e.g. jsxhint). 

# Installation

`npm install karma-runscript-preprocessor --save-dev`

# Configuration
    module.exports = function(config) {
      config.set({
        files: [
          'test-loader.js'
        ],

        preprocessors: {
          'test-loader.js': [ 'runscript', 'webpack' ]
        },
        runscript: {
          script: 'run-lint.sh', 'script, baseDir is your pwd'
          stopOnError: true, //on false it will not cancel the test run when script failed
          messageOnError: "(any message you want, even integration with CI)"
        }
    };
    
