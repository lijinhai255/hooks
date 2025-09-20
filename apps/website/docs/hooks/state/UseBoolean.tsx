import { useBoolean } from '@miaoma-rhooks/hooks'

function UseBooleanDemo() {
    const [value, toggle, set] = useBoolean(false)

    return (
        <div>
            当前值为 {value ? 'True' : 'False'}
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
            <button onClick={() => set(true)}>设置为 True</button>
            <button onClick={() => set(false)}>设置为 False</button>
        </div>
    )
}

export default UseBooleanDemo
