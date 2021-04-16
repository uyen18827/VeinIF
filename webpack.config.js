const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    // entry: './src/core/script/index.ts',
    entry: './build/core/script/index.js',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: { minimize: true },
                exclude: /node_modules/,
                type: 'javascript/auto'
                // include: [path.resolve(__dirname, 'src')]
            },
            // {
            //     test: /\.html/,
            //     type: 'asset',
            //     generator: {
            //         filename: '[hash][ext][query]'
            //     }
            // },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "./index.html"
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/web'),
    },
};