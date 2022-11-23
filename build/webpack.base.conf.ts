import path from 'path';
import fs from 'fs';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../public'),
    assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).reduce((acc, curr) => {
    const files = fs.readdirSync(`${PAGES_DIR}/${curr}`);
    const fileName = files.find((file) => file.endsWith('.pug'));

    if (fileName) {
        acc.push(fileName);
    }

    return acc;
}, [] as string[]);

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
                test: /\.(png|jpg|gif|ico)$/,
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
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: `${PATHS.assets}img/sprite.svg`,
                        },
                    },
                    'svgo-loader',
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new SpriteLoaderPlugin({ plainSprite: true }),
        ...PAGES.map((page) => {
            const pageName = page.replace('.pug', '');

            return new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${pageName}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`,
                inject: true,
                src: PATHS.assets,
                pageClass: `${pageName}-page`,
                minify: false,
            });
        }),
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
                {
                    from: `${PATHS.src}/robots.txt`,
                    to: `${PATHS.dist}/robots.txt`,
                },
            ],
        }),
    ],
};

export default config;
