# Privy Demo

这是一个使用 Next.js 和 `@miaoma-rhooks/core` 包中的 `PrivyProviderWrapper` 组件的演示应用。

## 功能

- ✅ Privy 钱包连接
- ✅ 支持 Phantom 和 OKX Wallet
- ✅ Solana 主网集成
- ✅ 使用 Tailwind CSS 样式

## 环境变量

项目使用以下环境变量（已配置在 `.env.local`）：

```bash
NEXT_PUBLIC_PRIVY_APP_ID=cmbuaflbr00e0jv0mgokwch00
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=b07d54d7-eefa-4000-bd2c-ed98083240aa
```

## 运行项目

```bash
# 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
privy-demo/
├── src/
│   └── app/
│       ├── layout.tsx     # 根布局，包含 PrivyProviderWrapper
│       ├── page.tsx       # 主页，展示钱包连接功能
│       └── globals.css    # 全局样式
├── .env.local            # 环境变量配置
└── package.json          # 项目依赖
```

## 技术栈

- **Next.js 16** - React 框架
- **React 19** - UI 库
- **Tailwind CSS 4** - 样式框架
- **TypeScript** - 类型安全
- **@miaoma-rhooks/core** - Privy 集成组件
- **@privy-io/react-auth** - Privy 认证 SDK
- **@solana/kit** - Solana SDK

## 使用说明

1. 点击"连接钱包"按钮
2. 选择支持的钱包（Phantom 或 OKX Wallet）
3. 批准连接请求
4. 查看连接的钱包地址
5. 点击"断开连接"退出登录

## 注意事项

- 确保已安装钱包扩展程序
- 确保 Solana 网络配置正确
- 生产环境需要配置真实的 Privy App ID
