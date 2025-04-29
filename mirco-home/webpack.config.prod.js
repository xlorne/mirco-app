const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const {dependencies} = require("./package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = merge(common, {
    mode: 'production',
    devServer: {
        port: 8000,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "MircoHome",
            // This application named 'HeaderApp'
            // output a js file
            remotes: {
                "MircoApp": "MircoApp@http://localhost:3000/remoteEntry.js",
            },
            shared: {
                // some other dependencies
                react: { // react
                    singleton: true,
                    requiredVersion: dependencies["react"],
                    eager: true,
                },
                "react-dom": { // react-dom
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                    eager: true,
                },
            },
        }),
    ],
});
