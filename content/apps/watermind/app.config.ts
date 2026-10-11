import type { AppConfig } from "../app-types";

const APP_STORE = "https://apps.apple.com/cn/app/id6779088281";

/** WaterMind — 认真喝水 */
export const watermind: AppConfig = {
  slug: "watermind",
  platform: "iOS / iPadOS",
  name: "认真喝水",
  tagline: "健康喝水记录追踪 App",
  logo: "/apps/watermind/icon.png",
  external: { download: APP_STORE },
  landing: {
    headline: "认真喝水",
    subhead: "健康喝水记录追踪 App",
    intro: [
      "认真喝水是一款适用于 iPhone 和 iPad 的喝水记录与提醒工具。水、茶、咖啡，都可以随手记下，让每天的饮水情况清楚一点。",
      "按自己的节奏设置提醒，在小组件里看进度，用统计回顾一段时间的变化。简单记录，慢慢养成习惯。",
    ],
    downloadCta: { label: "下载 App" },
    screenshot: "/apps/watermind/hero.png",
    featuresTitle: "功能介绍",
    features: [
      { title: "轻松记录", desc: "水、茶、咖啡等随心记录" },
      { title: "智能目标", desc: "结合天气和活动量，规划饮水目标" },
      { title: "温和提醒", desc: "按你的习惯提醒，不打扰" },
      { title: "小组件支持", desc: "不用打开 App，也能看饮水进度" },
      { title: "趋势分析", desc: "按周、月、年查看统计变化，了解饮水状况" },
      { title: "喝水挑战", desc: "丰富有趣的挑战任务，培养喝水习惯" },
      { title: "数据导出", desc: "记录可导入，导出，数据有保障" },
      { title: "多端同步", desc: " iPhone / iPad  同步使用" },
      { title: "本地存储", desc: "记录保存在本地，隐私更安心" },
      { title: "轻量小巧", desc: "原生开发，安装包约 4MB，启动快，占用少" },
    ],
    pricingTitle: "使用与价格",
    pricingSubtitle: "日常记录，永久免费。",
    plans: [
      {
        name: "免费版",
        price: "永久免费",
        items: ["不限制记录次数", "无限制创建饮品类型", "日常记录功能免费使用"],
      },
      {
        name: "Pro",
        price: "暂未开放",
        items: ["解锁全部挑战任务", "解锁多种水杯主题", "一次买断，永久使用"],
      },
    ],
  },
};
