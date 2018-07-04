const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    // mode: `${__DEV__ ? 'development': 'production'}`,
    mode: 'production',
    entry: {
        common: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'axios'],
		main: './src/client/index.tsx',
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    devtool: 'source-map',
    resolve: { 
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
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
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.styl$/,
                use: [
                    // __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
        })
    ]
}
