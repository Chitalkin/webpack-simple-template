import { Configuration as WebpackConfiguration } from 'webpack';
import { merge } from 'webpack-merge';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import commonConfig from './webpack.base.conf';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const productionConfig: Configuration = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css',
        }),
    ],
});

export default productionConfig;
