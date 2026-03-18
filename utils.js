/**
 * 工具函数库
 * 包含颜色处理、URL操作、DOM操作等通用工具函数
 */

/**
 * 调整颜色亮度
 * @param {string} color - 十六进制颜色值（如 #ff0000）
 * @param {number} amount - 亮度调整量（正数变亮，负数变暗）
 * @returns {string} 调整后的十六进制颜色值
 * @throws {Error} 如果颜色格式不正确
 */
function adjustColor(color, amount) {
    try {
        if (!color || typeof color !== 'string') {
            throw new Error('Invalid color format');
        }

        const hex = color.replace('#', '');
        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
            throw new Error('Invalid hex color format');
        }

        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } catch (error) {
        console.error('Error adjusting color:', error);
        // 返回默认颜色
        return '#667eea';
    }
}

/**
 * 从URL获取参数
 * @param {string} param - 参数名
 * @returns {string|null} 参数值，不存在返回null
 */
function getUrlParam(param) {
    try {
        if (!param || typeof param !== 'string') {
            console.warn('Invalid parameter name');
            return null;
        }

        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    } catch (error) {
        console.error('Error getting URL parameter:', error);
        return null;
    }
}

/**
 * 设置URL参数
 * @param {Object} params - 参数对象
 * @param {boolean} replace - 是否替换历史记录（默认true）
 */
function setUrlParams(params, replace = true) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, params[key]);
        }
    });
    if (replace) {
        window.history.replaceState({}, '', url);
    } else {
        window.history.pushState({}, '', url);
    }
}

/**
 * 搜索美食
 * @param {Array} foodData - 美食数据数组
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的美食数组
 * @throws {Error} 如果数据格式不正确
 */
function searchFood(foodData, query) {
    try {
        if (!Array.isArray(foodData)) {
            throw new Error('Invalid food data format');
        }

        if (!query || query.trim() === '') {
            return foodData;
        }

        const lowerQuery = query.toLowerCase();
        return foodData.filter(food => {
            if (!food || typeof food !== 'object') {
                return false;
            }

            // 导入城市映射
            const cityMap = window.cityMap || {};
            const cityName = cityMap[food.city] || '';

            return food.name.toLowerCase().includes(lowerQuery) ||
                food.description.toLowerCase().includes(lowerQuery) ||
                food.city.toLowerCase().includes(lowerQuery) ||
                cityName.includes(lowerQuery) ||
                (food.tags && Array.isArray(food.tags) && food.tags.some(tag =>
                    tag.toLowerCase().includes(lowerQuery)
                ));
        });
    } catch (error) {
        console.error('Error searching food:', error);
        return [];
    }
}

/**
 * 排序美食
 * @param {Array} foodData - 美食数据数组
 * @param {string} criteria - 排序标准（city, name, tags）
 * @returns {Array} 排序后的美食数组
 */
function sortFood(foodData, criteria) {
    try {
        if (!Array.isArray(foodData)) {
            throw new Error('Invalid food data format');
        }

        const sorted = [...foodData];

        switch (criteria) {
            case 'city':
                sorted.sort((a, b) => {
                    if (!a.city || !b.city) return 0;
                    return a.city.localeCompare(b.city);
                });
                break;
            case 'name':
                sorted.sort((a, b) => {
                    if (!a.name || !b.name) return 0;
                    return a.name.localeCompare(b.name, 'zh-CN');
                });
                break;
            case 'tags':
                sorted.sort((a, b) => {
                    const aTags = a.tags ? a.tags.length : 0;
                    const bTags = b.tags ? b.tags.length : 0;
                    return bTags - aTags;
                });
                break;
            default:
                return sorted;
        }

        return sorted;
    } catch (error) {
        console.error('Error sorting food:', error);
        return [...foodData];
    }
}

/**
 * 筛选城市
 * @param {Array} foodData - 美食数据数组
 * @param {string} city - 城市ID
 * @returns {Array} 筛选后的美食数组
 */
