import { formatTokenAmountWithDecimals } from '@miaoma-rhooks/utils'

function FormatTokenAmountWithDecimalsDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>formatTokenAmountWithDecimals 示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>SOL (9位精度)</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000</strong> = {formatTokenAmountWithDecimals('1000000000', 9, 2)} SOL
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000,000</strong> = {formatTokenAmountWithDecimals('1500000000', 9, 2)} SOL
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> = {formatTokenAmountWithDecimals('1234567890', 9, 2)} SOL
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>SPL Token (6位精度)</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000</strong> = {formatTokenAmountWithDecimals('1000000', 6, 2)} Token
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000</strong> = {formatTokenAmountWithDecimals('1500000', 6, 2)} Token
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> = {formatTokenAmountWithDecimals('1234567', 6, 2)} Token
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>智能小数位数</h4>
                <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', border: '1px solid #e1e8ed' }}>
                    <div style={{ marginBottom: '10px', color: '#1a202c' }}>
                        <strong>小数值自动扩展小数位:</strong>
                    </div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>1 lamports = {formatTokenAmountWithDecimals('1', 9, 2)} SOL</div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>
                        100 lamports = {formatTokenAmountWithDecimals('100', 9, 2)} SOL
                    </div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>
                        1000 lamports = {formatTokenAmountWithDecimals('1000', 9, 2)} SOL
                    </div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>
                        10000 lamports = {formatTokenAmountWithDecimals('10000', 9, 2)} SOL
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>不同显示精度</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> (0位小数) = {formatTokenAmountWithDecimals('1234567890', 9, 0)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> (2位小数) = {formatTokenAmountWithDecimals('1234567890', 9, 2)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> (4位小数) = {formatTokenAmountWithDecimals('1234567890', 9, 4)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890</strong> (6位小数) = {formatTokenAmountWithDecimals('1234567890', 9, 6)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>千分位格式化</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000,000</strong> = {formatTokenAmountWithDecimals('1000000000000', 9, 2)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567,890,123</strong> = {formatTokenAmountWithDecimals('1234567890123', 9, 2)}
                </div>
            </div>

            <div>
                <h4>边界情况</h4>
                <div style={{ marginBottom: '10px' }}>null = {formatTokenAmountWithDecimals(null)}</div>
                <div style={{ marginBottom: '10px' }}>undefined = {formatTokenAmountWithDecimals(undefined)}</div>
                <div style={{ marginBottom: '10px' }}>0 = {formatTokenAmountWithDecimals(0)}</div>
            </div>
        </div>
    )
}

export default FormatTokenAmountWithDecimalsDemo
