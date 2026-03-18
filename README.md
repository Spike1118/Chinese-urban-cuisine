# 中国城市美食导航

一个基于 Vue 3 + Tailwind CSS 4 构建的中国美食导航网站，展示中国八大城市的地道美食。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS 3** - 实用优先的 CSS 框架
- **PostCSS** - CSS 后处理工具

## 功能特性

- ✨ **城市筛选** - 按城市快速筛选美食
- 🔍 **智能搜索** - 支持搜索美食名称、描述和标签
- 📊 **多维度排序** - 按城市、名称、标签数量排序
- 🎨 **精美 UI** - 响应式设计，适配各种设备
- 🖼️ **模态框展示** - 点击查看美食详细信息
- ⚡ **性能优化** - Vue 3 Composition API，代码更简洁高效
- ♿ **无障碍支持** - 语义化 HTML，键盘导航支持

## 项目结构

```
food-guide/
├── src/
│   ├── assets/
│   │   └── main.css          # 全局样式
│   ├── components/
│   │   ├── FoodCard.vue      # 美食卡片组件
│   │   └── FoodModal.vue     # 美食详情模态框
│   ├── data.js               # 美食数据
│   ├── App.vue               # 主应用组件
│   └── main.js               # 应用入口
├── index.html                # HTML 模板
├── package.json              # 项目依赖
├── vite.config.js            # Vite 配置
├── tailwind.config.js        # Tailwind 配置
└── postcss.config.js         # PostCSS 配置
```

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

## 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

## 预览生产构建

```bash
npm run preview
```

## 数据说明

美食数据存储在 `src/data.js` 文件中，包含：

- **美食信息**：名称、城市、emoji、颜色、描述、标签、详细介绍、推荐店铺
- **城市映射**：城市 ID 到城市名称的映射
- **城市列表**：用于导航的城市列表

## 自定义

### 添加新美食

编辑 `src/data.js` 文件，在 `foodData` 数组中添加新的美食对象：

```javascript
{
  id: 'unique-id',
  name: '美食名称',
  city: '城市ID',
  emoji: '🥘',
  color: '#ff0000',
  description: '简短描述',
  tags: ['标签1', '标签2'],
  detail: '详细介绍',
  shops: ['店铺1', '店铺2']
}
```

### 修改配色方案

编辑 `tailwind.config.js` 文件中的 `colors` 配置：

```javascript
colors: {
  primary: {
    500: '#f97316', // 主色调
    // ...
  },
  // ...
}
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT
