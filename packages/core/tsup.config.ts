import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/privy-provider.tsx', 'src/config.ts'], // 明确指定入口文件
    dts: true, // 生成 TypeScript 类型声明文件 (.d.ts)
    splitting: false, // 关闭代码分割
    sourcemap: false, // 不生成 sourcemap
    minify: false, // 不压缩代码，保持可读性
    clean: true, // 构建前清理输出目录
    format: ['esm'], // 输出格式为 ES Module
    outDir: 'es', // 指定输出目录为 es
    outExtension: () => ({
        js: '.js'
    }),
    // 不打包外部依赖，保持它们作为外部引用
    external: ['react', 'react-dom', '@privy-io/react-auth', '@privy-io/react-auth/solana', '@solana/kit']
})
