var webpackConfig = require('./webpack.test');


module.exports = function (config) {
    var _config;
    _config = {
        basePath: '',
        files: [
            {pattern: './karma-test-shim.js', watched: false}
        ],
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        frameworks: ['jasmine'],

        webpack: webpackConfig,

        webpackServer: {
            noInfo: false
        },
        client:{
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            captureConsole:true,
        },

        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
        },


        angularCli: {
            environment: 'dev'
        },
        retryLimit:0,
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    };

  config.set(_config);
};
