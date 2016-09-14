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
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
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
    ],
  },
  resolve: {
    root: path.resolve('src'),
  },
};
