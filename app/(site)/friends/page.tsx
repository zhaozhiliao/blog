import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "友链",
  description: "朋友们的小站，欢迎去逛逛。",
  path: "/friends",
});

export default function FriendsPage() {
  return (
    <div className="reading-width index-page">
      <header className="page-heading">
        <h1>友链</h1>
        <p>朋友们的小站，欢迎去逛逛。</p>
      </header>
      <ul className="project-list">
        <li>
          <a href="https://qiuqiu.pet/" target="_blank" rel="noopener noreferrer" className="project-link">
            <div>
              <h2 className="text-base font-medium">球球 <span aria-hidden="true">↗</span></h2>
              <p>陪你自在一点。一个 macOS 桌面伙伴。</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
