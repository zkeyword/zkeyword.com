const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
// const tsImportPluginFactory = require('ts-import-plugin')

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    mode: "production",
    entry: {
        blog: './src/client/index.tsx',
        admin: './src/client/admin.tsx'
    },
    output: {
        publicPath: '/js/',
        path: path.resolve(__dirname, '../public/js'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
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
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});