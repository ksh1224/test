const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  // development
  {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [                [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ], '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: ['style-loader','css-loader','sass-loader'],
        },
      ],
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        utils: path.resolve(__dirname, 'src/utils'),
        pages: path.resolve(__dirname, 'src/pages'),
        models: path.resolve(__dirname, 'src/models'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        components: path.resolve(__dirname, 'src/components'),
        observers: path.resolve(__dirname, 'src/observers'),
      },
    },
    output: {
      filename: '[name].dev.js',
      path: path.resolve(__dirname, 'public'),
    },
    devServer: {
      hot: true,
      port: 8082,
    },
    name: 'development',
    entry: './src/index.ts',
    mode: 'development',
  },
  // production
  {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [                [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ], '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 'sass-loader'
          ],
        },
      ],
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
    ],
    resolve: {
      alias: {
        extensions: ['.ts', '.js'],
        utils: path.resolve(__dirname, 'src/utils/'),
      },
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'public'),
    },
    name: 'production',
    entry: './src/index.ts',
    mode: 'production',
  },
  
];
