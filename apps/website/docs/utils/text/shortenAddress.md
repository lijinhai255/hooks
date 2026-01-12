# shortenAddress

缩短地址显示，显示地址的前4个字符和后4个字符，中间用省略号连接。

## 函数签名

```typescript
function shortenAddress(address: string): string
```

## 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `address` | `string` | 地址字符串 |

## 返回值

返回缩短后的地址字符串，格式为 `"前4位...后4位"`。

如果输入为空字符串、`null` 或 `undefined`，返回空字符串 `""`。

## 功能特性

1. **标准地址格式** - 采用加密货币地址的通用显示格式
2. **保留关键信息** - 同时显示地址开头和结尾，便于识别
3. **空值安全** - 自动处理空值输入
4. **简洁高效** - 一行代码完成地址缩短

## 使用示例

### 基本用法

```typescript
import { shortenAddress } from '@miaoma-rhooks/utils'

// Solana 钱包地址
shortenAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU")
// "7xKX...gAsU"

// Ethereum 钱包地址
shortenAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")
// "0x74...0bEb"

// 短地址
shortenAddress("ABC123")
// "ABC...123"

// 空值处理
shortenAddress("")           // ""
shortenAddress(undefined as any)  // ""
```

### 实际应用场景

#### 1. 钱包地址显示

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'

function WalletCard({ address, balance }: { address: string; balance: number }) {
  return (
    <div className="wallet-card">
      <div className="address">
        {shortenAddress(address)}
      </div>
      <div className="balance">
        {balance} SOL
      </div>
    </div>
  )
}

<WalletCard
  address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  balance={10.5}
/>
// 显示: "7xKX...gAsU"
```

#### 2. 交易列表

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'

function TransactionList({ transactions }: { transactions: Array<{ from: string; to: string }> }) {
  return (
    <table>
      {transactions.map((tx, index) => (
        <tr key={index}>
          <td>{shortenAddress(tx.from)}</td>
          <td>→</td>
          <td>{shortenAddress(tx.to)}</td>
        </tr>
      ))}
    </table>
  )
}
```

#### 3. NFT 创建者信息

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'

function NFTEdge({ creator }: { creator: string }) {
  return (
    <div className="nft-creator" title={creator}>
      Created by {shortenAddress(creator)}
    </div>
  )
}

<NFTEdge creator="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" />
// 显示: "Created by 7xKX...gAsU"
```

#### 4. 代币合约地址

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'

function TokenInfo({ mintAddress, name }: { mintAddress: string; name: string }) {
  return (
    <div>
      <h3>{name}</h3>
      <p title={mintAddress}>
        Contract: {shortenAddress(mintAddress)}
      </p>
    </div>
  )
}
```

### 在悬停时显示完整地址

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'

function AddressWithTooltip({ address }: { address: string }) {
  return (
    <span title={address} style={{ cursor: 'pointer' }}>
      {shortenAddress(address)}
    </span>
  )
}

<addressWithTooltip address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" />
// 鼠标悬停时显示完整地址
```

### 复制功能结合使用

```tsx
import { shortenAddress } from '@miaoma-rhooks/utils'
import { useState } from 'react'

function CopyableAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy}>
      {copied ? '已复制!' : shortenAddress(address)}
    </button>
  )
}
```

## 与 truncateText 的区别

| 特性 | shortenAddress | truncateText |
| --- | --- | --- |
| 用途 | 专门用于地址缩短 | 通用文本截断 |
| 格式 | `"前4位...后4位"` | `"前N位..."` |
| 可配置 | 固定4+4格式 | 可自定义最大长度 |
| 适用场景 | 钱包地址、合约地址、交易哈希 | 任何文本内容 |
| 示例 | `"7xKX...gAsU"` | `"7xKXtg..."` |

**选择建议：**
- 显示区块链地址 → `shortenAddress`
- 显示普通文本内容 → `truncateText`

## 注意事项

- 该函数专门为地址设计，固定显示前4位和后4位
- 不检查地址的有效性，只进行字符串处理
- 对于长度不足8位的地址，会尽可能显示
- 建议配合 `title` 属性使用，方便用户查看完整地址
- 常见的地址格式：
  - Solana 地址：通常为 32-44 位（Base58）
  - Ethereum 地址：42 位（0x开头）
  - BTC 地址：26-35 位（Base58）

## 最佳实践

### ✅ 推荐做法

```tsx
// 1. 使用 title 属性提供完整信息
<span title={address}>{shortenAddress(address)}</span>

// 2. 提供复制功能
<button onClick={() => copy(address)}>
  {shortenAddress(address)}
</button>

// 3. 在地址列表中使用
{addresses.map(addr => (
  <div key={addr} title={addr}>
    {shortenAddress(addr)}
  </div>
))}
```

### ❌ 不推荐做法

```tsx
// 1. 不要在需要完整地址的地方使用
<SendTo address={shortenAddress(address)} />  // 错误！

// 2. 不要用于非地址文本
shortenAddress("Hello World")  // "Hell...rld" (不推荐)

// 3. 不要在不提供完整地址的情况下使用
<div>{shortenAddress(address)}</div>  // 用户无法获取完整地址
```

## 样式建议

```css
.shortened-address {
  font-family: monospace;  /* 等宽字体更适合地址 */
  cursor: pointer;
  transition: opacity 0.2s;
}

.shortened-address:hover {
  opacity: 0.8;
}
```
