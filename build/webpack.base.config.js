const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const sourcePath = path.join(__dirname, '../web');
const nodeModules = path.resolve(__dirname, '../node_modules');

const isDev = !!(process.env.NODE_ENV != 'production');

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id,
        loaders
    })
}

module.exports = {
    context: sourcePath,
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: nodeModules,
            include: sourcePath,
            use: ['happypack/loader?id=happy-babel-js']
        }, {
            test: /\.css$/,
            exclude: nodeModules,
            use: isDev ? ['style-loader', 'happypack/loader?id=happy-css'] : ["style-loader", MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.join(__dirname, './postcss.config.js')
                    }
                }
            }]
        }, {
            test: /\.less$/,
            use: isDev ? ['style-loader', 'happypack/loader?id=happy-less'] : ["style-loader", MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.join(__dirname, './postcss.config.js')
                    }
                }
            }, 'less-loader']
        }, {
            test: /\.styl$/,
            use: isDev ? ['style-loader', 'happypack/loader?id=happy-stylus'] : ["style-loader", MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: path.join(__dirname, './postcss.config.js')
                    }
                }
            }, 'stylus-loader']
        }, {
            test: /.(gif|jpg|png)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:8].[ext]'
                }
            }]
        }],
        noParse: /node_modules\/(jquey|js\-cookie\.js)/
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            sourcePath,
            nodeModules
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "[name].css"
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../"),
            manifest: require('./vendor-manifest.json'),
        }),
        createHappyPlugin('happy-babel-js', [{
            loader: 'cache-loader',
            options: {
                cacheDirectory: path.resolve(__dirname, '.cache--happypack')
            }
        }, {
            loader: 'babel-loader',
            query: {
                presets: isDev ? ['react-hmre'] : []
            }
        }]),
        createHappyPlugin('happy-css', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }]),
        createHappyPlugin('happy-less', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }, {
            loader: 'less-loader',
            query: {
            }
        }]),
        createHappyPlugin('happy-stylus', [{
            loader: 'css-loader',
            query: {
                minimize: !isDev,
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                },
            }
        }, {
            loader: 'stylus-loader',
            query: {
            }
        }]),
        new ProgressBarPlugin({
            format: chalk.blue.bold("build  ") + chalk.cyan("[:bar]") + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
            clear: false
        }),
        new LodashModuleReplacementPlugin(),
    ]
};