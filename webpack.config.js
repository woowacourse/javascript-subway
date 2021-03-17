const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'js', 'index.js'),
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
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
    ],
  },
}
