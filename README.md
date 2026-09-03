# FlowStrength Portfolio Site

FlowStrength AI 力量训练 App 产品案例展示站。包含需求分析、产品设计、AI 方案架构、评测迭代体系与 Google Play 上线成果。

## 技术栈

- **前端**：React 19 + Vite 6
- **样式**：Vanilla CSS（深浅主题设计系统）
- **CI/CD**：GitHub Actions + GitHub Pages 自动化流水线
- **发布规范**：兼备 Sites 规范与独立静态站点交付

## 本地开发与测试

\\\ash
# 安装依赖
npm install

# 启动本地开发服务
npm run dev

# 生产环境构建
npm run build

# 执行发布与 Worker 规范测试
npm run test:sites
\\\

## 自动部署到 GitHub Pages

项目已内置 \.github/workflows/deploy.yml\。当推送到 \main\ 或 \master\ 分支时，GitHub Actions 会自动执行构建并将 \dist/client\ 部署到 GitHub Pages。

> 注意：请在 GitHub 仓库中进入 **Settings** → **Pages**，确保 **Build and deployment > Source** 设置为 **GitHub Actions**。
