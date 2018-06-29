const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: `${__DEV__ ? 'development': 'production'}`,
    entry: {
		main: './src/client/index.tsx',
        // vendors:['react'],
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        chunkFilename: "[name].[chunkhash:8].js"
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
        ],
        splitChunks: {
            name: 'common'
        }
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
        }),
        // new webpack.optimize.SplitChunksPlugin({
        //     cacheGroups: {
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true,
        //         },
        //         //打包重复出现的代码
        //         vendor: {
        //             chunks: 'initial',
        //             minChunks: 2,
        //             maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //             minSize: 0, // This is example is too small to create commons chunks
        //             name: 'vendor'
        //         },
        //         //打包第三方类库
        //         commons: {
        //             name: "commons",
        //             chunks: "initial",
        //             minChunks: Infinity
        //         }
        //     }
        // }),
        // new webpack.optimize.RuntimeChunkPlugin({
        //     name: "manifest"
        // })
    ]
}
