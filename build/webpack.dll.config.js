const path = require('path');
const webpack = require('webpack');
const outputPath = path.join(__dirname, '../public/js/');

module.exports = {
    mode: "production",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'axios']
    },
    output: {
        path: outputPath,
        filename: 'lib/[name].dll.js',
        library: '[name]'
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