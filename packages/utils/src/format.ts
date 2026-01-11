import BigNumber from 'bignumber.js'
import BN from 'bn.js'

/**
 * 代币数量格式化工具
 * 将最小单位（如 lamports）转换为可读的代币数量
 */
export function formatTokenAmount(value: string | number | undefined | null, decimals: number = 2, solDecimals: number = 6): string {
    if (!value || value === 0) return '0'

    try {
        // 创建BigNumber实例
        const bn = new BN(value.toString())
        let divisor: BN
        let padLength: number

        if (solDecimals === 9) {
            divisor = new BN('1000000000') // 10^9
            padLength = 9
        } else {
            divisor = new BN('1000000') // 10^6 (默认)
            padLength = 6
        }

        // 执行除法运算
        const quotient = bn.div(divisor)
        const remainder = bn.mod(divisor)

        // 计算小数部分
        let decimalPart = ''
        if (decimals > 0 && !remainder.isZero()) {
            // 将余数转换为小数部分
            const paddedRemainder = remainder.toString().padStart(padLength, '0')
            const truncatedRemainder = paddedRemainder.substring(0, decimals)
            decimalPart = '.' + truncatedRemainder.replace(/0+$/, '') // 移除尾随零
        }

        const result = quotient.toString() + decimalPart

        // 使用toLocaleString格式化数字（添加千分位分隔符）
        const numericResult = parseFloat(result)
        return numericResult.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals
        })
    } catch {
        return '0'
    }
}

/**
 * 将用户输入的SOL金额转换为lamports（乘以10^9）
 * @param amount - 用户输入的SOL金额
 * @returns lamports数量的BigNumber
 */
export function solToLamports(amount: string | number): BN {
    try {
        const amountStr = amount.toString()
        const multiplier = new BN('1000000000') // 10^9

        // 处理小数点
        const parts = amountStr.split('.')
        const integerPart = parts[0] || '0'
        const decimalPart = (parts[1] || '').padEnd(9, '0').substring(0, 9)

        const integerBN = new BN(integerPart).mul(multiplier)
        const decimalBN = new BN(decimalPart)

        return integerBN.add(decimalBN)
    } catch {
        return new BN(0)
    }
}

/**
 * 格式化数值显示为紧凑的美元格式
 * @param value - 数值
 * @returns 格式化后的字符串，带有 K、M、B 后缀
 */
