const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './dist/web-js-unpacked/core/script/index.js',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: { minimize: true },
                exclude: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[name].[ext]',
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "./index.html"
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, 'assets'), destination: path.resolve(__dirname, 'dist/web/assets')
                        },
                        { source: path.resolve(__dirname, 'dist/web'), destination: path.resolve(__dirname, 'electron-src') },
                    ],
                }
            }
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/web'),
    },
};