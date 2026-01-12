# formatUsdAmount

格式化美元金额，支持紧凑格式（K、M、B）和小数字的特殊显示。

## 函数签名

```typescript
function formatUsdAmount(
  value: string | number | undefined | null,
  compact: boolean = true
): string
```

## 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `value` | `string \| number \| undefined \| null` | - | 原始值（字符串或数字） |
| `compact` | `boolean` | `true` | 是否使用紧凑格式（K、M、B） |

## 返回值

返回格式化后的美元金额字符串。

## 功能特性

1. **紧凑格式支持** - 自动将大数字转换为 K、M、B 后缀
   - `>= 1e9` → 显示为 B（十亿）
   - `>= 1e6` → 显示为 M（百万）
   - `>= 1e3` → 显示为 K（千）

2. **小数字特殊显示** - 使用 Unicode 下标字符表示前导零
   - 例如：`0.000002255` → `$0.0₆2255`

3. **千分位分隔符** - 使用 `toLocaleString` 自动添加千分位

4. **灵活的输入类型** - 支持字符串和数字类型

## 使用示例

```typescript
import { formatUsdAmount } from '@miaoma-rhooks/utils'

// 紧凑格式（默认）
formatUsdAmount(1500000000)        // "1.50B"
formatUsdAmount(2500000)           // "2.50M"
formatUsdAmount(1500)              // "1.50K"
formatUsdAmount(123.45)            // "$123.45"

// 小数字特殊显示
formatUsdAmount(0.000002255)       // "$0.0₆2255"
formatUsdAmount(0.0000123)         // "$0.0₅123"

// 非紧凑格式
formatUsdAmount(1234567.89, false) // "$1,234,567.89"

// 边界情况
formatUsdAmount(0)                 // "$0"
formatUsdAmount(null)              // "$0"
formatUsdAmount(undefined)         // "$0"

// 字符串输入
formatUsdAmount("2500000")         // "2.50M"
```

## 注意事项

- 当 `value` 为 `null`、`undefined`、`0` 或空值时，返回 `"$0"`
- 小于 `0.001` 且大于 `0` 的数字会使用下标字符显示前导零数量
- 使用 `en-US` 本地化设置，确保千分位分隔符为逗号
