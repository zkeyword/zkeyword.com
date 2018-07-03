const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    // mode: `${__DEV__ ? 'development': 'production'}`,
    mode: 'production',
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
                sourceMap: true, // set true is you want JS source map
                uglifyOptions: {
                    ecma: 6,
                    compress: {
                        drop_console: process.env.NODE_ENV === 'production'
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
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