function filterByCity(foodData, city) {
    try {
        if (!Array.isArray(foodData)) {
            throw new Error('Invalid food data format');
        }

        if (city === 'all') {
            return foodData;
        }
        return foodData.filter(food => {
            if (!food || !food.city) return false;
            return food.city === city;
        });
    } catch (error) {
        console.error('Error filtering by city:', error);
        return [];
    }
}

/**
 * 筛选标签
 * @param {Array} foodData - 美食数据数组
 * @param {string} tag - 标签
 * @returns {Array} 筛选后的美食数组
 */
function filterByTag(foodData, tag) {
    if (!tag) {
        return foodData;
    }
    return foodData.filter(food => food.tags.includes(tag));
}

/**
 * 生成随机ID
 * @returns {string} 随机ID
 */
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, wait) {
    let timeout;
    let lastCall = 0;

    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastCall);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastCall = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastCall = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;

    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 平滑滚动到元素
 * @param {Element} element - 目标元素
 * @param {number} offset - 偏移量（像素）
 */
function scrollToElement(element, offset = 0) {
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * 检查元素是否在视口中
 * @param {Element} element - 要检查的元素
 * @param {boolean} partially - 是否部分可见
 * @returns {boolean} 是否在视口中
 */
function isInViewport(element, partially = true) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    if (partially) {
        return (
            rect.top < windowHeight &&
            rect.bottom >= 0 &&
            rect.left < windowWidth &&
            rect.right >= 0
        );
    } else {
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight &&
            rect.right <= windowWidth
        );
    }
}

/**
 * 添加加载状态
 * @param {string} selector - 加载容器选择器
 * @param {boolean} loading - 是否加载中
 */
function setLoading(selector, loading) {
    const element = document.querySelector(selector);
    if (!element) return;

    if (loading) {
        element.classList.add('loading');
        element.classList.remove('loaded');
    } else {
        element.classList.remove('loading');
        element.classList.add('loaded');
    }
}

/**
 * 显示通知
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型（info, success, error, warning）
 * @param {number} duration - 显示时长（毫秒）
 */
function showNotification(message, type = 'info', duration = 3000) {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // 添加样式
    const styles = {
        info: 'background: #667eea; color: white;',
        success: 'background: #48bb78; color: white;',
        error: 'background: #f56565; color: white;',
        warning: 'background: #ed8936; color: white;'
    };

    Object.assign(notification.style, styles[type]);

    // 添加到页面
    document.body.appendChild(notification);

    // 自动移除
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';

        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * 深度克隆对象
 * @param {Object} obj - 要克隆的对象
 * @returns {Object} 克隆后的对象
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }

    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * 检查是否为空值
 * @param {*} value - 要检查的值
 * @returns {boolean} 是否为空值
 */
function isEmpty(value) {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'string') {
        return value.trim() === '';
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} 扩展名
 */
function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

/**
 * 下载文件
 * @param {string} content - 文件内容
 * @param {string} filename - 文件名
 * @param {string} mimeType - MIME类型
 */
function downloadFile(content, filename, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 将工具函数暴露到全局作用域
(function() {
    'use strict';

    // 检查是否运行在浏览器环境
    if (typeof window !== 'undefined') {
        // 将所有函数暴露到全局作用域
        window.adjustColor = adjustColor;
        window.getUrlParam = getUrlParam;
        window.setUrlParams = setUrlParams;
        window.searchFood = searchFood;
        window.sortFood = sortFood;
        window.filterByCity = filterByCity;
        window.filterByTag = filterByTag;
        window.generateId = generateId;
        window.throttle = throttle;
        window.debounce = debounce;
        window.scrollToElement = scrollToElement;
        window.isInViewport = isInViewport;
        window.setLoading = setLoading;
        window.showNotification = showNotification;
        window.formatDate = formatDate;
        window.deepClone = deepClone;
        window.isEmpty = isEmpty;
        window.getFileExtension = getFileExtension;
        window.downloadFile = downloadFile;
    }
})();
