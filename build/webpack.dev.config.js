const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    entry: {
        common: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'axios'],
		main: './src/client/index.tsx',
    },
    output: {
        path: './public',
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    devtool: 'source-map',
    resolve: { 
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
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
                    'style-loader',
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
