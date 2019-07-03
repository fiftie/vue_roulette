const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  // エントリポイントのファイル
  entry: './src/index.js',
  output: {
    // 出力先のディレクトリ
    path: path.resolve(__dirname, './docs'),
    // 出力ファイル名
    filename: 'index.bundle.js'
  },
  devServer: {
    // webpackの扱わないファイル(HTMLや画像など)が入っているディレクトリ
    contentBase: path.resolve(__dirname, 'docs'),
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://api.jugemkey.jp', // local api server
      }
    },
    lazy: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // ファイルが.vueで終われば...
        loader: 'vue-loader' // vue-loaderを使う
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'] // css-loader -> vue-style-loaderの順で通していく
      },
    ]
  },
  resolve: {
    // import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
    extensions: ['.js', '.vue'],
    alias: {
      // vue-template-compilerに読ませてコンパイルするために必要
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new CopyPlugin([{ from: './docs' }])
  ],
}