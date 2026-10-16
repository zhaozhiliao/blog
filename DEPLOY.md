# Blog 部署说明

仓库：[zhaozhiliao/blog](https://github.com/zhaozhiliao/blog)。
一个 Next.js 项目、一个主站，应用使用 `/apps/<slug>` 子路径。

## 构建与运行

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run start
```

开发使用 `npm run dev`，默认端口 3001。Node.js 20.9+。
`.source/` 由 Fumadocs 生成，不提交。生产安装需保留构建所需的开发依赖。

## 环境变量

```bash
NEXT_PUBLIC_SITE_URL=https://wikipie.com
```

这个地址统一用于 canonical、Open Graph、JSON-LD、robots 和 sitemap。
本地预览可不设置，SEO 链接仍指向正式主站。变量修改后需重新构建。
旧的 `NEXT_PUBLIC_ROOT_DOMAIN` 仍可读取，第一个域名作为默认主域名，其余域名用于识别旧应用域名。
已移除所有关键词/AI 接口，不再使用 AHREFS 或 AI Provider Key。

## GA4 网站统计

全站公共布局接入 Google tag，资源为 `Ethan · wikipie.com`，网站数据流为
`Ethan Web`（`https://wikipie.com`），衡量 ID 为 `G-32VWT7YKZG`。
衡量 ID 是公开配置，代码已内置，无需填写 Google 登录凭据或 API 密钥。

- 仅生产构建且当前访问 origin 等于 `NEXT_PUBLIC_SITE_URL`（默认 `https://wikipie.com`）时加载统计。
  本地开发、localhost 生产预览和其他预览域名不会发送数据。
- 页面交互就绪后异步加载，不阻塞首屏。所有博客、项目、文档和更新日志共用一次初始化。
- 数据流的增强型衡量已开启网页加载和浏览器历史记录变化的网页浏览事件。
  由 Google tag 自动记录首屏和站内路由切换，代码不额外发送 `page_view`，避免重复计数。
- 如需更换数据流，设置 `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` 后重新构建；
  设置为空字符串可停用统计。

部署后在 GA4 实时报告中访问首页、博客和应用页面，确认页面路径与浏览事件；
首次配置状态可能延迟更新。创建数据流和本地构建通过不代表生产站已经收到数据。

参考：[Google 单页应用统计说明](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)。

## 路径

```text
/                           首页
/blog                       博客
/blog/<slug>                文章
/apps                       项目
/apps/watermind             WaterMind 介绍
/apps/watermind/docs        WaterMind 文档
/apps/watermind/changelog   WaterMind 更新日志
/apps/echokit               EchoKit 介绍
```

每个应用都复用相同模板和设计。新增应用无需单独部署或新增 DNS。

## 旧地址迁移

保留已有应用子域名的 DNS、证书与部署绑定，让旧链接继续抵达本项目。
`proxy.ts` 对已注册应用返回 **308 永久跳转**，保留路径和查询参数：

```text
watermind.wikipie.com/                 → wikipie.com/apps/watermind
watermind.wikipie.com/docs/privacy     → wikipie.com/apps/watermind/docs/privacy
watermind.wikipie.com/changelog        → wikipie.com/apps/watermind/changelog
```

旧图片路径保持根路径，避免把 `/apps/watermind/icon.png` 再次加前缀。
旧主站 `/tools`、`/ai-lab`、`/docs` 返回 404，从导航与 sitemap 中移除。
应用隐私政策、条款、支持文档保留在各应用目录。

上线时核对托管平台的 Git 仓库关联是否仍指向更名后的 `blog`，然后发布构建。
本地代码改动不会自动完成域名绑定、DNS 迁移或生产发布。

## 验证

运行站点后执行：

```bash
npm run verify:site
# 非默认端口
SITE_TEST_ORIGIN=http://localhost:3101 npm run verify:site
```

脚本检查所有 sitemap 页面、站内链接、canonical、已删除路由、Markdown 导出和旧域名跳转。
