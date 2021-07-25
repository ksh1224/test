const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return [
    {
      mode: env.production ? 'production' : 'development',
      entry: './src/index.ts',
      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          utils: path.resolve(__dirname, 'src/utils'),
          types: path.resolve(__dirname, 'src/types'),
          pages: path.resolve(__dirname, 'src/pages'),
          hooks: path.resolve(__dirname, 'src/hooks'),
          components: path.resolve(__dirname, 'src/components'),
          store: path.resolve(__dirname, 'src/store'),
        },
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        esmodules: true,
                      },
                    },
                  ],
                  '@babel/preset-typescript',
                ],
              },
            },
          },
          {
            test: /\.(sa|sc|c)ss$/i,
            use: env.production
              ? [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
              : ['style-loader', 'css-loader', 'sass-loader'],
          },
        ],
      },
      plugins: env.production
        ? [
            new HtmlWebpackPlugin({
              template: './src/index.html',
              filename: 'index.html',
              favicon: './static/favicon.png',
            }),
            new MiniCssExtractPlugin({
              filename: '[name].[hash].css',
            }),
          ]
        : [
            new HtmlWebpackPlugin({
              template: './src/index.html',
              favicon: './static/favicon.png',
            }),
          ],
      output: {
        filename: env.production ? '[name].[hash].js' : '[name].dev.js',
        path: path.resolve(__dirname, 'public'),
      },
      ...(!env.production && {
        devtool: 'inline-source-map',
        devServer: {
          hot: true,
          port: 8082,
        },
      }),
    },
  ];
};
