import type { AppConfig } from "../app-types";
export const keywordVolumeLab: AppConfig = {
  slug: "keyword-volume-lab",
  platform: "本地 Web 工具",
  name: "Keyword Volume Lab",
  tagline: "Google 关键词历史搜索量测试工具",
  landing: {
    subhead: "了解关键词在不同市场的搜索需求。",
    intro: [
      "Keyword Volume Lab 是 Ethan 开发的本地关键词搜索量工具。通过 Google 账号授权后，按国家和语言查询关键词的平均月搜索量、月度变化及广告竞争度。数据来自 Google Ads API。",
      "工具目前处于本地接入测试阶段，尚未开放公共查询服务。真实指标查询须完成 OAuth 授权、广告账号访问配置，以及 Google Ads API 所需权限审批。",
      "工具仅实现读取可访问的广告账号和查询历史关键词指标，不创建或投放广告，不修改广告系列或预算。历史指标为估算值，广告竞争度不等于 SEO 难度。",
    ],
    downloadCta: { label: "隐私政策与数据使用说明", href: "https://wikipie.com/apps/keyword-volume-lab/docs/privacy" },
    features: [
      { title: "按市场查询", desc: "选择目标国家与语言，批量输入关键词，查询 Google 搜索历史指标。" },
      { title: "查看月度变化", desc: "查看平均月搜索量与具体月份的数据，识别近似变体合并情况。" },
      { title: "本地运行", desc: "客户端配置和授权令牌保留在本地服务内存，用户可自行导出查询结果。" },
    ],
  },
};
