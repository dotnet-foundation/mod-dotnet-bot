const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'production',
    output: {
        filename: 'main.js'
    },
    externals: {
        "jquery": "jQuery"
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
};
