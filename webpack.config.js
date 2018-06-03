/**
 * Created by Администратор on 15.07.2016.
 */
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    //CopyWebpackPlugin = require('copy-webpack-plugin'),
    //ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ExtractStylePlugin = new ExtractTextPlugin('css/style.css', {
        //allChunks: true,
        disable: false, //ENV !== 'production'
    }),
    //CleanWebpackPlugin = require('clean-webpack-plugin'),
    ReplacePlugin = require('replace-bundle-webpack-plugin'),
    V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
//SpritesmithPlugin = require('webpack-spritesmith'),
//ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


const ENV = process.env.NODE_ENV || 'development';
const CSS_MAPS = ENV !== 'production';
const publicPath = ENV === 'production' ? '../server/public' : './public';

module.exports = {
    entry: {
        index: './src/index',
    },
    output: {
        publicPath: '/',
        path: publicPath,
        filename: 'js/[name].js'
    },

    externals: {
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {}
    },
    module: {
        loaders: [
            // es6
            {
                test: /\.js$/,
                include: path.join(__dirname, './'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0']
                }
            },
            // html, tmpl
            {test: /\.html/, loader: "html"},
            // styles
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
            },
            {test: /\.css$/, loader: ExtractStylePlugin.extract("style-loader", "css-loader")},
            //images
            {test: /\.(woff2?|svg)/, loader: 'url?limit=10000&name=fonts/[name].[ext]'},
            {test: /\.(ttf|eot)/, loader: 'file?name=fonts/[name].[ext]'},
            {test: /\.(png|jpg)/, loader: "file?name=images/[name].[ext]"},
        ],
    },

    plugins: [
       // new CleanWebpackPlugin(publicPath),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(ENV)
        }),
        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /enru/
        ),

        ExtractStylePlugin,

        new HtmlWebpackPlugin({
            chunks: ['index', 'libs'],
            filename: 'index.html',
            template: './index.html',
            minify: ENV === 'production' ? {
                collapseWhitespace: true,
                processScripts: ['text/template', 'text/html'],
                removeComments: true,
                minifyJS: true,
                removeCommentsFromCDATA: true
            } : false
        }),
       new webpack.OldWatchingPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendors",
        //     //filename: "index.js",
        //     minChunks: Infinity,
        // }),

    ].concat(ENV === 'production' ? [
        new V8LazyParseWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            }
        }),

        // strip out babel-helper invariant checks
        new ReplacePlugin([{
            // this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
            partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
            replacement: () => 'return;('
        }]),

    ] : []),

    devServer: {
        //!!!!!  использовать webpack-dev-server@1.12
        secure: true,
        changeOrigin: true,
        contentBase: publicPath,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/wmm/*': { //http://localhost:3000/wmm/WMM2015.COF
                target: 'http://localhost:3000/',
                //secure: true,
                //changeOrigin: true
            },
            '/print': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/money-v2': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/money-v2/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/user/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/auch/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/exp/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true
            },
            '/password/*': {
                target: 'http://localhost:3000/',
                secure: true,
                changeOrigin: true

            },

            // '/images/*': {
            //   target: 'http://localhost:3000/',
            //   secure: true,
            //   changeOrigin: true
            // }
        },
        setup: function (app) {
            // Here you can access the Express app object and add your own custom middleware to it.
            // For example, to define custom handlers for some paths:
            app.get('/json', function (req, res) {
                res.json({status: 'OK', message: 'test json data'});
            });

        },
        inline: true,
        //hot: true,
        //compress: true,
        //quiet: false,
        //noInfo: false,
        historyApiFallback: true,
    },
    debug: ENV !== 'production',
    devtool: ENV === 'production' ? false : 'cheap-module-eval-source-map'
    //devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map'
};


