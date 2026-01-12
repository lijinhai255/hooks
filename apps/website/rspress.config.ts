import * as path from 'node:path'

import { defineConfig } from 'rspress/config'

export default defineConfig({
    root: path.join(__dirname, 'docs'),
    title: 'HelloWorldDev - STR',
    icon: 'https://newgame.mypinata.cloud/ipfs/bafkreidroqxiqk7ig7ledophbuzmndr3fsqgv4zxc4e6ulgdu6oyj2rngu',
    logo: {
        light: 'https://foruda.gitee.com/avatar/1712414558118907760/14266999_miaomaedu_1712414558.png',
        dark: 'https://foruda.gitee.com/avatar/1712414558118907760/14266999_miaomaedu_1712414558.png'
    },
    themeConfig: {
        socialLinks: [
            {
                icon: 'github',
                mode: 'link',
                content: 'https://github.com'
            }
        ]
    },
    // 配置模块别名，指向本地 workspace 包
    alias: {
        '@miaoma-rhooks/utils': path.join(__dirname, '../../packages/utils/es'),
        '@miaoma-rhooks/hooks': path.join(__dirname, '../../packages/hooks/es'),
        '@miaoma-rhooks/core': path.join(__dirname, '../../packages/core/es')
    },
    // 配置文档构建工具
    docTools: {
        // 忽略演示组件文件，不将其作为页面
        ignore: [
            '**/*.tsx'
        ]
    }
})
