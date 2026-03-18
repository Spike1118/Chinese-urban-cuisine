# 部署指南

## 构建成功！

生产版本已成功构建到 `dist` 目录。

## 部署选项

### 选项 1: GitHub Pages（免费）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/food-guide.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages
   - Source 选择 `main` 分支
   - 保存

3. **等待部署**
   - 几分钟后访问 `https://你的用户名.github.io/food-guide/`

### 选项 2: Vercel（推荐，免费且快速）

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署**
   ```bash
   cd dist
   vercel
   ```

3. **配置域名（可选）**
   - 登录 vercel.com
   - 导入项目
   - 添加自定义域名

### 选项 3: Netlify（免费）

1. **拖拽部署**
   - 访问 netlify.com
   - 将 `dist` 文件夹拖拽到页面

2. **自动部署**
   - 连接 GitHub 仓库
   - Netlify 会自动检测并部署

### 选项 4: 阿里云 OSS / 腾讯云 COS

1. **上传文件**
   ```bash
   # 安装阿里云 OSS 工具
   npm install -g ali-oss

   # 上传 dist 目录
   ali-oss config --id YOUR_ID --key YOUR_KEY --bucket YOUR_BUCKET --region oss-cn-hangzhou
   ali-oss cp -r dist/* oss://your-bucket/
   ```

2. **配置 CDN**
   - 在云控制台配置 CDN 加速
   - 绑定自定义域名

### 选项 5: Nginx 部署

1. **上传文件到服务器**
   ```bash
   scp -r dist/* user@your-server:/var/www/food-guide/
   ```

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name food-guide.com;
       root /var/www/food-guide;

       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## 环境变量（可选）

如果需要配置环境变量，创建 `.env.production` 文件：

```env
VITE_API_URL=https://api.example.com
```

## 验证部署

1. 访问部署的 URL
2. 检查所有功能是否正常
3. 测试移动端显示
4. 检查 SEO 元数据

## 性能优化

当前构建结果：
- HTML: 0.53 kB (gzip: 0.49 kB)
- CSS: 16.51 kB (gzip: 3.97 kB)
- JS: 81.59 kB (gzip: 34.59 kB)

总大小约 98.6 kB，已包含：
- Vue 3 运行时
- Tailwind CSS 样式
- 所有功能代码

## SEO 优化

已配置的 SEO 元数据：
- Title: 中国城市美食导航
- Description: 探索中国八大城市的地道美食
- Keywords: 中国美食，城市美食，北京烤鸭，成都火锅，广州早茶，上海小笼包，西安美食

## 监控和日志

部署后建议：
- 使用 Vercel Analytics（如果使用 Vercel）
- 使用 Google Analytics 追踪访问
- 监控错误日志

## 常见问题

**Q: 构建后页面空白？**
A: 检查 `index.html` 中的路径是否正确，确保资源路径指向 `assets` 目录

**Q: 如何更新部署？**
A: 重新运行 `npm run build`，然后推送到仓库，平台会自动重新部署

**Q: 如何自定义域名？**
A: 在对应的平台（Vercel/Netlify）设置中添加自定义域名，并配置 DNS 记录

## 下一步

1. 选择一个部署平台
2. 按照对应步骤部署
3. 验证功能
4. 分享链接
