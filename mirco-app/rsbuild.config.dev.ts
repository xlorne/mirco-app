import {defineConfig} from '@rsbuild/core';
import commonConfig from './rsbuild.config';

export default defineConfig({
    ...commonConfig,
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://127.0.0.1:8090',
            '/open': 'http://127.0.0.1:8090',
            '/user': 'http://127.0.0.1:8090',
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
})

