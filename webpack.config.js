const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { main: ['@babel/polyfill', './src/js/index.js'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', inject: false }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'pages', to: 'pages' },
        { from: 'src/images', to: 'images' },
      ],
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    open: true,
    compress: true,
  },
};
