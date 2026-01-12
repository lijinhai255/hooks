# calculateRoyaltyValue

计算版税价值，将代币最小单位（如 lamports）转换为 USD 美元价值。

## 函数签名

```typescript
function calculateRoyaltyValue(
  amount: string | number | undefined | null,
  tokenDecimals: number = 9,
  price: number
): number
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `amount` | `string \| number \| undefined \| null` | - | 代币数量（最小单位） |
| `tokenDecimals` | `number` | `9` | 代币精度（如9、6等） |
| `price` | `number` | - | 单个代币的 USD 价格 |

## 返回值

返回 USD 美元价值的数字（未格式化）。

## 功能特性

1. **灵活的代币精度** - 支持不同的代币精度（6、9 等）
   - 默认为 `9`（SOL 的精度）
   - 可配置为 `6`（USDC 等稳定币）

2. **自动类型转换** - 支持字符串和数字类型的输入

3. **精确计算** - 使用 `Math.pow(10, tokenDecimals)` 进行除法运算

4. **边界处理** - 自动处理 `null`、`undefined` 或 `0` 的情况

## 使用示例

```typescript
import { calculateRoyaltyValue } from '@miaoma-rhooks/utils'

// SOL 代币（tokenDecimals = 9，默认）
calculateRoyaltyValue(1500000000, 9, 150)  // 225
calculateRoyaltyValue(1500000000, 9, 200)  // 300
calculateRoyaltyValue(1000000000, 9, 100)  // 100

// USDC 等代币（tokenDecimals = 6）
calculateRoyaltyValue(2500000, 6, 1)       // 2.5
calculateRoyaltyValue(1000000, 6, 10)      // 10
calculateRoyaltyValue(5000000, 6, 2)       // 10

// 使用默认 tokenDecimals = 9
calculateRoyaltyValue(1500000000, 150)     // 225

// 字符串输入
calculateRoyaltyValue("1500000000", 9, 150) // 225

// 边界情况
calculateRoyaltyValue(0, 9, 150)           // 0
calculateRoyaltyValue(null, 9, 150)        // 0
calculateRoyaltyValue(undefined, 9, 150)   // 0
calculateRoyaltyValue(1500000000, 9, 0)    // 0
```

## 结合 formatUsdAmount 使用

通常会将 `calculateRoyaltyValue` 和 `formatUsdAmount` 组合使用，以获得格式化的 USD 显示：

```typescript
import { calculateRoyaltyValue, formatUsdAmount } from '@miaoma-rhooks/utils'

// 计算并格式化版税价值
const royaltyAmount = 1500000000  // lamports
const solPrice = 150               // $150 SOL

// 1. 计算原始值
const usdValue = calculateRoyaltyValue(royaltyAmount, 9, solPrice)
console.log(usdValue)  // 225

// 2. 格式化显示
const formatted = formatUsdAmount(usdValue)
console.log(formatted)  // "$225.00"

// 一行代码完成
const result = formatUsdAmount(calculateRoyaltyValue(1500000000, 9, 150))
console.log(result)  // "$225.00"
```

## 注意事项

- 该函数返回的是**数字类型**，如需格式化显示，请配合 `formatUsdAmount` 使用
- 当 `amount` 或 `price` 为空值时，返回 `0`
- 计算公式：`(amount / 10^tokenDecimals) * price`
- 适用于计算代币的版税、手续费等场景

## 与 cluPrice 的区别

| 特性 | calculateRoyaltyValue | cluPrice |
| --- | --- | --- |
| 返回类型 | `number`（数字） | `string`（格式化字符串） |
| 是否格式化 | 否 | 是（自动调用 formatUsdAmount） |
| 使用场景 | 需要原始数值进行计算 | 直接显示美元金额 |
| 精度处理 | 使用 Math.pow | 使用 BigNumber |

**推荐使用场景：**
- 需要原始数值进行后续计算 → `calculateRoyaltyValue`
- 直接显示格式化的美元金额 → `cluPrice`
