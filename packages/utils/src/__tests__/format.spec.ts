import { describe, expect, test } from 'vitest'

import {
    cluPrice,
    formatAmountInYiOrWan,
    formatPercentage,
    formatSmallNumber,
    formatTokenAmount,
    formatTokenAmountWithDecimals,
    formatUsdAmount,
    formatValue,
    solToLamports
} from '../format'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('formatTokenAmount', () => {
    describe('基本功能测试', () => {
        test('应该正确处理空值', () => {
            expect(formatTokenAmount(null)).toBe('0')
            expect(formatTokenAmount(undefined)).toBe('0')
            expect(formatTokenAmount('')).toBe('0')
            expect(formatTokenAmount(0)).toBe('0')
        })

        test('应该正确处理字符串类型的代币数量（默认6位小数）', () => {
            expect(formatTokenAmount('1000000')).toBe('1')
            expect(formatTokenAmount('2000000')).toBe('2')
            expect(formatTokenAmount('1500000')).toBe('1.5')
            expect(formatTokenAmount('1234567')).toBe('1.23')
        })

        test('应该正确处理数字类型的代币数量', () => {
            expect(formatTokenAmount(1000000)).toBe('1')
            expect(formatTokenAmount(1500000)).toBe('1.5')
        })

        test('应该正确处理小数值', () => {
            expect(formatTokenAmount('1500000', 2)).toBe('1.5')
            expect(formatTokenAmount('1234567', 2)).toBe('1.23')
            expect(formatTokenAmount('1234567', 4)).toBe('1.2345')
        })

        test('应该正确格式化为带千分位的数字', () => {
            expect(formatTokenAmount('1000000000')).toBe('1,000')
            expect(formatTokenAmount('1500000000')).toBe('1,500')
            expect(formatTokenAmount('1234567890')).toBe('1,234.56')
            expect(formatTokenAmount('1000000000000')).toBe('1,000,000')
        })
    })

    describe('solDecimals 参数测试', () => {
        test('应该正确处理 9 位小数的代币（SOL）', () => {
            expect(formatTokenAmount('1000000000', 2, 9)).toBe('1')
            expect(formatTokenAmount('1500000000', 2, 9)).toBe('1.5')
            expect(formatTokenAmount('1234567890', 2, 9)).toBe('1.23')
        })

        test('应该正确处理 6 位小数的代币（默认）', () => {
            expect(formatTokenAmount('1000000', 2, 6)).toBe('1')
            expect(formatTokenAmount('1500000', 2, 6)).toBe('1.5')
        })
    })

    describe('decimals 参数测试', () => {
        test('应该正确控制小数位数', () => {
            expect(formatTokenAmount('1234567', 0)).toBe('1')
            expect(formatTokenAmount('1234567', 1)).toBe('1.2')
            expect(formatTokenAmount('1234567', 2)).toBe('1.23')
            expect(formatTokenAmount('1234567', 4)).toBe('1.2345')
            expect(formatTokenAmount('1234567', 6)).toBe('1.234567')
        })

        test('应该移除尾随零', () => {
            expect(formatTokenAmount('1000000', 4)).toBe('1')
            expect(formatTokenAmount('1500000', 4)).toBe('1.5')
            expect(formatTokenAmount('1005000', 4)).toBe('1.005')
        })
    })

    describe('边界情况测试', () => {
        test('应该处理非常小的数值', () => {
            expect(formatTokenAmount('1', 2)).toBe('0')
            expect(formatTokenAmount('1000', 2)).toBe('0')
            expect(formatTokenAmount('100', 6)).toBe('0.0001')
        })

        test('应该处理非常大的数值', () => {
            expect(formatTokenAmount('999999999999', 2)).toBe('999,999.99')
            expect(formatTokenAmount('1000000000000000', 2)).toBe('1,000,000,000')
        })

        test('应该处理错误输入', () => {
            expect(formatTokenAmount('invalid' as any)).toBe('0')
            expect(formatTokenAmount(NaN)).toBe('0')
        })
    })

    describe('千分位格式化测试', () => {
        test('应该正确添加千分位分隔符', () => {
            expect(formatTokenAmount('1000000000000', 2)).toBe('1,000,000')
            expect(formatTokenAmount('1234567890123', 2)).toBe('1,234,567.89')
            expect(formatTokenAmount('999999999999999', 2)).toBe('999,999,999.99')
        })
    })

    describe('组合测试', () => {
        test('SOL (9位小数) + 自定义小数位 + 千分位', () => {
            expect(formatTokenAmount('1234567890', 2, 9)).toBe('1.23')
            expect(formatTokenAmount('1000000000000', 2, 9)).toBe('1,000')
        })

        test('SPL Token (6位小数) + 自定义小数位 + 千分位', () => {
            expect(formatTokenAmount('1234567000', 2, 6)).toBe('1,234.56')
            expect(formatTokenAmount('999999999999', 0, 6)).toBe('999,999')
        })
    })
})

