const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3001,
        hot: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "MircoVue2",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "./src/views/Header.vue",
            },
            shared: {
                vue: {
                    singleton: true,
                    eager: true,
                    requiredVersion: "^2.6.0",
                },
            },
        }),
    ],
}); 