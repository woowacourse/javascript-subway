const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { main: ['@babel/polyfill', './src/js/index.js'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.css'],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()],
  devServer: {
    hot: true,
    inline: true,
    open: true,
    compress: true,
  },
};
