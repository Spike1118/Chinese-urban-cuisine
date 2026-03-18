# 迁移说明

## 从原生 JS 迁移到 Vue 3

### 主要变化

#### 1. **组件化架构**
- **原项目**：所有逻辑在 `script.js` 中，使用 DOM 操作
- **新项目**：使用 Vue 3 组件化开发，代码更清晰

#### 2. **状态管理**
- **原项目**：使用全局变量和 DOM 查询
- **新项目**：使用 Vue 的 `ref` 和 `computed` 管理响应式状态

#### 3. **模板语法**
- **原项目**：使用字符串模板拼接 HTML
- **新项目**：使用 Vue 的模板语法（`v-for`、`v-if`、`v-model` 等）

#### 4. **样式系统**
- **原项目**：使用原生 CSS + 自定义 CSS 变量
- **新项目**：使用 Tailwind CSS 实用类，更高效

#### 5. **构建工具**
- **原项目**：直接在浏览器中运行
- **新项目**：使用 Vite 进行快速开发和构建

### 文件对比

| 原项目文件 | 新项目文件 | 说明 |
|-----------|-----------|------|
| `index.html` | `index.html` | HTML 结构基本相同 |
| `script.js` | `src/App.vue` | 主逻辑迁移到 Vue 组件 |
| `styles.css` | `src/assets/main.css` | 全局样式迁移 |
| `data.js` | `src/data.js` | 数据保持不变 |
| - | `src/components/FoodCard.vue` | 新增：美食卡片组件 |
| - | `src/components/FoodModal.vue` | 新增：模态框组件 |
| - | `package.json` | 新增：项目依赖配置 |
| - | `vite.config.js` | 新增：Vite 配置 |
| - | `tailwind.config.js` | 新增：Tailwind 配置 |
| - | `postcss.config.js` | 新增：PostCSS 配置 |

### 保留的功能

✅ 城市筛选
✅ 搜索功能
✅ 排序功能
✅ 模态框详情展示
✅ URL 状态同步
✅ 键盘导航（ESC 关闭模态框）
✅ 响应式设计
✅ 无障碍支持

### 新增功能

✨ Vue 3 Composition API
✨ 更好的代码组织
✨ 更快的开发体验（Vite）
✨ 更小的生产包体积
✨ TypeScript 支持（可选）

### 性能提升

- **开发时**：Vite 提供毫秒级的热更新
- **生产时**：Vue 3 Tree-shaking，只打包使用到的代码
- **渲染时**：Vue 3 虚拟 DOM，更高效的更新机制

### 迁移步骤

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问网站**
   打开浏览器访问 http://localhost:3000

4. **构建生产版本**
   ```bash
   npm run build
   ```

### 注意事项

1. **数据文件**：`src/data.js` 保持不变，可以直接编辑添加美食
2. **样式修改**：使用 Tailwind CSS 类名，参考 Tailwind 文档
3. **组件修改**：修改组件时参考 Vue 3 文档
4. **构建产物**：生产构建产物在 `dist` 目录

### 常见问题

**Q: 如何修改配色？**
A: 编辑 `tailwind.config.js` 中的 `colors` 配置

**Q: 如何添加新美食？**
A: 编辑 `src/data.js` 文件中的 `foodData` 数组

**Q: 如何修改响应式断点？**
A: 编辑 `tailwind.config.js` 中的 `screens` 配置

**Q: 如何添加新页面？**
A: 在 `src` 目录下创建新的 Vue 组件，并在 `App.vue` 中引入

## 总结

新的 Vue 3 版本提供了更好的开发体验、更清晰的代码结构和更优的性能。所有原有功能都已保留，并且添加了现代化的开发工具链。
