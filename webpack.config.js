const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/core/script/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: ['/node_modules/', '/electron-src/', '/dist/'],
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: { minimize: true },
                exclude: ['/node_modules/', '/electron-src/'],
                // type: 'javascript/auto'
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[name][hash][ext]',
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
                        { source: path.resolve(__dirname, 'dist/web'), destination: path.resolve(__dirname, 'electron-src') },
                    ],
                }
            }
        })
    ],
    resolve: {
        extensions: [".js", ".ts",],
    },
    devtool: 'source-map',

    devServer: {
        contentBase: [
            path.join(__dirname, 'dist'),
        ],
        open: true,
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/web'),
    },
};