describe('solToLamports', () => {
    describe('基本功能测试', () => {
        test('应该正确转换整数 SOL', () => {
            expect(solToLamports(1).toString()).toBe('1000000000')
            expect(solToLamports(2).toString()).toBe('2000000000')
            expect(solToLamports(0).toString()).toBe('0')
        })

        test('应该正确转换小数 SOL', () => {
            expect(solToLamports('1.5').toString()).toBe('1500000000')
            expect(solToLamports('0.5').toString()).toBe('500000000')
            expect(solToLamports('0.000000001').toString()).toBe('1')
        })

        test('应该正确处理字符串类型输入', () => {
            expect(solToLamports('1').toString()).toBe('1000000000')
            expect(solToLamports('1.23456789').toString()).toBe('1234567890')
            expect(solToLamports('0.1').toString()).toBe('100000000')
        })
    })

    describe('边界情况测试', () => {
        test('应该处理很小的数值', () => {
            expect(solToLamports('0.000000001').toString()).toBe('1')
            expect(solToLamports('0.000000000').toString()).toBe('0')
        })

        test('应该处理多位小数', () => {
            expect(solToLamports('1.234567890').toString()).toBe('1234567890')
            expect(solToLamports('0.123456789').toString()).toBe('123456789')
        })

        test('应该截断超过9位的小数', () => {
            expect(solToLamports('1.123456789999').toString()).toBe('1123456789')
        })
    })

    describe('错误处理测试', () => {
        test('应该处理无效输入', () => {
            expect(solToLamports(NaN).toString()).toBe('0')
            expect(solToLamports('invalid' as any).toString()).toBe('0')
        })
    })

    describe('大额数值测试', () => {
        test('应该正确处理大额 SOL', () => {
            expect(solToLamports('1000').toString()).toBe('1000000000000')
            expect(solToLamports('1000.5').toString()).toBe('1000500000000')
        })
    })
})

describe('formatValue', () => {
    describe('基本功能测试', () => {
        test('应该正确格式化为 B (十亿)', () => {
            expect(formatValue(1000000000)).toBe('$1.00B')
            expect(formatValue(1500000000)).toBe('$1.50B')
            expect(formatValue(2500000000)).toBe('$2.50B')
        })

        test('应该正确格式化为 M (百万)', () => {
            expect(formatValue(1000000)).toBe('$1.00M')
            expect(formatValue(1500000)).toBe('$1.50M')
            expect(formatValue(5000000)).toBe('$5.00M')
        })

        test('应该正确格式化为 K (千)', () => {
            expect(formatValue(1000)).toBe('$1.00K')
            expect(formatValue(1500)).toBe('$1.50K')
            expect(formatValue(5000)).toBe('$5.00K')
        })

        test('应该正确格式化小数值', () => {
            expect(formatValue(100)).toBe('$100.00')
            expect(formatValue(50.5)).toBe('$50.50')
            expect(formatValue(1)).toBe('$1.00')
            expect(formatValue(0.5)).toBe('$0.50')
        })
    })

    describe('边界情况测试', () => {
        test('应该正确处理边界值', () => {
            expect(formatValue(999)).toBe('$999.00') // 小于 1K
            expect(formatValue(1000)).toBe('$1.00K') // 刚好 1K
            expect(formatValue(999999)).toBe('$1000.00K') // 接近 1M (999999/1000 = 999.999 → 1000.00K)
            expect(formatValue(1000000)).toBe('$1.00M') // 刚好 1M
            expect(formatValue(999999999)).toBe('$1000.00M') // 接近 1B (999999999/1000000 = 999.999999 → 1000.00M)
            expect(formatValue(1000000000)).toBe('$1.00B') // 刚好 1B
        })

        test('应该处理小数精度', () => {
            expect(formatValue(1234.56)).toBe('$1.23K')
            expect(formatValue(1234567.89)).toBe('$1.23M')
            expect(formatValue(1234567890.12)).toBe('$1.23B')
        })
    })

    describe('极端情况测试', () => {
        test('应该处理非常大的数值', () => {
            expect(formatValue(1e10)).toBe('$10.00B')
            expect(formatValue(1e11)).toBe('$100.00B')
        })

        test('应该处理非常小的数值', () => {
            expect(formatValue(0)).toBe('$0.00')
            expect(formatValue(0.1)).toBe('$0.10')
            expect(formatValue(0.01)).toBe('$0.01')
        })
    })
})

