import { cluPrice } from '@miaoma-rhooks/utils'

function CluPriceDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>cluPrice 代币价值计算示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>SOL 价值计算（9位精度，价格 $100）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 SOL</strong> = {cluPrice('1000000000', 9, 100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1.5 SOL</strong> = {cluPrice('1500000000', 9, 100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.001 SOL</strong> = {cluPrice('1000000', 9, 100)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>SPL Token 价值计算（6位精度，价格 $10）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 Token</strong> = {cluPrice('1000000', 6, 10)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1.5 Tokens</strong> = {cluPrice('1500000', 6, 10)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>不同价格</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 SOL @ $50</strong> = {cluPrice('1000000000', 9, 50)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 SOL @ $200</strong> = {cluPrice('1000000000', 9, 200)}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>小数数量</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.1 SOL</strong> = {cluPrice('100000000', 9, 100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.01 SOL</strong> = {cluPrice('10000000', 9, 100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 SOL @ $0.5</strong> = {cluPrice('1000000000', 9, 0.5)}
                </div>
            </div>

            <div>
                <h4>大额数值</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1000 SOL</strong> = {cluPrice('1000000000000', 9, 100)}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10000 SOL</strong> = {cluPrice('10000000000000', 9, 100)}
                </div>
            </div>
        </div>
    )
}

export default CluPriceDemo
