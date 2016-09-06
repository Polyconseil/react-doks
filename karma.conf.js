const webpack = require('webpack');
const path = require('path');

// Declaring the config setter for Karma :
module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'src/tests/__karma-setup__.js',
      'src/tests/**/*.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack'],
      // 'tests/karma/karma-setup.js': ['webpack'],
    },

    webpack: {
      devtool: 'eval',
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/',
      },
      plugins: [
        new webpack.NoErrorsPlugin(),
      ],
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: [
              path.join(__dirname, 'src'),
              path.join(__dirname, '../src/'),
              // path.join(__dirname, 'modules_overrides'),
              // path.join(__dirname, '..', 'test-utils') // First file to be run in karma
            ],
            exclude: [
              /simplemde\.min/,
            ],
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
          {
            test: /.css$/,
            loader: 'style-loader!css-loader',
          },
          {
            test: /.png|gif$/,
            loader: 'url-loader?limit=8192',
          },
          {
            test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/,
            loader: 'url-loader?limit=8192',
          },
          {
            test: /sinon\.js$/,
            loader: 'imports?define=>false,require=>false',
          },
        ],
      },
      resolve: {
        root: path.resolve('src'),
        alias: {
          'sinon': 'sinon/pkg/sinon',
        },
      },
      externals: {
        'react/lib/ReactContext': true,
        'react/lib/ExecutionEnvironment': true,
      },
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browserConsoleLogOptions: {
      level: 'info',
      format: '%b %T: %m',
      terminal: false,
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
