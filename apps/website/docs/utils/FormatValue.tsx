import { formatValue } from '@miaoma-rhooks/utils'

function FormatValueDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>formatValue 数值格式化示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>B (十亿) 格式</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000</strong> = {formatValue(1000000000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000,000</strong> = {formatValue(1500000000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>2,500,000,000</strong> = {formatValue(2500000000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10,000,000,000</strong> = {formatValue(1e10)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>M (百万) 格式</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000</strong> = {formatValue(1000000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500,000</strong> = {formatValue(1500000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>5,000,000</strong> = {formatValue(5000000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234,567</strong> = {formatValue(1234567)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>K (千) 格式</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000</strong> = {formatValue(1000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,500</strong> = {formatValue(1500)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>5,000</strong> = {formatValue(5000)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,234</strong> = {formatValue(1234)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>小数值格式</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>100</strong> = {formatValue(100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>50.50</strong> = {formatValue(50.5)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1</strong> = {formatValue(1)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.50</strong> = {formatValue(0.5)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0</strong> = {formatValue(0)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>边界值测试</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>999</strong> = {formatValue(999)} <span style={{ color: '#666', marginLeft: '10px' }}>(小于 1K)</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000</strong> = {formatValue(1000)} <span style={{ color: '#666', marginLeft: '10px' }}>(刚好 1K)</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>999,999</strong> = {formatValue(999999)}{' '}
                    <span style={{ color: '#666', marginLeft: '10px' }}>(显示为 1000.00K)</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000</strong> = {formatValue(1000000)} <span style={{ color: '#666', marginLeft: '10px' }}>(刚好 1M)</span>
                </div>
            </div>

            <div>
                <h4>实际应用示例</h4>
                <div
                    style={{
                        padding: '15px',
                        backgroundColor: '#f0f4f8',
                        borderRadius: '8px',
                        border: '1px solid #e1e8ed'
                    }}
                >
                    <div style={{ marginBottom: '10px', color: '#1a202c' }}>
                        <strong>市场价值:</strong>
                    </div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>Tesla: {formatValue(850000000000)}</div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>Apple: {formatValue(2800000000000)}</div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>Startup: {formatValue(5000000)}</div>
                    <div style={{ color: '#2d3748' }}>Small Business: {formatValue(150000)}</div>
                </div>
            </div>
        </div>
    )
}

export default FormatValueDemo
