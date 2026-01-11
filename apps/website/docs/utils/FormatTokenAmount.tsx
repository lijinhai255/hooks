import { formatTokenAmount } from '@miaoma-rhooks/utils'

function FormatTokenAmountDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>代币数量格式化示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>SPL Token（6位小数）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000</strong> 最小单位 = {formatTokenAmount('1000000')} 代币
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000</strong> 最小单位 = {formatTokenAmount('1500000')} 代币
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> 最小单位 = {formatTokenAmount('1234567')} 代币
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>SOL（9位小数）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000</strong> lamports = {formatTokenAmount('1000000000', 2, 9)} SOL
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000,000</strong> lamports = {formatTokenAmount('1500000000', 2, 9)} SOL
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> lamports = {formatTokenAmount('1234567890', 2, 9)} SOL
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>千分位格式化</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000</strong> 最小单位 = {formatTokenAmount('1000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>123,456,789,012</strong> 最小单位 = {formatTokenAmount('123456789012')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000,000</strong> 最小单位 = {formatTokenAmount('1000000000000')}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>自定义小数位数</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> (0位小数) = {formatTokenAmount('1234567', 0)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> (2位小数) = {formatTokenAmount('1234567', 2)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> (4位小数) = {formatTokenAmount('1234567', 4)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> (6位小数) = {formatTokenAmount('1234567', 6)}
                </div>
            </div>

            <div>
                <h4>边界情况</h4>
                <div style={{ marginBottom: '10px' }}>null = {formatTokenAmount(null)}</div>
                <div style={{ marginBottom: '10px' }}>undefined = {formatTokenAmount(undefined)}</div>
                <div style={{ marginBottom: '10px' }}>0 = {formatTokenAmount(0)}</div>
            </div>
        </div>
    )
}

export default FormatTokenAmountDemo
