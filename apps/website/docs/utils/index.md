# Utils 工具函数列表

## 计算工具

| 工具函数名称 | 描述 |
| --- | --- |
| `formatTokenAmount` | [代币数量格式化工具，用于将最小单位（如 lamports）转换为可读的代币数量，并支持千分位格式化](./culate/format-token-amount) |
| `solToLamports` | [将用户输入的 SOL 金额转换为 lamports（乘以10^9）](./culate/sol-to-lamports) |
| `formatValue` | [格式化数值显示为紧凑的美元格式（K、M、B）](./culate/format-value) |
| `formatTokenAmountWithDecimals` | [根据指定的代币精度格式化代币数量，支持智能小数位数调整](./culate/format-token-amount-with-decimals) |
| `formatSmallNumber` | [格式化小数字，使用下标数字表示前导零数量](./culate/format-small-number) |
| `formatUsdAmount` | [格式化美元金额，支持紧凑格式和小数字特殊显示](./culate/formatUsdAmount) |
| `calculateRoyaltyValue` | [计算版税价值，将代币最小单位转换为 USD 美元价值](./culate/calculateRoyaltyValue) |
| `cluPrice` | [计算代币的美元价值](./culate/clu-price) |
| `formatPercentage` | [格式化百分比，自动添加符号和颜色](./culate/format-percentage) |
| `formatAmountInYiOrWan` | [格式化金额为亿/万单位](./culate/format-amount-in-yi-or-wan) |

## 文本工具

| 工具函数名称 | 描述 |
| --- | --- |
| `truncateText` | [截断文本，如果超过指定长度则使用省略号](./text/truncate-text) |
| `shortenAddress` | [缩短地址显示，显示前4个字符和后4个字符](./text/shorten-address) |
