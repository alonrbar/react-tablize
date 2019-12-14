const path = require('path');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV;
console.log(`Creating bundle. Mode: ${mode}.`);  // eslint-disable-line no-console

module.exports = {
    mode,
    entry: [path.resolve('./src/index.ts')],
    devtool: 'sourcemap',
    output: {
        path: path.resolve('./dist'),
        filename: 'react-tablize.js',
        library: 'react-tablize',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    externals: [nodeExternals()],
    module: {
        rules: [{ 
            test: /(\.ts|\.tsx)$/, 
            use: 'babel-loader' 
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
        modules: [path.resolve('./src'), 'node_modules']
    },
    optimization:{
        minimize: false
    }
};