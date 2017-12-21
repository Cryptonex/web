const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const resolve = (targ) => {
  return path.resolve(__dirname, targ);
};



const DIR_SRC = resolve('src');
const DIR_BUILD = resolve('dist');
const DIR_ASSETS = 'assets/';
const DIR_SOUNDS = DIR_ASSETS + 'sounds/';
const DIR_IMAGES = DIR_ASSETS + 'images/';
const DIR_ICONS = DIR_ASSETS + 'icons/';
const DIR_FONTS = DIR_ASSETS + 'fonts/';
const DIR_PUBLIC = '/';



module.exports = {
  context: __dirname,
  entry: {
    main: ['react-hot-loader/patch' ,'./src/index.js'],
    vendor: ['moment', 'react', 'react-dom'],
  },
  output: {
    filename: '[name].[hash].js',
    path: DIR_BUILD,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.styl', '.jsx'],
    modules: [
      DIR_SRC,
      'node_modules'
    ],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2015', 'stage-0']
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: DIR_IMAGES
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: DIR_FONTS
          }
        }]
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + (':percent') + ' (:elapsed seconds)',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: process.env.NODE_ENV == 'development'
    }),
    new CopyWebpackPlugin([
      {from: `${DIR_SRC}/6896553.txt`},
      {from: `${DIR_SRC}/capitalist_ddccb5dbd2.txt`},
      {from: `${DIR_SRC}/${DIR_IMAGES}/favicon.ico`, to: `${DIR_BUILD}/${DIR_IMAGES}/`},
    ])
  ],

  devtool: "cheap-inline-source-map",
  devServer: {
    historyApiFallback: true,
    hot: false,
    contentBase: path.join(__dirname, "dist"),
    publicPath: '/',
    compress: true,
    port: 3000,
  },
};

