const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
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
  plugins: [
    new MiniCSSExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
            ],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
      },
    ],
  },
};
