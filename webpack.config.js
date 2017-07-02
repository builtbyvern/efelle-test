const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const inProduction = (process.env.NODE_ENV === 'production');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
    'build'
]

// the clean options to use
let cleanOptions = {
    root: __dirname,
    exclude: ['shared.js'],
    verbose: true,
    dry: false
}

module.exports = {
    // entry: './src/main.js', or 
    entry: {
        app: [
            'bootstrap-loader',
            './src/js/main.js',
            './src/scss/main.scss'
        ],
        vendor: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
          test: /\.s[ac]ss$/,
          use: ExtractTextPlugin.extract({
            // use: ['css-loader', 'postcss-loader', 'sass-loader'], without image opt
            use: [{
                loader: 'css-loader',
              },
              'sass-loader'
            ],
              fallback: 'style-loader'
          })
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
              test: /\.(svg|eot|ttf|woff|woff2)$/,
              use: 'file-loader'
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                  {
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        name: 'images/[name].[hash].[ext]'
                    }
                  },
                  'img-loader' // minimize
                ],
                
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
          Tether: "tether",
          "window.Tether": "tether",
          Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
          Button: "exports-loader?Button!bootstrap/js/dist/button",
          Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
          Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
          Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
          Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
          Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
          Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
          Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
          Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
          Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '*.html')),
            minimize: inProduction
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        function() {
            this.plugin('done', stats => {
                require('fs').writeFileSync(
                    path.join(__dirname, 'dist/manifest.json'),
                    JSON.stringify(stats.toJson().assetsByChunkName)
                )
            })
        }
    ]
}

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}