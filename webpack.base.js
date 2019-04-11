const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [path.resolve('./src/index.ts')],
    output: {
        path: path.resolve('./dist'),
        library: 'react-tablize',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    externals: [nodeExternals()],
    module: {
        rules: [{ 
            test: /(\.js|\.jsx|\.ts|\.tsx)$/, 
            use: 'babel-loader' 
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve('./src'), 'node_modules']
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};