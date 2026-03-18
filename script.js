// 中国城市美食导航 - 完整功能实现
(function() {
    'use strict';

    // 导入公共数据
    const foodData = window.foodData;
    const cityMap = window.cityMap;
    const cities = window.cities;

    // 导入工具函数
    const searchFood = window.searchFood;
    const sortFood = window.sortFood;
    const filterByCity = window.filterByCity;
    const adjustColor = window.adjustColor;
    const getUrlParam = window.getUrlParam;
    const setUrlParams = window.setUrlParams;
    const throttle = window.throttle;
    const showNotification = window.showNotification;
    const deepClone = window.deepClone;
    const isInViewport = window.isInViewport;

    // DOM 元素
    const foodGrid = document.getElementById('foodGrid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const foodModal = document.getElementById('foodModal');

    // 当前筛选状态
    let currentFilter = 'all';
    let currentSort = 'default';
    let lazyLoadObserver = null;

    // 初始化
    function init() {
        // 初始化懒加载观察器
        initLazyLoad();

        // 渲染美食卡片
        renderFoodCards(foodData);

        // 绑定事件
        bindEvents();

        // 页面加载时触发动画
        staggerAnimation();
    }

    // 初始化懒加载观察器
    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('loaded');
                        lazyLoadObserver.unobserve(element);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
        }
    }

    // 观察元素进行懒加载
    function observeElement(element) {
        if (lazyLoadObserver && isInViewport(element)) {
            element.classList.add('loaded');
        } else if (lazyLoadObserver) {
            lazyLoadObserver.observe(element);
        }
    }

    // 阶梯动画效果
    function staggerAnimation() {
        const cards = foodGrid.querySelectorAll('.food-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s forwards`;
        });
    }

    // 渲染美食卡片
    function renderFoodCards(data) {
        if (data.length === 0) {
            foodGrid.innerHTML = `
                <div class="empty-state">
                    <div class="emoji">🔍</div>
                    <h3>未找到匹配的美食</h3>
                    <p>请尝试其他搜索关键词</p>
                </div>
            `;
            return;
        }

        foodGrid.innerHTML = data.map(food => `
            <div class="food-card" data-food-id="${food.id}" data-city="${food.city}">
                <div class="food-image" style="background-color: ${food.color};">${food.emoji}</div>
                <div class="food-info">
                    <h3>${food.name}</h3>
                    <p class="city-tag">${cityMap[food.city]}</p>
                    <p class="description">${food.description}</p>
                    <div class="tags">
                        ${food.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // 使用事件委托优化性能
        bindCardEvents();

        // 观察图片元素进行懒加载
        const foodImages = foodGrid.querySelectorAll('.food-image');
        foodImages.forEach(img => observeElement(img));
    }

    // 使用事件委托绑定卡片点击事件
    function bindCardEvents() {
        // 移除旧的事件监听器
        foodGrid.removeEventListener('click', handleCardClick);

        // 添加新的事件监听器
        foodGrid.addEventListener('click', handleCardClick);
    }

    // 处理卡片点击事件
    function handleCardClick(event) {
        const card = event.target.closest('.food-card');
        if (card) {
            const foodId = card.dataset.foodId;
            openModal(foodId);
        }
    }

    // 搜索美食（使用节流优化性能）
    const throttledSearch = throttle(function(query) {
        const filtered = searchFood(foodData, query);
        renderFoodCards(filtered);
    }, 300);

    searchInput.addEventListener('input', (e) => {
        throttledSearch(e.target.value);
    });

    // 排序美食
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        const sorted = sortFood(foodData, currentSort);
        renderFoodCards(sorted);
    });

    // 打开模态框
    function openModal(foodId) {
        const food = foodData.find(f => f.id === foodId);
        if (!food) return;

        const modalImage = document.getElementById('modalImage');
        modalImage.textContent = food.emoji;
        modalImage.style.background = `linear-gradient(135deg, ${food.color}, ${adjustColor(food.color, -30)})`;

        document.getElementById('modalTitle').textContent = food.name;
        document.getElementById('modalDescription').textContent = food.description;
        document.getElementById('modalCity').textContent = cityMap[food.city];
        document.getElementById('modalTags').innerHTML = food.tags.map(tag =>
            `<span class="tag" role="listitem">${tag}</span>`
        ).join('');
        document.getElementById('modalDetail').textContent = food.detail;
        document.getElementById('modalShops').innerHTML = food.shops.map(shop =>
            `<li role="listitem">${shop}</li>`
        ).join('');

        foodModal.classList.add('active');
        foodModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // 锁定滚动
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // 聚焦到关闭按钮
        setTimeout(() => {
            const closeBtn = foodModal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 100);
    }

    // 关闭模态框
    function closeModal() {
        foodModal.classList.remove('active');
        foodModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';

        // 返回焦点到搜索框
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }

    // 绑定事件
    function bindEvents() {
        // 搜索输入 - 使用节流优化
        const throttledSearch = throttle(function(query) {
            const filtered = searchFood(foodData, query);
            renderFoodCards(filtered);
        }, 300);

        searchInput.addEventListener('input', (e) => {
            throttledSearch(e.target.value);
        });

        // 排序选择
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            const sorted = sortFood(foodData, currentSort);
            renderFoodCards(sorted);
        });

        // 模态框关闭按钮
        document.querySelector('.modal-close').addEventListener('click', closeModal);

        // 点击遮罩层关闭
        foodModal.addEventListener('click', (e) => {
            if (e.target === foodModal || e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && foodModal.classList.contains('active')) {
                closeModal();
            }
        });

        // 城市导航筛选
        const cityNav = document.querySelector('.city-nav');
        const navBtns = document.querySelectorAll('.nav-btn');

        cityNav.addEventListener('click', function(e) {
            const btn = e.target.closest('.nav-btn');
            if (btn) {
                // 更新激活状态
                navBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // 获取城市并筛选
                const city = btn.dataset.city;
                currentFilter = city;
                const filtered = filterByCity(foodData, city);
                renderFoodCards(filtered);

                // 同步到 URL
                syncToURL(city);

                // 触发动画
                triggerAnimation();
            }
        });

        // 键盘导航支持
        cityNav.addEventListener('keydown', function(e) {
            const currentBtn = document.activeElement;
            if (!currentBtn.classList.contains('nav-btn')) return;

            const btns = Array.from(navBtns);
            const currentIndex = btns.indexOf(currentBtn);

            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + btns.length) % btns.length;
                    btns[prevIndex].focus();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % btns.length;
                    btns[nextIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    btns[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    btns[btns.length - 1].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    currentBtn.click();
                    break;
            }
        });

        // 从 URL 恢复筛选状态
        restoreFilterFromURL();
    }

    // 同步到 URL
    function syncToURL(city) {
        setUrlParams({ city });
    }

    // 从 URL 恢复筛选状态
    function restoreFilterFromURL() {
        const city = getUrlParam('city');

        if (city) {
            const targetBtn = document.querySelector(`.nav-btn[data-city="${city}"]`);
            if (targetBtn) {
                setTimeout(() => targetBtn.click(), 0);
                return;
            }
        }

        // 默认选中"全部"
        const allBtn = document.querySelector('.nav-btn[data-city="all"]');
        if (allBtn) {
            allBtn.classList.add('active');
            allBtn.setAttribute('aria-selected', 'true');
        }
    }

    // 触发动画
    function triggerAnimation() {
        const cards = foodGrid.querySelectorAll('.food-card:not(.hidden)');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.3s ease ${index * 0.05}s forwards`;
        });

        setTimeout(() => {
            cards.forEach(card => {
                card.style.opacity = '';
                card.style.animation = '';
            });
        }, cards.length * 50 + 300);
    }

    // 执行初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
