const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require('express');
const path = require('path');

/**
 * Launch a dev server, given a config object (especially : config.webpackCongig, which has been prepared using
 * patchWebpackConfig
 * @param config
 */
module.exports = (config) => {
  //
  // Launch dev server :
  //
  const webpackConfig = config.webpackConfig;

  webpackConfig.module.loaders.find(l => l.test.test('file.js')).loaders.unshift('react-hot');

  webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + config.port);
  webpackConfig.entry.unshift('webpack/hot/only-dev-server');

  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const server = new WebpackDevServer(webpack(webpackConfig), {
    // no need for contentBase since we voluntarily only serve folders specified by the user
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    setup: (app) => { // app = WP dev server internal express
      app.get('/', (req, res) => {
        res.sendFile(config.index);
      });

      // Serve static assets :
      config.serveStaticResources.forEach(staticResource => {
        app.use(staticResource.path, express.static(staticResource.resource));
      });
    },
  });

  server.listen(config.port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('Doks server listening at http://localhost:' + config.port);
    console.log('Packing docs...');
  });
};
