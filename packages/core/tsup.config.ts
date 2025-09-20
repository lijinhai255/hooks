import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/*'], // 指定入口文件，这里包含了 src 下的所有文件
    dts: true, // 生成 TypeScript 类型声明文件 (.d.ts)
    splitting: false, // 关闭代码分割，每个入口文件生成一个产物
    sourcemap: false, // 不生成 sourcemap
    minify: true, // 压缩代码
    clean: true, // 构建前清理输出目录
    format: ['esm'], // 输出格式为 ES Module
    outDir: 'es', // 指定输出目录为 es
    outExtension: () => ({
        js: '.js'
    })
})
