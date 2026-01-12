# cluPrice

计算代币的美元价值，将代币最小单位转换为格式化的 USD 金额显示。

## 函数签名

```typescript
function cluPrice(
  value: string | number | undefined | null,
  tokenDecimals: number,
  price: string | number | undefined | null
): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `string \| number \| undefined \| null` | - | 代币数量（最小单位） |
| `tokenDecimals` | `number` | - | 代币精度（如9、6等） |
| `price` | `string \| number \| undefined \| null` | - | 单个代币的 USD 价格 |

## 返回值

返回格式化后的美元价值字符串（带 $ 符号）。

## 功能特性

1. **自动格式化** - 返回已格式化的美元金额字符串
2. **精确计算** - 使用 BigNumber 进行精确的浮点数运算
3. **紧凑格式** - 自动调用 `formatUsdAmount`，支持 K、M、B 紧凑显示
4. **边界处理** - 自动处理无效输入，返回 `$0`

## 使用示例

```typescript
import { cluPrice } from '@miaoma-rhooks/utils'

// SOL 代币（tokenDecimals = 9）
cluPrice(1500000000, 9, 150)  // "$225.00"
cluPrice(1500000000, 9, 200)  // "$300.00"
cluPrice(1000000000, 9, 100)  // "$100.00"

// 大数值自动紧凑格式
cluPrice(1500000000000, 9, 150)  // "225.00K"
cluPrice(15000000000000, 9, 150) // "2.25M"

// USDC 等代币（tokenDecimals = 6）
cluPrice(2500000, 6, 1)    // "$2.50"
cluPrice(1000000, 6, 10)   // "$10.00"
cluPrice(5000000, 6, 2)    // "$10.00"

// 字符串输入
cluPrice("1500000000", 9, "150")  // "$225.00"

// 边界情况
cluPrice(0, 9, 150)        // "$0"
cluPrice(null, 9, 150)     // "$0"
cluPrice(1500000000, 9, 0) // "$0"
```

## 计算过程

```typescript
// 内部使用 BigNumber 进行精确计算
const amount = new BigNumber(value || 0)
const tokenPrice = new BigNumber(price || 0)

// 1. 除以 10^tokenDecimals 转换为实际代币数量
const divisor = new BigNumber(10).pow(tokenDecimals)
const tokenValue = amount.div(divisor)

// 2. 乘以价格得到 USD 价值
const usdValue = tokenValue.times(tokenPrice)

// 3. 使用 formatUsdAmount 格式化显示
return formatUsdAmount(usdValue.toNumber())
```

## 与 calculateRoyaltyValue 的区别

| 特性 | cluPrice | calculateRoyaltyValue |
| --- | --- | --- |
| 返回类型 | `string`（格式化字符串） | `number`（数字） |
| 是否格式化 | 是（自动调用 formatUsdAmount） | 否 |
| 精度处理 | 使用 BigNumber | 使用 Math.pow |
| 使用场景 | 直接显示美元金额 | 需要原始数值进行计算 |

**选择建议：**
- 直接显示格式化的美元金额 → 使用 `cluPrice`
- 需要原始数值进行后续计算 → 使用 `calculateRoyaltyValue`

## 结合使用示例

```typescript
import { cluPrice, calculateRoyaltyValue } from '@miaoma-rhooks/utils'

const amount = 1500000000  // lamports
const solPrice = 150        // $150 SOL

// 方式1: 直接显示（推荐）
const display = cluPrice(amount, 9, solPrice)
console.log(display)  // "$225.00"

// 方式2: 如果需要进行计算
const value = calculateRoyaltyValue(amount, 9, solPrice)
const totalRoyalty = value * 2  // 可以进行数学运算
console.log(totalRoyalty)  // 450

// 然后再格式化
import { formatUsdAmount } from '@miaoma-rhooks/utils'
console.log(formatUsdAmount(totalRoyalty))  // "$450.00"
```

## 注意事项

- 该函数返回的是**已格式化的字符串**，不可直接用于数学计算
- 使用 BigNumber 确保大数精度
- 当 `value` 或 `price` 无效时，返回 `"$0"`
- 自动应用紧凑格式（K、M、B），使大数值更易读
