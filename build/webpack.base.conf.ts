import path from 'path';
import fs from 'fs';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../public'),
    assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter((fileName) => fileName.endsWith('.pug'));

const config: Configuration = {
    externals: {
        paths: PATHS,
    },
    entry: {
        main: PATHS.src,
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        publicPath: '',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@': path.resolve(__dirname, '../', 'src'),
        },
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.ts$/],
                use: ['babel-loader'],
                exclude: '/node_modules/',
            },
            {
                test: /\.pug$/,
                loader: '@webdiscus/pug-loader',
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(
                                    __dirname,
                                    '../',
                                    'postcss.config.js',
                                ),
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, '.html')}`,
                    inject: true,
                    src: PATHS.assets,
                    minify: false,
                }),
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/img`,
                    to: `${PATHS.assets}img`,
                },
                {
                    from: `${PATHS.src}/fonts`,
                    to: `${PATHS.assets}fonts`,
                },
                {
                    from: `${PATHS.src}/favicon`,
                    to: `${PATHS.assets}favicon/`,
                },
                {
                    from: `${PATHS.src}/video`,
                    to: `${PATHS.assets}video/`,
                },
            ],
        }),
    ],
};

export default config;
