import { formatSmallNumber } from '@miaoma-rhooks/utils'

function FormatSmallNumberDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>formatSmallNumber 示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>下标数字格式化</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.01</strong> = {formatSmallNumber(0.01)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.001</strong> = {formatSmallNumber(0.001)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.0001</strong> = {formatSmallNumber(0.0001)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.00001</strong> = {formatSmallNumber(0.00001)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>有效数字提取</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.00123</strong> = {formatSmallNumber(0.00123)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.0000123</strong> = {formatSmallNumber(0.0000123)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.000000123</strong> = {formatSmallNumber(0.000000123)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>普通数字</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0</strong> = {formatSmallNumber(0)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1</strong> = {formatSmallNumber(1)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>100</strong> = {formatSmallNumber(100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.1</strong> = {formatSmallNumber(0.1)}
                </div>
            </div>

            <div>
                <h4>科学计数法</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1e-3</strong> = {formatSmallNumber(1e-3)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1e-6</strong> = {formatSmallNumber(1e-6)}
                </div>
            </div>
        </div>
    )
}

export default FormatSmallNumberDemo
