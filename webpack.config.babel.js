export default {
  entry: './src/index.js',
  output: {
    filename: 'tinyxml.js',
    path: __dirname,
    library: 'tinyxml',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};

