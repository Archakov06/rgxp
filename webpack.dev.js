var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  entry: [
    'webpack-hot-middleware/client',
    './src/client/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: ['react-hot', 'babel'],
    },
    {
      test: /\.(styl|css)$/,
      loader: 'style-loader!css-loader!stylus-loader'
    },
  ]
  }
};
