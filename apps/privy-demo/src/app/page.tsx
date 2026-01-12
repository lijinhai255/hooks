'use client'

import { usePrivy } from '@privy-io/react-auth'

export default function Home() {
  const { login, logout, authenticated, user } = usePrivy()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            Privy 认证演示
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            使用 PrivyProviderWrapper 集成钱包连接功能
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-lg border border-zinc-200 p-8 dark:border-zinc-800">
          {authenticated ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-zinc-700 dark:text-zinc-300">
                已连接钱包
              </p>
              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
                <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                  {user?.wallet?.address}
                </p>
              </div>
              <button
                onClick={logout}
                className="h-12 w-48 rounded-full bg-red-600 px-5 text-white transition-colors hover:bg-red-700"
              >
                断开连接
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="h-12 w-48 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700"
            >
              连接钱包
            </button>
          )}

          <div className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            <p>支持的钱包: Phantom, OKX Wallet</p>
          </div>
        </div>
      </main>
    </div>
  )
}
