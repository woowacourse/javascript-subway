const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dist.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    port: 5500,
    open: true,
  },
  plugins: [
    new MiniCSSExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './pages', to: './pages' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods'],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
      },
    ],
  },
};
