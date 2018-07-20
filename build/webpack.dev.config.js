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
        blog: './src/client/index.tsx',
        admin: './src/client/admin.tsx'
    },
    output: {
        publicPath: '/js/',
        path: path.resolve(__dirname, '../public/js'),
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    plugins: [
        new Html({
            filename: '../blog.html',
            template: path.join(__dirname, '../views/blog.html'),
            chunks: ['blog'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new Html({
            filename: '../admin.html',
            template: path.join(__dirname, '../views/admin.html'),
            chunks: ['admin'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin()
    ]
})