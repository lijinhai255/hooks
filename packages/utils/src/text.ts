/**
 * 截断文本，如果超过指定长度则使用省略号
 * @param text - 原始文本
 * @param maxLength - 最大长度，默认为8
 * @returns 截断后的文本
 */
export const truncateText = (text: string, maxLength: number = 8): string => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * 缩短地址显示，显示前4个字符和后4个字符
 * @param address - 地址字符串
 * @returns 缩短后的地址，格式为 "前4位...后4位"
 */
export const shortenAddress = (address: string): string => {
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
};
