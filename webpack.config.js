const path = require('path');

module.exports = {
    // entry: './src/core/script/index.ts',
    entry: './dist/core/script/index.js',
    module: {
        rules: [
            {
                // test: /\.ts$/,
                // use: 'ts-loader',
                exclude: /node_modules/,
                // include: [path.resolve(__dirname, 'src')]
            },
        ],
    },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js'],
    // },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};