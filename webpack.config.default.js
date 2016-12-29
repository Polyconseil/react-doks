const path = require('path');

var webpack = require('webpack');

module.exports = {
  // entry : overriden in script
  // output : overriden in script
  devtool: 'eval',
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?(.flow)?$/, // .js .jsx .js.flow
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
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
    ],
  },
  resolveLoader: {
    alias: {
      'raw': 'raw-loader',
    }
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
  },
  performance: false,
};
