const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config');
const Html = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    devtool: false,
    mode: "production",
    entry: {
        blog: './src/client/index.tsx',
        admin: './src/client/admin.tsx'
    },
    output: {
        publicPath: '/static/',
        path: path.resolve(__dirname, '../public/static'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: "[name].[chunkhash:8].js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // 开启多线程
                parallel: true,
                uglifyOptions: {
                    compress: {
                        // 去除 console
                        drop_console: true,
                        // 去除部分影响性能代码，如：1/0
                        keep_infinity: true,
                    },
                    output: {
                        // 去除注释
                        comments: false,
                        // 紧凑输出
                        beautify: false
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
                },
                // blogVendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: 'blogVendors',
                //     chunks: 'all'
                // },
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new Html({
            filename: '../blog.html',
            template: path.join(__dirname, '../views/blog.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['manifest', 'vendors', 'blog'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new Html({
            filename: '../admin.html',
            template: path.join(__dirname, '../views/admin.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['manifest', 'vendors', 'admin'],
            html: '<%- html %>',
            title: '<%- title %>',
            script: '<%- JSON.stringify(ServerData) %>'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});