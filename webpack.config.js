var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // path: path.resolve(__dirname, '../spa-hosting-server/dist'),
  },
  devServer: {
    hot: true,
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'src/css')],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
