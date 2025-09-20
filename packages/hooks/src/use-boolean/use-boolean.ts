// 这个 hook 就是实现 true、false 的切换
import { useState } from 'react'

export const useBoolean = (defaultValue = false): [boolean, () => void, (value: boolean) => void] => {
    const [value, setValue] = useState(defaultValue)

    const toggle = () => {
        setValue(!value)
    }

    return [value, toggle, setValue]
}