describe('formatTokenAmountWithDecimals', () => {
    describe('基本功能测试', () => {
        test('应该正确处理空值', () => {
            expect(formatTokenAmountWithDecimals(null)).toBe('0')
            expect(formatTokenAmountWithDecimals(undefined)).toBe('0')
            expect(formatTokenAmountWithDecimals('')).toBe('0')
        })

        test('应该正确处理零值', () => {
            expect(formatTokenAmountWithDecimals(0)).toBe('0')
            expect(formatTokenAmountWithDecimals('0')).toBe('0')
        })

        test('应该正确格式化整数（9位精度）', () => {
            expect(formatTokenAmountWithDecimals('1000000000', 9, 2)).toBe('1')
            expect(formatTokenAmountWithDecimals('1500000000', 9, 2)).toBe('1.5')
            expect(formatTokenAmountWithDecimals('1234567890', 9, 2)).toBe('1.23')
        })

        test('应该正确格式化整数（6位精度）', () => {
            expect(formatTokenAmountWithDecimals('1000000', 6, 2)).toBe('1')
            expect(formatTokenAmountWithDecimals('1500000', 6, 2)).toBe('1.5')
        })
    })

    describe('智能小数位测试', () => {
        test('应该对小数值自动扩展小数位', () => {
            // 0.000000001 = 1e-9，需要扩展小数位
            const result1 = formatTokenAmountWithDecimals('1', 9, 2)
            expect(result1.length).toBeGreaterThan(0) // 应该显示有效数字

            const result2 = formatTokenAmountWithDecimals('100', 9, 2)
            expect(result2.length).toBeGreaterThan(0)
        })

        test('对大于等于1的数值使用displayDecimals', () => {
            expect(formatTokenAmountWithDecimals('1000000000', 9, 2)).toBe('1')
            expect(formatTokenAmountWithDecimals('1234567890', 9, 4)).toBe('1.2346')
        })
    })

    describe('千分位格式化测试', () => {
        test('应该添加千分位分隔符', () => {
            expect(formatTokenAmountWithDecimals('1000000000000', 9, 2)).toBe('1,000')
            expect(formatTokenAmountWithDecimals('1234567890123', 9, 2)).toBe('1,234.57')
        })
    })

    describe('不同精度测试', () => {
        test('应该支持不同的代币精度', () => {
            expect(formatTokenAmountWithDecimals('1000000', 6, 2)).toBe('1')
            expect(formatTokenAmountWithDecimals('100000000', 8, 2)).toBe('1')
            expect(formatTokenAmountWithDecimals('1000000000', 9, 2)).toBe('1')
        })

        test('应该支持不同的显示精度', () => {
            expect(formatTokenAmountWithDecimals('1234567890', 9, 0)).toBe('1')
            expect(formatTokenAmountWithDecimals('1234567890', 9, 4)).toBe('1.2346')
            expect(formatTokenAmountWithDecimals('1234567890', 9, 6)).toBe('1.234568')
        })
    })

    describe('边界情况测试', () => {
        test('应该处理非常大的数值', () => {
            const result = formatTokenAmountWithDecimals('999999999999999999', 9, 2)
            expect(result).toBeTruthy()
            expect(result).not.toBe('0')
        })

        test('应该处理极小数值', () => {
            const result = formatTokenAmountWithDecimals('1', 9, 2)
            expect(result).toBeTruthy()
        })
    })
})

