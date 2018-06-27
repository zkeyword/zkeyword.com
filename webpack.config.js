const path = require('path');
const webpack = require('webpack');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    devtool: 'source-map',
    resolve: { 
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
}
