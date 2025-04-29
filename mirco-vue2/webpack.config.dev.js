const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 4000,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*", // ⚠️ 允许主应用跨域加载
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "MircoVue2",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "./src/bootstrap/Header",
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