describe('formatSmallNumber', () => {
    describe('基本功能测试', () => {
        test('应该正确处理零值', () => {
            expect(formatSmallNumber(0)).toBe('0.00')
            expect(formatSmallNumber(null as any)).toBe('0.00')
            expect(formatSmallNumber(undefined as any)).toBe('0.00')
        })

        test('应该正确处理正整数', () => {
            expect(formatSmallNumber(1)).toBe('1.0000')
            expect(formatSmallNumber(100)).toBe('100.0000')
            expect(formatSmallNumber(1234)).toBe('1234.0000')
        })

        test('应该正确格式化小数（无前导零）', () => {
            expect(formatSmallNumber(0.1)).toBe('0.1000')
            expect(formatSmallNumber(0.12)).toBe('0.1199')
            expect(formatSmallNumber(1.23)).toBe('1.2299')
        })
    })

    describe('下标数字格式化测试', () => {
        test('应该正确使用下标数字表示前导零', () => {
            expect(formatSmallNumber(0.01)).toBe('0.0₁1000') // 1个前导零
            expect(formatSmallNumber(0.001)).toBe('0.0₂1000') // 2个前导零
            expect(formatSmallNumber(0.0001)).toBe('0.0₃1000') // 3个前导零
            expect(formatSmallNumber(0.00001)).toBe('0.0₄1000') // 4个前导零
        })

        test('应该正确提取有效数字', () => {
            expect(formatSmallNumber(0.00123)).toBe('0.0₂1229')
            expect(formatSmallNumber(0.0000123)).toBe('0.0₄1230')
            expect(formatSmallNumber(0.000000123)).toBe('0.0₆1230')
        })
    })

    describe('边界情况测试', () => {
        test('应该处理非常小的数值', () => {
            expect(formatSmallNumber(0.000000000001)).toContain('0.0')
            expect(formatSmallNumber(0.0000000000001)).toContain('0.0')
        })

        test('应该处理科学计数法表示的数字', () => {
            expect(formatSmallNumber(1e-3)).toBe('0.0₂1000') // 1e-3 = 0.001
            expect(formatSmallNumber(1e-6)).toBe('0.0₅1000') // 1e-6 = 0.000001
        })
    })

    describe('显示格式测试', () => {
        test('应该包含正确的下标字符', () => {
            const result1 = formatSmallNumber(0.001)
            expect(result1).toContain('₂') // 下标2

            const result2 = formatSmallNumber(0.0001)
            expect(result2).toContain('₃') // 下标3
        })

        test('应该截取4位有效数字', () => {
            const result1 = formatSmallNumber(0.00123456)
            expect(result1).toBe('0.0₂1234') // 取4位有效数字

            const result2 = formatSmallNumber(0.0000123456)
            expect(result2).toBe('0.0₄1234') // 取4位有效数字
        })
    })
})

describe('formatUsdAmount', () => {
    describe('基本功能测试', () => {
        test('应该正确处理零值和负数', () => {
            expect(formatUsdAmount(0)).toBe('$0')
            expect(formatUsdAmount(-1)).toBe('$0')
            expect(formatUsdAmount(null as any)).toBe('$0')
        })

        test('应该正确格式化美元金额', () => {
            expect(formatUsdAmount(100)).toBe('$100.00')
            expect(formatUsdAmount(1500)).toBe('$1.50K')
            expect(formatUsdAmount(1500000)).toBe('$1.50M')
        })
    })
})

describe('cluPrice', () => {
    describe('基本功能测试', () => {
        test('应该正确处理空值和零值', () => {
            expect(cluPrice(null, 9, null)).toBe('$0')
            expect(cluPrice(undefined, 9, undefined)).toBe('$0')
            expect(cluPrice(0, 9, 100)).toBe('$0')
            expect(cluPrice(100, 9, 0)).toBe('$0')
        })

        test('应该正确计算SOL的美元价值（9位精度）', () => {
            // 1 SOL * $100 = $100
            expect(cluPrice('1000000000', 9, 100)).toBe('$100.00')
            // 1.5 SOL * $100 = $150
            expect(cluPrice('1500000000', 9, 100)).toBe('$150.00')
            // 0.001 SOL * $100 = $0.1
            expect(cluPrice('1000000', 9, 100)).toBe('$0.10')
        })

        test('应该正确计算SPL Token的美元价值（6位精度）', () => {
            // 1000 Token * $10 = $10,000
            expect(cluPrice('1000000', 6, 10)).toBe('$10.00')
            // 1500 Token * $10 = $15,000
            expect(cluPrice('1500000', 6, 10)).toBe('$15.00')
        })
    })

    describe('不同价格测试', () => {
        test('应该正确处理不同的代币价格', () => {
            // 1 SOL * $50
            expect(cluPrice('1000000000', 9, 50)).toBe('$50.00')
            // 1 SOL * $200
            expect(cluPrice('1000000000', 9, 200)).toBe('$200.00')
        })
    })

    describe('大额数值测试', () => {
        test('应该正确处理大额代币数量', () => {
            // 1000 SOL * $100 = $100,000
            expect(cluPrice('1000000000000', 9, 100)).toBe('$100.00K')
            // 10000 SOL * $100 = $1,000,000
            expect(cluPrice('10000000000000', 9, 100)).toBe('$1.00M')
        })
    })

    describe('精度测试', () => {
        test('应该正确处理小数代币数量', () => {
            // 0.1 SOL * $100 = $10
            expect(cluPrice('100000000', 9, 100)).toBe('$10.00')
            // 0.01 SOL * $100 = $1
            expect(cluPrice('10000000', 9, 100)).toBe('$1.00')
        })

        test('应该正确处理小数价格', () => {
            // 1 SOL * $0.5 = $0.5
            expect(cluPrice('1000000000', 9, 0.5)).toBe('$0.50')
        })
    })
})

