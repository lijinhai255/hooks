import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: ['packages/*/vitest.config.ts'], // monorepo 项目，所以存在多个子项目，自己的 vite 配置文件
        coverage: {
            provider: 'istanbul',
            include: ['packages/*/src/**/*.ts'],
            reporter: ['text', 'lcov']
        }
    }
})
