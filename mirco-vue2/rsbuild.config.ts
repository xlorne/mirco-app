import * as path from 'path';
import {defineConfig} from '@rsbuild/core';
import {pluginVue2} from '@rsbuild/plugin-vue2';
import {pluginSass} from '@rsbuild/plugin-sass';
import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';

export default defineConfig({
    plugins: [
        pluginVue2(),
        pluginSass(),
        pluginModuleFederation({
            name: "MircoVue2",
            filename: 'remoteEntry.js',
            exposes: {
                "./Header": "./src/bootstrap/Header.ts",
            },
            shared: {
                vue: {
                    singleton: true,
                    eager: true,
                    requiredVersion: "^2.6.0",
                },
            }
        }, {
            ssr: false,
            ssrDir: path.resolve(__dirname, 'ssr'),
            environment: 'development',
        }),
    ],
    server: {
        port: 4000,
    },
    source: {
        entry: {
            index: './src/entry.ts',
        },
        decorators: {
            version: 'legacy',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    html: {
        template: './public/index.html',
    },
    performance: {
        chunkSplit: {
            strategy: 'split-by-size',
            minSize: 10000,
            maxSize: 30000,
        },
    },
    tools: {
        rspack(config) {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024, // 小于 100kb 的图片转成 base64
                    },
                },
            });
            return config;
        },
    }
});