describe('formatPercentage', () => {
    describe('基本功能测试', () => {
        test('应该正确处理空值', () => {
            expect(formatPercentage(null)).toEqual({ text: '0%', className: 'text-white' })
            expect(formatPercentage(undefined)).toEqual({ text: '0%', className: 'text-white' })
            expect(formatPercentage('')).toEqual({ text: '0%', className: 'text-white' })
        })

        test('应该正确格式化正百分比', () => {
            const result1 = formatPercentage(10.5)
            expect(result1.text).toBe('+10.50%')
            expect(result1.className).toBe('text-[#32D668]')

            const result2 = formatPercentage(25.75)
            expect(result2.text).toBe('+25.75%')
            expect(result2.className).toBe('text-[#32D668]')
        })

        test('应该正确格式化负百分比', () => {
            const result1 = formatPercentage(-10.5)
            expect(result1.text).toBe('-10.50%')
            expect(result1.className).toBe('text-[#FF3C4C]')

            const result2 = formatPercentage(-5.25)
            expect(result2.text).toBe('-5.25%')
            expect(result2.className).toBe('text-[#FF3C4C]')
        })

        test('应该正确格式化零值', () => {
            const result = formatPercentage(0)
            expect(result.text).toBe('+0.00%')
            expect(result.className).toBe('text-[#32D668]')
        })
    })

    describe('字符串输入测试', () => {
        test('应该正确处理字符串类型输入', () => {
            const result1 = formatPercentage('15.5')
            expect(result1.text).toBe('+15.50%')
            expect(result1.className).toBe('text-[#32D668]')

            const result2 = formatPercentage('-8.25')
            expect(result2.text).toBe('-8.25%')
            expect(result2.className).toBe('text-[#FF3C4C]')
        })
    })

    describe('精度测试', () => {
        test('应该保留2位小数', () => {
            expect(formatPercentage(10.123).text).toBe('+10.12%')
            expect(formatPercentage(10.127).text).toBe('+10.13%')
            expect(formatPercentage(-5.999).text).toBe('-6.00%')
        })
    })

    describe('边界情况测试', () => {
        test('应该处理极大值', () => {
            const result = formatPercentage(999.99)
            expect(result.text).toBe('+999.99%')
            expect(result.className).toBe('text-[#32D668]')
        })

        test('应该处理极小值', () => {
            const result1 = formatPercentage(0.001)
            expect(result1.text).toBe('+0.00%')

            const result2 = formatPercentage(-0.001)
            expect(result2.text).toBe('-0.00%')
        })
    })
})

describe('formatAmountInYiOrWan', () => {
    describe('基本功能测试', () => {
        test('应该正确处理空值', () => {
            expect(formatAmountInYiOrWan('')).toBe('0')
            expect(formatAmountInYiOrWan(0)).toBe('0')
            expect(formatAmountInYiOrWan(null as any)).toBe('0')
        })

        test('应该正确格式化为亿单位', () => {
            expect(formatAmountInYiOrWan('90000000000000000')).toBe('900 亿')
            expect(formatAmountInYiOrWan('10000000000000000')).toBe('100 亿')
        })

        test('应该正确格式化为亿单位（小数值）', () => {
            expect(formatAmountInYiOrWan('100000000000000')).toBe('1 亿')
            expect(formatAmountInYiOrWan('500000000000000')).toBe('5 亿')
        })
    })

    describe('边界情况测试', () => {
        test('应该正确处理亿边界值', () => {
            expect(formatAmountInYiOrWan('10000000000000000')).toBe('100 亿')
        })

        test('应该正确处理大额亿值', () => {
            expect(formatAmountInYiOrWan('95000000000000000')).toBe('950 亿')
            expect(formatAmountInYiOrWan('5000000000000000')).toBe('50 亿')
        })
    })

    describe('精度测试', () => {
        test('应该正确处理小数', () => {
            expect(formatAmountInYiOrWan('95000000000000000')).toBe('950 亿')
            expect(formatAmountInYiOrWan('150500000000000')).toBe('1.51 亿')
        })
    })

    describe('实际应用场景', () => {
        test('应该正确格式化常见金额', () => {
            expect(formatAmountInYiOrWan('1000000000000000')).toBe('10 亿')
            expect(formatAmountInYiOrWan('50000000000000000')).toBe('500 亿')
            expect(formatAmountInYiOrWan('100000000000000000')).toBe('1,000 亿')
        })
    })
})
