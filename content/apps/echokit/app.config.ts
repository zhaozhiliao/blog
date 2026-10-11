import type { AppConfig } from "../app-types";

/** EchoKit */
export const echokit: AppConfig = {
  slug: "echokit",
  platform: "iOS SDK",
  name: "EchoKit",
  tagline: "面向开发者的轻量级反馈 SDK",
  logo: "/apps/echokit/icon.png",
  landing: {
    headline: "EchoKit·回音",
    subhead: "让反馈留在 App 里，让沟通继续。",
    intro: [
      "EchoKit·回音是面向 iOS 开发者的轻量级反馈 SDK。用户可以直接在 App 内提交问题、建议和想法，不必切换到其他工具。",
      "从反馈回执、进度跟踪到开发者回复，把一条反馈的后续沟通放在一起。也支持通过 Webhook 接入已有的工作流。",
    ],
    downloadCta: { label: "暂不提供" },
    screenshot: ["/apps/echokit/hero1.png", "/apps/echokit/hero2.png"],
    features: [
      {

        title: "App 内反馈",
        desc: "用户无需离开 App，即可提交问题、建议和想法",
      },
      {

        title: "匿名追踪",
        desc: "无需登录，也能查看本机提交过的反馈进展",
      },
      {

        title: "反馈回执",
        desc: "每条反馈生成唯一 ID，方便后续查询和跟进",
      },
      {

        title: "状态跟进",
        desc: "支持已收到、已查看、处理中、已回复等反馈状态",
      },
      {

        title: "开发者回复",
        desc: "开发者可直接回复反馈，让用户知道处理结果",
      },
      {

        title: "自动上下文",
        desc: "自动附带 App 版本、系统版本、设备型号和页面场景",
      },
      {

        title: "多渠道分发",
        desc: "反馈可同步到飞书、Slack、GitHub、邮箱或 Webhook",
      },
      {

        title: "开放集成",
        desc: "通过 Webhook 接入任意工作流或自有系统",
      },
      {

        title: "轻量接入",
        desc: "面向 iOS 开发者设计，几行代码即可集成反馈能力",
      },
      {

        title: "隐私可控",
        desc: "反馈字段、截图、联系方式和设备信息均可按需配置",
      },
    ],
  },
};
