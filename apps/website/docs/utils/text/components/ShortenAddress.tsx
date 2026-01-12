import { shortenAddress } from '@miaoma-rhooks/utils'
import { useState } from 'react'

export default function ShortenAddressDemo() {
  const [copied, setCopied] = useState(false)

  const examples = [
    {
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      label: 'Solana 钱包地址'
    },
    {
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      label: 'Ethereum 钱包地址'
    },
    {
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      label: 'Bitcoin 地址'
    },
    {
      address: 'ABC123',
      label: '短地址'
    },
    {
      address: '',
      label: '空地址'
    }
  ]

  const handleCopy = async (address: string) => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>shortenAddress 示例</h3>

      {examples.map((example, index) => (
        <div
          key={index}
          style={{
            marginBottom: '16px',
            padding: '12px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}
        >
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            {example.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                原始地址:
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  color: '#666',
                  background: '#f9f9f9',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
              >
                {example.address || '(空)'}
              </div>
            </div>
            <div style={{
              padding: '8px 16px',
              background: '#e3f2fd',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: '#1976d2'
            }}>
              {shortenAddress(example.address)}
            </div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '16px', padding: '12px', background: '#fff3e0', borderRadius: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          🔧 交互式测试
        </div>
        <input
          type="text"
          placeholder="输入地址..."
          defaultValue="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
          onChange={(e) => {
            const result = shortenAddress(e.target.value)
            const resultElement = document.getElementById('interactive-result')
            if (resultElement) {
              resultElement.textContent = `结果: "${result}"`
            }
          }}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'monospace'
          }}
        />
        <div id="interactive-result" style={{ marginTop: '8px', fontSize: '14px', color: '#1976d2' }}>
          结果: "7xKX...gAsU"
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#e8f5e9', borderRadius: '4px' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          📋 复制功能示例
        </div>
        <button
          onClick={() => handleCopy('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU')}
          style={{
            padding: '8px 16px',
            background: copied ? '#4caf50' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {copied ? '✓ 已复制!' : shortenAddress('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU')}
        </button>
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          点击按钮复制完整地址
        </div>
      </div>
    </div>
  )
}
