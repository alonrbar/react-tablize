const path = require('path');

module.exports = ({ config }) => {
    
    // typescript compilation
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
    });
    config.resolve.extensions.push('.ts', '.tsx');

    // path resolve
    config.resolve.modules = [
        ...(config.resolve.modules || []),
        path.resolve('./'),
        path.resolve('./src'),
    ];
    
    return config;
};