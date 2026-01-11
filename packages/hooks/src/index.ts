// import path from 'node:path'

// import { multiply } from './math'
// import { sub } from './math'
// import { div } from './math'
// import { add } from './math'
// import { VERSION } from '@miaoma-rhooks/core'

export const NAME = 'hooks'

export interface User {
    name: string
    age: number
}

export const heer = 'heyi'

// 第一个 hook 示例
// export const useVersion = () => {
//     return VERSION
// }

export const useName = () => {
    return heer
}

export const useInfo = () => {
    return {
        name: heer,
        age: 18
    }
}

// console.log(VERSION)

// const a = 1

// console.log('hooks') // 不想让代码打印 console.log

// 构建时，采用 drop 的方式，将 console.log 移除

export { useBoolean } from './use-boolean/use-boolean'
export { useToggle } from './use-toggle/use-toggle'
