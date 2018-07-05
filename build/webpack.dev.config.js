const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode: "development",
    entry: {
        blog: './dist/client/index.js'

    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../public'),
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    plugins: [
        new Html({
            filename: 'blog.html',
            template:  path.join(__dirname, '../views/blog.html'),
            html: '<%- html %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin()
    ]
})