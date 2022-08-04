import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';

function resolve(pathname: string) {
  return path.resolve(__dirname, pathname);
}

const config: Configuration = {
  entry: resolve('src'),
  output: {
    path: resolve('build'),
    publicPath: 'auto',
    filename: '[chunkhash].js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('src/index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    compress: true,
    port: 3000,
    watchFiles: 'src',
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [resolve('src/scss')],
            },
          },
        }],
      },
    ],
  },
};

export default config;
