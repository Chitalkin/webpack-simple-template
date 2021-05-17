const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');


const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        compress: true,
        port: 8085,
        host: 'localhost',
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig);
});
