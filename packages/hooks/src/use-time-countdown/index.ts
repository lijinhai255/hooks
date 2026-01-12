import { useState, useEffect } from 'react';

/**
 * 时间倒计时 Hook - 检查当前时间到目标时间的倒计时
 * @param targetTime 目标时间（支持时间戳、Date 对象或日期字符串）
 * @returns 是否到了时间、剩余时间格式化字符串、时分秒
 */
export const useTimeCountdown = (
    targetTime: number | Date | string
): {
    isTimeReached: boolean;
    formattedRemaining: string;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} => {
    const [now, setNow] = useState(Date.now());

    // 每秒更新
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // 转换时间为毫秒
    const convertToMs = (time: number | Date | string): number => {
        if (typeof time === "number") {
            // 如果小于 10^12，认为是秒级时间戳
            return time < 1000000000000 ? time * 1000 : time;
        }
        return new Date(time).getTime();
    };

    const targetMs = convertToMs(targetTime);
    const timeRemaining = Math.max(0, targetMs - now);
    const isTimeReached = timeRemaining === 0;

    // 计算时分秒
    const totalSeconds = Math.floor(timeRemaining / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // 格式化时间
    const formattedRemaining = hours > 0
        ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return {
        isTimeReached,
        formattedRemaining,
        days,
        hours,
        minutes,
        seconds
    };
};
