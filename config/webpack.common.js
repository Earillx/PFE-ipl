var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        "polyfills":helpers.root('src/client/polyfills.ts'),
        "main":helpers.root('src/client/main.ts'),
        "vendor":helpers.root('src/client/vendor.ts')
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
                    } , 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src/client', 'app'),
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: helpers.root('src/client', 'app'),
                loader: 'raw-loader'
            }
        ]
    },


    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src/client'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', "vendor", 'polyfills']
        }),
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: helpers.root('src/client/index.html')
        })
    ]
};

