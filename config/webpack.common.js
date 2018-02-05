var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
 var glob = require("glob");


module.exports = {
    entry: {
        "main":helpers.root('src/client/main.ts'),
        "vendor":helpers.root('src/client/vendor.ts'),
        "polyfills":helpers.root('src/client/polyfills.ts'),
        "images":glob.sync(helpers.root('src/client/assets/*'))
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('src/client', 'tsconfig.app.json') }
                    } , 'angular2-template-loader', 'angular-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },

            {
                test: /\.s?css$/,
                use: ['to-string-loader','style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },


    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src/client')
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', "vendor", 'polyfills']
        }),
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: helpers.root('src/client/index.html')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",

        }),

    ]
};

