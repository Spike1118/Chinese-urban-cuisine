/**
 * 工具函数库
 */

/**
 * 调整颜色亮度
 * @param {string} color - 十六进制颜色值
 * @param {number} amount - 调整值，正数变亮，负数变暗
 * @returns {string} 调整后的颜色
 */
export const adjustColor = (color, amount) => {
  if (!color) return '#f97316'
  const hex = color.replace('#', '')
  if (hex.length !== 6) return '#f97316'

  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount))
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount))
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * 防抖函数
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * 从 URL 参数解析城市 ID
 * @returns {string|null} 城市 ID
 */
export const getCityFromURL = () => {
  if (typeof window === 'undefined') return null
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('city')
}
