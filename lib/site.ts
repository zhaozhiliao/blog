/** One canonical origin for metadata, structured data, and legacy redirects. */
const configured = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.NEXT_PUBLIC_ROOT_DOMAIN ? `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN.split(",")[0].trim()}` : "https://wikipie.com");
export const SITE_ORIGIN = new URL(configured).origin;
export const SITE_NAME = "Ethan";
export const CONTACT_EMAIL = "zhaodong199208@gmail.com";

export const SITE_AVATAR = "/images/ethan.png";

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/zhaozhiliao" },
  { label: "X", href: "https://x.com/lovern1314" },
  { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/59a3e8995e87e70894d7a6fc" },
] as const;
