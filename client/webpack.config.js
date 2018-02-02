var helpers = require('../helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry : {
       'app': helpers.root('client/src/main.ts')
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: helpers.root('build'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('tsconfig.json') }
                    } ,
                    'angular2-template-loader'
                ]
            }
        ]
    },

};
