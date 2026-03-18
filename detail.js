// 美食详情页面 - 从 URL 获取美食数据并渲染
(function() {
    'use strict';

    // 导入公共数据
    const foodData = window.foodData;
    const cityMap = window.cityMap;
    const adjustColor = window.adjustColor;
    const getUrlParam = window.getUrlParam;

    // DOM 元素
    const foodName = document.getElementById('foodName');
    const foodCity = document.getElementById('foodCity');
    const foodImage = document.getElementById('foodImage');
    const foodDescription = document.getElementById('foodDescription');
    const foodDetail = document.getElementById('foodDetail');
    const foodTags = document.getElementById('foodTags');
    const foodShops = document.getElementById('foodShops');
    const currentYear = document.getElementById('currentYear');

    // 从 URL 获取美食 ID
    function getFoodIdFromURL() {
        return getUrlParam('id');
    }

    // 渲染美食详情
    function renderFoodDetail(foodId) {
        const food = foodData.find(f => f.id === foodId);
        if (!food) {
            showNotFound();
            return;
        }

        // 更新内容
        foodName.textContent = food.name;
        foodCity.textContent = cityMap[food.city];

        // 更新面包屑导航
        const breadcrumbCity = document.getElementById('breadcrumbCity');
        breadcrumbCity.textContent = cityMap[food.city];

        foodImage.textContent = food.emoji;
        foodImage.style.background = `linear-gradient(135deg, ${food.color}, ${adjustColor(food.color, -30)})`;
        foodDescription.textContent = food.description;
        foodDetail.textContent = food.detail;

        // 渲染标签
        foodTags.innerHTML = food.tags.map(tag =>
            `<span class="tag" role="listitem">${tag}</span>`
        ).join('');

        // 渲染店铺
        foodShops.innerHTML = food.shops.map(shop => `
            <div class="shop-card" role="listitem">
                <div class="shop-icon">🏪</div>
                <div class="shop-name">${shop}</div>
            </div>
        `).join('');

        // 更新年份
        currentYear.textContent = new Date().getFullYear();

        // 添加页面过渡动画
        addPageTransition();

        // 聚焦到主要内容
        setTimeout(() => {
            const firstElement = document.querySelector('.detail-section');
            if (firstElement) {
                firstElement.focus();
            }
        }, 100);
    }

    // 显示未找到页面
    function showNotFound() {
        foodName.textContent = '美食未找到';
        foodCity.textContent = '';
        foodImage.textContent = '🍽️';
        foodImage.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        foodDescription.textContent = '抱歉，找不到您要查看的美食信息';
        foodDetail.textContent = '请返回首页，选择其他美食进行查看';
        foodTags.innerHTML = '';
        foodShops.innerHTML = '<p class="loading">暂无推荐店铺</p>';
    }

    // 添加页面过渡动画
    function addPageTransition() {
        const elements = document.querySelectorAll('.detail-section');

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50);
        });
    }

    // 初始化
    function init() {
        const foodId = getFoodIdFromURL();
        if (foodId) {
            renderFoodDetail(foodId);
        } else {
            showNotFound();
        }
    }

    // 执行初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