export const formatValue = (value: number): string => {
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(2)}K`
    } else {
        return `$${value.toFixed(2)}`
    }
}

/**
 * 根据指定的代币精度格式化代币数量
 * @param value - 原始值（字符串或数字）
 * @param tokenDecimals - 代币精度（如9、6等）
 * @param displayDecimals - 显示的小数位数，默认为2
 * @returns 格式化后的字符串
 */
export function formatTokenAmountWithDecimals(
    value: string | number | undefined | null,
    tokenDecimals: number = 9,
    displayDecimals: number = 2
): string {
    // 只检查 null/undefined/空字符串，不要检查数字 0
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        return '0'
    }

    try {
        // 创建BigNumber实例（使用 bignumber.js 处理浮点数精度）
        const bn = new BigNumber(value.toString())
        const divisor = new BigNumber(10).pow(tokenDecimals) // 10^tokenDecimals

        // 执行除法运算（使用浮点数除法，保留完整精度）
        const divided = bn.div(divisor)

        // 智能决定小数位数：
        // - 如果数值 >= 1，使用 displayDecimals
        // - 如果数值 < 1，自动扩展以保留有效数字，最多到 tokenDecimals
        let actualDecimals = displayDecimals
        if (divided.lt(1) && divided.gt(0)) {
            // 对于小于1的数，找到第一个非零数字的位置
            const dividedStr = divided.toFixed(tokenDecimals)
            const decimalPart = dividedStr.split('.')[1] || ''
            const firstNonZeroIndex = decimalPart.search(/[^0]/)

            if (firstNonZeroIndex !== -1) {
                // 保留足够的位数以显示有效数字
                actualDecimals = Math.min(tokenDecimals, Math.max(displayDecimals, firstNonZeroIndex + 3))
            }
        }

        // 格式化结果
        const resultStr = divided.toFixed(actualDecimals)
        const numericResult = parseFloat(resultStr)

        // 使用toLocaleString格式化数字（添加千分位分隔符）
        return numericResult.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: actualDecimals
        })
    } catch {
        return '0'
    }
}

/**
 * 格式化小数字，使用下标数字表示前导零
 * @param num - 要格式化的数字
 * @returns 格式化后的字符串
 *
 * @example
 * formatSmallNumber(0.00123) // "0.0₁23"
 * formatSmallNumber(0.0000123) // "0.0₄123"
 */
export function formatSmallNumber(num: number): string {
    const subscriptDigits: Record<string, string> = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉',
        '10': '₁₀',
        '11': '₁₁',
        '12': '₁₂',
        '13': '₁₃',
        '14': '₁₄'
    }

    if (!num) return '0.00'
    // 单独处理大于0的整数，返回4位小数
    if (Number.isInteger(num) && num > 0) {
        return num.toFixed(4)
    }
    // 将科学计数法转换为普通小数
    const normalizedNum = Number(num)?.toFixed(20)
    const numStr = normalizedNum?.toString() || ''

    // 如果不是小数，直接返回（此时只可能是0或负整数，已在前面处理）
    if (!numStr.includes('.')) return numStr

    const [integer, decimal] = numStr.split('.')

    // 计算前导零的数量
    let leadingZeros = 0
    for (let i = 0; i < decimal.length; i++) {
        if (decimal[i] === '0') {
            leadingZeros++
        } else {
            break
        }
    }

    // 如果没有前导零，直接返回原数字（限制长度）
    if (leadingZeros === 0) return numStr.substring(0, 6)

    // 构建结果：整数部分 + '.0' + 上标的零的数量 + 非零开始的小数部分
    const result = `${integer}.0${subscriptDigits[leadingZeros.toString() as keyof typeof subscriptDigits]}${decimal.slice(
        leadingZeros,
        leadingZeros + 4
    )}`

    return result
}

/**
 * 格式化美元金额
 * @param amount - 美元金额
 * @returns 格式化后的字符串（带$符号和千分位）
 */
export function formatUsdAmount(amount: number): string {
    if (!amount || amount <= 0) return '$0'

    // 使用 formatValue 进行格式化
    return formatValue(amount)
}

/**
 * 计算代币的美元价值
 * @param value - 代币数量（最小单位）
 * @param tokenDecimals - 代币精度（如9、6等）
 * @param price - 单个代币的美元价格
 * @returns 格式化后的美元价值字符串
 */
export function cluPrice(
    value: string | number | undefined | null,
    tokenDecimals: number,
    price: string | number | undefined | null
): string {
    // 使用 BigNumber 处理输入参数，避免精度问题
    try {
        const amount = new BigNumber(value || 0)
        const tokenPrice = new BigNumber(price || 0)

        // 如果amount或price无效，返回$0
        if (amount.lte(0) || tokenPrice.lte(0)) {
            return '$0'
        }

        // 使用 BigNumber 进行精确计算
        // 代币精度处理，除以10^tokenDecimals转换为实际代币数量
        const divisor = new BigNumber(10).pow(tokenDecimals)
        const tokenValue = amount.div(divisor)

        // 计算美元价值
        const usdValue = tokenValue.times(tokenPrice)

        // 转换为数字格式化
        const usdValueNumber = usdValue.toNumber()

        // 使用formatUsdAmount格式化并返回
        const result = formatUsdAmount(usdValueNumber)
        return result
    } catch {
        return '$0'
    }
}

/**
 * 格式化百分比
 * @param value - 原始值（字符串或数字）
 * @returns 格式化后的百分比字符串，包含颜色类名
 */
export function formatPercentage(value: string | number | undefined | null): { text: string; className: string } {
    if (value === null || value === undefined || value === '') {
        return { text: '0%', className: 'text-white' }
    }

    try {
        const numValue = typeof value === 'string' ? parseFloat(value) : value
        const sign = numValue >= 0 ? '+' : ''
        const className = numValue >= 0 ? 'text-[#32D668]' : 'text-[#FF3C4C]'

        return {
            text: `${sign}${numValue.toFixed(2)}%`,
            className
        }
    } catch {
        return { text: '0%', className: 'text-white' }
    }
}

/**
 * 格式化金额为亿/万单位
 * @param amount - 原始金额（需要除以 10^8 和 10^6 处理精度）
 * @returns 格式化后的字符串（如："9 亿"、"500 万"）
 */
export function formatAmountInYiOrWan(amount: string | number): string {
    if (!amount) return '0'

    try {
        // 使用 BigNumber 进行精确计算
        // 先除以 10^8 得到亿值，再除以 10^6 处理精度
        const amountBN = new BigNumber(amount)
            .dividedBy(100000000) // 10^8
            .dividedBy(1000000) // 10^6

        // >= 1亿，用亿单位
        if (amountBN.isGreaterThanOrEqualTo(1)) {
            return formatTokenAmountWithDecimals(amountBN.toNumber(), 0) + ' 亿'
        }
        // < 1亿，转换为万（乘以 10000）
        else {
            const wanValue = amountBN.multipliedBy(10000)
            return formatTokenAmountWithDecimals(wanValue.toNumber(), 0) + ' 万'
        }
    } catch {
        return '0'
    }
}
