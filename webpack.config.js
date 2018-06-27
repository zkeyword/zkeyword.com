const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: `${__DEV__ ? 'development': 'production'}`,
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
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
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
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
