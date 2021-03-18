var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: '[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    hot: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://15.164.230.130:8080',
        pathRewrite: { '^/api': '' },
      },
    },
    //http://localhost:9000/api/members
    //http://15.164.230.130:8080/members
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'src/css')],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
