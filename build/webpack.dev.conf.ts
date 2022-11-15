import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
    Configuration as WebpackConfiguration,
    HotModuleReplacementPlugin,
    SourceMapDevToolPlugin,
} from 'webpack';
import { merge } from 'webpack-merge';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import commonConfig from './webpack.base.conf';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const developConfig: Configuration = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    target: 'web',
    devServer: {
        compress: true,
        port: 8085,
        // host: '0.0.0.0',
        open: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
        new HotModuleReplacementPlugin(),
        new SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
    ],
});

export default developConfig;
