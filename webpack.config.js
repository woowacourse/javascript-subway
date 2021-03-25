import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = (_, argv) => ({
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
    clean: {
      keep: /\.git/,
    },
  },
  mode: argv.mode,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|pages)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      ARGV: JSON.stringify(argv),
      MODE: JSON.stringify(argv.mode),
      PRODUCTION: JSON.stringify(argv.mode === 'production'),
      DEVELOPMENT: JSON.stringify(argv.mode === 'development'),
      SUBPATH: JSON.stringify(argv.mode === 'production' ? '/javascript-subway' : ''),
    }),
  ],
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  devServer: {
    contentBase: path.resolve(dirname, 'dist'),
    compress: true,
    hot: false,
    historyApiFallback: true,
    liveReload: true,
    open: true,
    port: 5500,
    watchContentBase: true,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
});

export default config;
