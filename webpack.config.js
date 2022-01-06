const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'plugin.js'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  /* [.js] below fixes WebPack Build issues importing Ionic */
  resolve: {
    extensions: ['.ts', ".js"]    
  },
  plugins: [
    /* Merge all files including the async imports */
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};