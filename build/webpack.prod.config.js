const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const Html = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    mode: "production",
    entry: {
        blog: './dist/client/index.js'
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../public'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    plugins: [
        new Html({
            filename: 'blog.html',
            template:  path.join(__dirname, '../views/blog.html'),
            html: '<%- html %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});