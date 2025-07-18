import {defineConfig} from '@rsbuild/core';
import commonConfig from './rsbuild.config';
import * as path from 'path';

export default defineConfig({
    ...commonConfig,
    tools: {
        // 这样打包的目的是为了在微前端打包zip组件时，可正常访问到引用的图片资源，在非静态微前端资源zip下使用时不建议开启如下配置。
        rspack(config) {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                include: [path.resolve(__dirname, 'src/assets')],
                type: 'asset/inline', // 强制内联为 DataURL（打包进 JS）
            });
            return config;
        },
    }
})

