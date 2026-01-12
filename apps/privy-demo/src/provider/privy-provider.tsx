'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana'
import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit'
import React, { ReactNode } from 'react'
import { ENVOBJ } from './config'

interface PrivyProviderWrapperProps {
    children: ReactNode
}

const solanaHttpRpc = ENVOBJ.NEXT_PUBLIC_HELIUS_RPC
const solanaWsRpc = solanaHttpRpc.startsWith('https://')
    ? solanaHttpRpc.replace('https://', 'wss://')
    : solanaHttpRpc.startsWith('http://')
      ? solanaHttpRpc.replace('http://', 'ws://')
      : 'wss://api.mainnet-beta.solana.com'

const PRIVY_APP_ID = ENVOBJ.NEXT_PUBLIC_PRIVY_ID

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
        // @ts-expect-error - React 19 type incompatibility with @privy-io/react-auth
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
