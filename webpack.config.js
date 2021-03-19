const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    publicPath: '',
    filename: 'subway.bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: '/dist/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ filename: 'index.html', template: './index.html' }),
    new HtmlWebpackPlugin({
      filename: './pages/entry.html',
      template: './pages/entry.html',
    }),
    new HtmlWebpackPlugin({
      filename: './pages/lines.html',
      template: './pages/lines.html',
    }),
    new HtmlWebpackPlugin({
      filename: './pages/login.html',
      template: './pages/login.html',
    }),
    new HtmlWebpackPlugin({
      filename: './pages/sections.html',
      template: './pages/sections.html',
    }),
    new HtmlWebpackPlugin({
      filename: './pages/signup.html',
      template: './pages/signup.html',
    }),
    new HtmlWebpackPlugin({
      filename: './pages/stations.html',
      template: './pages/stations.html',
    }),
  ],
};
