const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
    mode: 'development',
    entry: './src/entry.tsx',
    devServer: {
        port: 13000,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '.',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                }
            ],
        }),
        new ModuleFederationPlugin({
            name: "MircoApp",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "./src/pages/header",
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
