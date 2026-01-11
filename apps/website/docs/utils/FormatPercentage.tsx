import { formatPercentage } from '@miaoma-rhooks/utils'

function FormatPercentageDemo() {
    return (
        <div style={{ padding: '20px' }}>
            <h3>formatPercentage 百分比格式化示例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>正百分比（绿色）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10.5%</strong> = <span className="text-[#32D668]">{formatPercentage(10.5).text}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>25.75%</strong> = <span className="text-[#32D668]">{formatPercentage(25.75).text}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>0%</strong> = <span className="text-[#32D668]">{formatPercentage(0).text}</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>负百分比（红色）</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>-10.5%</strong> = <span className="text-[#FF3C4C]">{formatPercentage(-10.5).text}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>-5.25%</strong> = <span className="text-[#FF3C4C]">{formatPercentage(-5.25).text}</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>字符串输入</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>'15.5'</strong> = <span className="text-[#32D668]">{formatPercentage('15.5').text}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>'-8.25'</strong> = <span className="text-[#FF3C4C]">{formatPercentage('-8.25').text}</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>精度测试</h4>
                <div style={{ marginBottom: '10px' }}>
                    <strong>10.123%</strong> = <span className="text-[#32D668]">{formatPercentage(10.123).text}</span>{' '}
                    <span style={{ color: '#666', marginLeft: '10px' }}>(保留2位小数)</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>-5.999%</strong> = <span className="text-[#FF3C4C]">{formatPercentage(-5.999).text}</span>
                </div>
            </div>

            <div>
                <h4>空值处理</h4>
                <div style={{ marginBottom: '10px' }}>
                    null = <span>{formatPercentage(null).text}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    undefined = <span>{formatPercentage(undefined).text}</span>
                </div>
                <div>
                    空字符串 = <span>{formatPercentage('').text}</span>
                </div>
            </div>
        </div>
    )
}

export default FormatPercentageDemo
