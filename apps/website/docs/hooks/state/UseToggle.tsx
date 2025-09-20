import { useToggle } from '@miaoma-rhooks/hooks'

function UseToggleDemo() {
    const [value, toggle] = useToggle('男', '女')

    return (
        <div>
            当前值为 {value}
            <button
                style={{
                    padding: '8px 16px',
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: '4px'
                }}
                onClick={toggle}
            >
                切换
            </button>
        </div>
    )
}

export default UseToggleDemo
