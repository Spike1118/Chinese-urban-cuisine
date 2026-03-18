# CLAUDE.md 文件使用说明

## 什么是 CLAUDE.md？

**CLAUDE.md** 是 Claude Code 的项目记忆和指令文件，用于告诉 Claude 关于项目的背景信息、编码规范、工作流程等。Claude 会在会话开始时自动读取这些文件。

---

## 文件位置与作用范围

| 类型 | 位置 | 作用范围 |
|------|------|----------|
| 项目级 | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 当前项目 |
| 用户级 | `~/.claude/CLAUDE.md` | 所有项目 |
| 本地级 | `./.claude/CLAUDE.local.md` | 当前项目（不提交到 Git） |

---

## 可以写什么内容

### 1. 项目说明
- 技术栈（框架、语言、版本）
- 项目架构
- 目录结构说明

### 2. 编码规范
- 代码风格约定
- 命名规范
- 文件组织规则

### 3. 常用命令
- 构建、运行、测试命令
- 开发环境启动方式

### 4. 工作流程
- 开发流程
- 发布流程
- Code Review 要求

### 5. 注意事项
- 特殊配置说明
- 已知问题
- 环境变量说明

---

## 示例

### 示例 1：前端项目

```markdown
# 项目说明

## 技术栈
- React 18 + TypeScript
- Vite 作为构建工具
- TailwindCSS 用于样式
- Zustand 状态管理

## 代码规范
- 使用函数组件 + Hooks，不用 class 组件
- 组件文件名使用 PascalCase
- 工具函数使用 camelCase
- 所有 types 放在 `src/types/` 目录

## 常用命令
pnpm dev      # 启动开发服务器
pnpm build    # 构建生产版本
pnpm lint     # 运行 ESLint
pnpm test     # 运行测试

## 注意事项
- API 基础地址：.env 中的 VITE_API_URL
- 不要修改 vite.config.ts 中的代理配置
```

---

### 示例 2：后端 API 项目

```markdown
# 后端服务说明

## 架构
- Node.js + Express
- PostgreSQL 数据库
- Redis 缓存
- JWT 认证

## 目录结构
src/
  controllers/   # 请求处理
  services/      # 业务逻辑
  models/        # 数据模型
  middleware/    # 中间件
  utils/         # 工具函数

## 开发规范
- 所有 API 响应统一格式：{ success, data, error }
- 错误处理使用 try-catch，统一返回 500
- 数据库操作必须使用事务
- 敏感操作需要记录日志

## 测试
pnpm test          # 运行单元测试
pnpm test:e2e      # 端到端测试
```

---

### 示例 3：Python 数据科学项目

```markdown
# 数据分析项目

## 环境
- Python 3.11
- 虚拟环境：.venv/
- 依赖管理：poetry

## 激活环境
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows

## 数据处理流程
1. 原始数据 → data/raw/
2. 清洗后数据 → data/processed/
3. 输出结果 → output/

## Jupyter 注意
- Notebook 只放在 notebooks/ 目录
- 实验性代码先在 Notebook 测试，再重构到 .py 文件

## 常用命令
poetry install    # 安装依赖
poetry run jupyter notebook
python src/train.py
```

---

## 最佳实践

1. **保持简洁** - 只写必要的信息，避免冗长
2. **及时更新** - 项目变更时同步更新 CLAUDE.md
3. **团队共享** - 将 CLAUDE.md 提交到 Git，让团队成员共享上下文
4. **使用本地文件** - 个人偏好设置放在 `CLAUDE.local.md`，不提交到 Git

---

## 提示

- CLAUDE.md 的内容会在每次会话开始时自动加载
- 可以指示 Claude「请始终用中文回复」「优先使用异步函数」等偏好
- 可以定义项目特定的术语和缩写含义

