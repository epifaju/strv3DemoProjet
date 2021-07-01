
const isPrd = process.env.NODE_ENV === 'production';
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    demo: './src/index.jsx'
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom',
    }
  },
  externals: {
    config: 'config',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
  },
  optimization: {
    minimize: isPrd,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'demo-libs',
          chunks: 'all'
        }
      }
    }
  },
  devtool: isPrd ? false : 'eval-source-map',
  devServer: {
    contentBase: [path.join(__dirname, 'build'), path.join(__dirname, 'static')],
    publicPath: '/',
    hot: true,
    open: true,
    port: 9000,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [
                'react-hot-loader/babel',
                // Pour éviter l'erreur: regeneratorRuntime is not defined.
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'src')],
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              esModule: true,
              hmr: !isPrd,
            }
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            }
          }
        ],
      }
    ],
  },
  plugins: [
    new ExtractCssChunks({
      filename: isPrd ? '[name].[hash].css' : '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
    })
  ]
};
