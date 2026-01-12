import { useCallback, useRef, useState } from "react";

/**
 * 防抖点击 Hook - 防止按钮在短时间内被多次点击
 * @param callback 点击时执行的回调函数
 * @param delay 节流延迟时间（毫秒），默认 500ms
 * @returns [throttledCallback, isLoading] - 节流后的回调函数和加载状态
 */
export const useThrottleClick = <T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number = 500
) => {
    const lastExecutedRef = useRef<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const throttledCallback = useCallback(
        (...args: T) => {
            const now = Date.now();
            const timeSinceLastExecution = now - lastExecutedRef.current;

            // 如果正在加载或未达到节流时间，直接返回
            if (isLoading || timeSinceLastExecution < delay) {
                return;
            }

            setIsLoading(true);
            lastExecutedRef.current = now;

            callback(...args);

            // 延迟后重置加载状态
            setTimeout(() => {
                setIsLoading(false);
            }, delay);
        },
        [callback, delay]
    );

    return [throttledCallback, isLoading] as const;
};
