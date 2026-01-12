# truncateText

截断文本，如果文本长度超过指定长度，则截断并添加省略号。

## 函数签名

```typescript
function truncateText(text: string, maxLength: number = 8): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `text` | `string` | - | 原始文本 |
| `maxLength` | `number` | `8` | 最大长度 |

## 返回值

返回截断后的文本字符串：
- 如果文本长度 ≤ `maxLength`，返回原文本
- 如果文本长度 > `maxLength`，返回截断后的文本 + "..."
- 如果文本为空（`""`、`null`、`undefined`），返回空字符串 `""`

## 功能特性

1. **智能截断** - 自动判断是否需要截断
2. **省略号标记** - 超长文本自动添加 "..."
3. **空值处理** - 安全处理空值输入
4. **可配置长度** - 支持自定义最大长度

## 使用示例

### 基本用法（使用默认长度）

```typescript
import { truncateText } from '@miaoma-rhooks/utils'

// 超过默认长度 8
truncateText("Hello World")        // "Hello..."
truncateText("Blockchain")         // "Blockch..."
truncateText("This is a long text") // "This is..."

// 未超过长度
truncateText("Hello")              // "Hello"
truncateText("Hi")                 // "Hi"

// 空值处理
truncateText("")                   // ""
truncateText(undefined as any)     // ""
```

### 自定义最大长度

```typescript
import { truncateText } from '@miaoma-rhooks/utils'

// 较短的最大长度
truncateText("Hello World", 3)     // "Hel..."
truncateText("Blockchain", 5)      // "Block..."

// 较大的最大长度
truncateText("Hello World", 20)    // "Hello World"
truncateText("This is a long text", 15) // "This is a long..."

// 长度为 0
truncateText("Hello World", 0)     // "..."
```

### 实际应用场景

#### 1. 钱包地址截断

```typescript
// 截断钱包地址，显示前 6 位
const address = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
truncateText(address, 6)           // "7xKXtg..."
```

#### 2. 用户名截断

```typescript
// 限制用户名显示长度
const username = "SuperLongUsername123"
truncateText(username, 12)         // "SuperLongUse..."
```

#### 3. 交易哈希截断

```typescript
// 截断交易哈希
const txHash = "5j7s8N9x2mK4pL6vQ8wR3tY1u"
truncateText(txHash, 10)           // "5j7s8N9x2m..."
```

#### 4. 列表项文本截断

```typescript
// UI 列表项中的长文本
const items = [
  "Very long item name that needs to be truncated",
  "Short",
  "Medium length text"
]

items.map(item => truncateText(item, 15))
// ["Very long item...", "Short", "Medium length..."]
```

## 注意事项

- 截断长度包含省略号的三个字符
- 省略号始终是英文的三个点 `...`
- 对于空字符串或 `null`/`undefined`，返回空字符串
- 默认最大长度为 8，适用于大多数场景

## 与其他工具函数配合使用

### 结合 formatTokenAmount

```typescript
import { truncateText, formatTokenAmount } from '@miaoma-rhooks/utils'

const tokenName = "SuperLongTokenNameThatIsHardToRead"
const amount = "1500000000"

const display = `${truncateText(tokenName, 10)}: ${formatTokenAmount(amount, 2, 9)}`
console.log(display)  // "SuperLongTo: 1.5"
```

### 在 React 组件中使用

```tsx
import { truncateText } from '@miaoma-rhooks/utils'

function WalletAddress({ address }: { address: string }) {
  return (
    <div title={address}>
      {truncateText(address, 8)}
    </div>
  )
}

// 使用
<WalletAddress address="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" />
// 显示: "7xKXtg..."，鼠标悬停显示完整地址
```

## 性能说明

- 时间复杂度：O(n)，其中 n 为文本长度
- 空间复杂度：O(n)，创建新的字符串
- 适用于短文本截断，对于超长文本（如文章内容），建议使用其他方案
