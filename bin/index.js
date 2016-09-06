#!/usr/bin/env node
const path = require('path');

const doks = require('../index.js');

const doksConfig = require(path.join(process.cwd(), 'doks.config.js'));

/** Fetch doks.config.js config keys, or use our sensible defaults : **/
const config = {
  docsFolder: doksConfig.docsFolder || '__docs__',
  defaultRoot: doksConfig.defaultRoot || path.join(process.cwd(), 'src'),
  webpackConfig: doksConfig.webpackConfig || path.join(__dirname, 'webpack.config.default.js'),
  contentBase: doksConfig.contentBase || __dirname,
  index: doksConfig.index || 'index.html',
  serveStatic: doksConfig.serveStatic || [],
  staticBuildDir: doksConfig.staticBuildDir || path.join(process.cwd(), 'docs'),
};

doks(config);
