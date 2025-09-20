import * as path from 'node:path'

import { defineConfig } from 'rspress/config'

export default defineConfig({
    root: path.join(__dirname, 'docs'),
    title: '妙码学院 miaoma-rhooks',
    icon: 'https://miaomaedu.com/favicon.ico',
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
    }
})
