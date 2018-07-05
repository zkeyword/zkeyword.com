const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        common: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'axios'],
		main: './dist/client/index.js',
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../public'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    resolve: { 
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    ecma: 6,
                    compress: {
                        drop_console: process.env.NODE_ENV === 'production'
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        splitChunks: {
            name: 'vendor',
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(gif|jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[hash:8].[ext]'
                    }
                }]
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                // use: ['happypack/loader?id=happy-font']
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name].[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash:8].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            template:  path.join(__dirname, '../views/blog.html'),
            html: '<%- html %>',
            script: '<%- JSON.stringify(ServerData) %>'
        })
    ]
}
