import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
  },
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
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

export default config;
