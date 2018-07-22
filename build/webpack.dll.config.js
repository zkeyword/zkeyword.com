const path = require('path');
const webpack = require('webpack');
const outputPath = path.join(__dirname, '../public/static/');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'classnames', 'mobx', 'mobx-react', 'axios', 'dayjs']
    },
    output: {
        path: outputPath,
        filename: '[name].dll.js',
        library: '[name]'
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
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, "../"),
            path: path.resolve(__dirname, './[name]-manifest.json'),
            name: '[name]'
        })
    ]
}