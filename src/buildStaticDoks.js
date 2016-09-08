/* eslint-disable global-require */
/* eslint-disable no-console */

const webpack = require('webpack');
const rimraf = require('rimraf');
const ncp = require('ncp');
const fs = require('fs');
const path = require('path');

const copyStaticAssets = (config) => {
  /*
   Copy :
   - serveStaticResources
   - index
   */
  ncp(config.index, path.join(config.staticBuildDir, 'index.html'), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Copied ${config.index} as index.html`);
    }
  });

  config.serveStaticResources.forEach(staticAsset => {
    ncp(staticAsset.resource, path.join(config.staticBuildDir, staticAsset.path), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Copied ${staticAsset.path} to folder ${path.join(config.staticBuildDir, staticAsset.path)}`);
      }
    });
  });
};

/**
 * Build a static bundle that can be pushed on gh-pages, or served by a web server :
 */
module.exports = function(config) {
  console.log('Building static docs...');
  try {
    // rm -rf already existing docs folder, then recreate it
    rimraf(config.staticBuildDir, (err) => {
      if (err) throw err;
      fs.mkdirSync(config.staticBuildDir);
    });
  } catch (err) {
    // If it doesn't exist, simply create it :
    fs.mkdirSync(config.staticBuildDir);
  }

  webpack(config.webpackConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      console.log('Encountered following soft errors :');
      console.log(jsonStats.errors.join('\n\n'));
    }
    if (jsonStats.warnings.length > 0) {
      console.log('Encountered following warnings :');
      console.log(jsonStats.warnings.join('\n\n'));
    }
    copyStaticAssets(config);
  });
};
