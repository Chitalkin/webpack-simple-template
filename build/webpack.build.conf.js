const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
  ]
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
