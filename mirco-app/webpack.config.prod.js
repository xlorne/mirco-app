const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const { dependencies } = require("./package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = merge(common,{
    mode: 'development',
    entry: './src/entry.tsx',
    devServer: {
        port: 3000,
    },
    plugins: [
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
});
