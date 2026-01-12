import { formatAmountInYiOrWan } from '@miaoma-rhooks/utils'

function FormatAmountInYiOrWanDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>formatAmountInYiOrWan 金额格式化示例（亿/万）</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>亿单位</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>900,000,000,000,000,000</strong> = {formatAmountInYiOrWan('90000000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>100,000,000,000,000,000</strong> = {formatAmountInYiOrWan('10000000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>950,000,000,000,000,000</strong> = {formatAmountInYiOrWan('95000000000000000')}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>小金额（亿单位）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>100,000,000,000,000</strong> = {formatAmountInYiOrWan('100000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>500,000,000,000,000</strong> = {formatAmountInYiOrWan('500000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10,000,000,000,000</strong> = {formatAmountInYiOrWan('10000000000000')}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>常见金额</h4>
                <div style={{ padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '8px', border: '1px solid #e1e8ed' }}>
                    <div style={{ marginBottom: '10px', color: '#1a202c' }}>
                        <strong>公司市值示例:</strong>
                    </div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>小公司: {formatAmountInYiOrWan('10000000000000000')}</div>
                    <div style={{ color: '#2d3748', marginBottom: '5px' }}>中型公司: {formatAmountInYiOrWan('50000000000000000')}</div>
                    <div style={{ color: '#2d3748' }}>大公司: {formatAmountInYiOrWan('90000000000000000')}</div>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>大额金额（带千分位）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1,000,000,000,000,000</strong> = {formatAmountInYiOrWan('100000000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>5,000,000,000,000,000</strong> = {formatAmountInYiOrWan('500000000000000000')}
                </div>
            </div>

            <div>
                <h4>小数精度</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>950,000,000,000,000</strong> = {formatAmountInYiOrWan('95000000000000000')}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>15,050,000,000,000</strong> = {formatAmountInYiOrWan('150500000000000')}
                </div>
            </div>
        </div>
    )
}

export default FormatAmountInYiOrWanDemo
