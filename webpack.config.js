import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist'),
  },
};

export default config;
