import { formatTokenAmount, solToLamports } from '@miaoma-rhooks/utils'

function SolToLamportsDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>SOL 转 Lamports 示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>整数 SOL 转换</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1 SOL</strong> = {solToLamports(1).toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>2 SOL</strong> = {solToLamports(2).toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10 SOL</strong> = {solToLamports(10).toString()} lamports
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>小数 SOL 转换</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.5 SOL</strong> = {solToLamports('0.5').toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1.5 SOL</strong> = {solToLamports('1.5').toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0.000000001 SOL</strong> = {solToLamports('0.000000001').toString()} lamports (最小单位)
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>精确度测试</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1.23456789 SOL</strong> = {solToLamports('1.23456789').toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1.234567890123 SOL</strong> = {solToLamports('1.234567890123').toString()} lamports
                    <br />
                    <small style={{ color: '#666' }}>（超过9位小数会被截断）</small>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>大额数值</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1000 SOL</strong> = {solToLamports('1000').toString()} lamports
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>1000.5 SOL</strong> = {solToLamports('1000.5').toString()} lamports
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>配合 formatTokenAmount 使用</h4>
                <div style={{ marginBottom: '10px' }}>
                    用户输入: <strong>1.5 SOL</strong>
                    <br />
                    转换为 lamports: <code>{solToLamports('1.5').toString()}</code>
                    <br />
                    格式化显示: <strong>{formatTokenAmount(solToLamports('1.5').toString(), 2, 9)} SOL</strong>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    用户输入: <strong>0.000000001 SOL</strong>
                    <br />
                    转换为 lamports: <code>{solToLamports('0.000000001').toString()}</code>
                    <br />
                    格式化显示: <strong>{formatTokenAmount(solToLamports('0.000000001').toString(), 9, 9)} SOL</strong>
                </div>
            </div>

            <div>
                <h4>边界情况</h4>
                <div style={{ marginBottom: '10px' }}>0 SOL = {solToLamports(0).toString()} lamports</div>
                <div style={{ marginBottom: '10px' }}>NaN = {solToLamports(NaN).toString()} lamports (错误处理)</div>
            </div>
        </div>
    )
}

export default SolToLamportsDemo
