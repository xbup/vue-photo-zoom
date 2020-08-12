/**
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-05-16 11:41:06
 * @LastEditTime : 2020-08-12 09:01:44
 * @Description :
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    process.env.NODE_ENV === 'production' ? './src/index.js' : './src/main.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: 'vuePhotoZoomPro',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'vue-photo-zoom-pro.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'none'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
