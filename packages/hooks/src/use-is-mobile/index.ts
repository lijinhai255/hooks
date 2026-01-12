import { useState, useEffect } from 'react';

/**
 * 自定义 Hook - 检测设备是否为移动端
 * @returns {boolean} 是否为移动端设备
 */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    // 设备检测
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    return isMobile;
};

export default useIsMobile;
