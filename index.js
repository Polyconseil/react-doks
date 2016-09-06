/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const fs = require('fs');
const rimraf = require('rimraf');
const ncp = require('ncp');


module.exports = (config) => {
  // Add doks static assets :
  config.serveStatic.push({path: '/doks-static', resource: path.join(__dirname, 'doks-static/')});

  /** Deciding whether we should build static docs or start a webpack dev server : **/
  const args = process.argv.slice(2); // Don't keep node path & CWD

  let buildStatic;
  if (args.length) {
    const buildStaticIndex = args.findIndex(arg => arg === '--build');
    buildStatic = buildStaticIndex !== -1;
    // Removing the "--build" arg if found :
    if (buildStatic) args.splice(buildStaticIndex, 1);
  }

  /** Prepare constants that will be passed down to the built bundle : **/
  let requireContextRoot;
  let requireSingleFile;

// Do we have a root folder specified via CLI ?
// args was spliced from each argument we already used
  if (args.length) {
    const cwd = process.cwd();

    // Relative or absolute path ?
    let selectedPath;
    if ((args[0]).startsWith('/')) {
      selectedPath = args[0];
    } else {
      selectedPath = path.join(cwd, args[0]);
    }

    // Stat given path :
    console.log('\n');
    try {
      // Path found :
      const stats = fs.statSync(selectedPath);
      requireContextRoot = selectedPath;
      requireSingleFile = stats.isFile();

      // If single file, no need for side menu etc... --> DOCS_EXPLORER_SINGLE_FILE = true
      console.log('Selected ' + (requireSingleFile ? 'file :' : 'folder :'));
      console.log(requireContextRoot);
    } catch (err) {
      // Path not found :
      console.warn('WARNING : ', selectedPath, 'not found.\nUsing default root folder : ', config.defaultRoot);
      requireContextRoot = config.defaultRoot;
      requireSingleFile = false;
    }
  } else {
    // No folder specified in CLI args :
    requireContextRoot = config.defaultRoot;
    requireSingleFile = false;
  }
  console.log('\n');

// Regex to only fetch files at the root of a docs folder :
  const regexp = new RegExp('/' + config.docsFolder + '/[a-zA-Z0-9_-]+.jsx?$');

  /** Prepare webpack config **/

  const webpackConfig = config.webpackConfig;

  if (!webpackConfig.devtool) {
    webpackConfig.devtool = 'source-map';
  }

// Our own entrypoint :
  webpackConfig.entry = [
    path.join(__dirname, 'lib/index.js'), // TODO dev mode (source maps & everything)
  ];

// Passing down computed constants to the bundle :
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    DOCS_EXPLORER_REQUIRE_CONTEXT_REGEXP: regexp, // We don't stringify regexp, so that it remains a RegExp litteral in the compiled source
    DOCS_EXPLORER_REQUIRE_CONTEXT_ROOT: JSON.stringify(requireContextRoot), // Root of the require.context that will be generated
    DOCS_EXPLORER_REQUIRE_CONTEXT_DOCS_FOLDERS: JSON.stringify(config.docsFolder), // Root of the require.context that will be generated
    DOCS_EXPLORER_SINGLE_FILE: JSON.stringify(requireSingleFile), // Allows to make the bundle as lightweight as possible
  }));

// Bundle output :
  webpackConfig.output = {
    path: path.join(config.staticBuildDir, 'dist'), // ignored when in dev server mode
    filename: 'bundle.js',
    publicPath: '/dist/',
  };

  // Include the docs root folder to webpack loaders that should load js (babel for example)
  // We need this in case a file in requireContextRoot folder (folder specified in CLI) imports a file located
  // outside of this folder. That way, we ensure every source file is transpiled :
  webpackConfig.module.loaders.find(l => l.test.test('file.js')).include.unshift(config.defaultRoot);

  /**
   * Either build a static site to be served on gh-pages (or any kind of web server), OR launch a WP dev server :
   */
  if (buildStatic) {
    //
    // Build a static site :
    //
    console.log('Building static docs...');

    const copyStaticAssets = () => {
      /*
       Copy :
       - serveStatic
       - index
       */

      ncp(config.index, path.join(config.staticBuildDir, 'index.html'), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Copied ${config.index} as index.html`);
        }
      });

      config.serveStatic.forEach(staticAsset => {
        ncp(staticAsset.resource, path.join(config.staticBuildDir, staticAsset.path), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Copied ${staticAsset.path} to folder ${path.join(config.staticBuildDir, staticAsset.path)}`);
          }
        });
      });
    };

    try {
      // rm -rf already existing docs folder
      rimraf(config.staticBuildDir, (err) => {
        if (err) throw err;
        // recreate it :
        fs.mkdirSync(config.staticBuildDir);
      });
    } catch (err) {
      // If it doesn't exist, simply create it :
      fs.mkdirSync(config.staticBuildDir);
    }
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw err;
      }
      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        console.log('Encountered following soft errors');
        console.log(jsonStats.errors.join('\n\n'));
      }
      if (jsonStats.warnings.length > 0) {
        console.log('Encountered following warnings :');
        console.log(jsonStats.warnings.join('\n\n'));
      }
      copyStaticAssets();
    });
  } else {
    //
    // Launch dev server :
    //
    webpackConfig.module.loaders.find(l => l.test.test('file.js')).loaders.unshift('react-hot');

    webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:3003');
    webpackConfig.entry.unshift('webpack/hot/only-dev-server');

    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const server = new WebpackDevServer(webpack(webpackConfig), {
      contentBase: config.contentBase,
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      setup: (app) => { // app = WP dev server internal express
        // Serve index :
        app.get('/', (req, res) => {
          res.sendFile(path.join(config.contentBase, config.index));
        });

        // Serve static assets :
        config.serveStatic.forEach(staticResource => {
          app.use(staticResource.path, express.static(staticResource.resource));
        });
      },
    });

    server.listen(3003, '0.0.0.0', (err, result) => {
      if (err) {
        console.log(err);
      }

      console.log('Listening at http://localhost:3003');
      console.log('Packing docs...');
    });
  }
};
