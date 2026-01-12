import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'
import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit'
import React, { ReactNode } from 'react'

interface PrivyProviderWrapperProps {
    children: ReactNode
}

const solanaHttpRpc = (process.env.VITE_SOLANA_RPC_URL as string) ?? 'https://api.mainnet-beta.solana.com'
const solanaWsRpc =
    (process.env.VITE_SOLANA_RPC_WS_URL as string) ??
    (solanaHttpRpc.startsWith('https://')
        ? solanaHttpRpc.replace('https://', 'wss://')
        : solanaHttpRpc.startsWith('http://')
          ? solanaHttpRpc.replace('http://', 'ws://')
          : 'wss://api.mainnet-beta.solana.com')

// Get the Privy App ID from environment variables
const PRIVY_APP_ID = (process.env.VITE_PRIVY_APP_ID as string) || ''

// eslint-disable-next-line no-console
console.log('=== Privy Debug Info ===')
// eslint-disable-next-line no-console
console.log('Privy App ID:', PRIVY_APP_ID)
// eslint-disable-next-line no-console
console.log('Solana RPC URL:', solanaHttpRpc)
// eslint-disable-next-line no-console
console.log('Solana WS RPC URL:', solanaWsRpc)
// eslint-disable-next-line no-console
console.log('========================')

export const PrivyProviderWrapper: React.FC<PrivyProviderWrapperProps> = ({ children }) => {
    return (
        <PrivyProvider
            appId={PRIVY_APP_ID}
            config={{
                appearance: {
                    theme: 'dark',
                    walletList: ['phantom', 'okx_wallet'],
                    walletChainType: 'solana-only'
                },
                loginMethods: ['wallet'],
                embeddedWallets: {
                    showWalletUIs: false,
                    ethereum: {
                        createOnLogin: 'off'
                    },
                    solana: {
                        createOnLogin: 'users-without-wallets'
                    }
                },
                externalWallets: {
                    solana: {
                        connectors: toSolanaWalletConnectors()
                    }
                },
                solana: {
                    rpcs: {
                        'solana:devnet': {
                            rpc: createSolanaRpc(solanaHttpRpc),
                            rpcSubscriptions: createSolanaRpcSubscriptions(solanaWsRpc)
                        },
                        'solana:mainnet': {
                            rpc: createSolanaRpc(solanaHttpRpc),
                            rpcSubscriptions: createSolanaRpcSubscriptions(solanaWsRpc)
                        }
                    }
                }
            }}
        >
            {children}
        </PrivyProvider>
    )
}
