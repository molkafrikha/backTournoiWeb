const path = require('path');

module.exports = {
    entry: './server.cjs',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs' // Indique à Webpack de générer un module CommonJS
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
