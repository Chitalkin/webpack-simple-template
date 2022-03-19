const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  target: 'web',
  devServer: {
    compress: true,
    port: 8085,
    host: 'localhost',
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
  ]
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
