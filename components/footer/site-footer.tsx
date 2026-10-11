import Link from "next/link";
import { SITE_NAME, SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer reading-width">
      <div className="footer-main">
        <div className="footer-note">
          <p className="footer-note-title">慢慢记录，持续创造。</p>
          <p>关于产品的思考、开发中的发现，和那些值得留下来的小事。</p>
        </div>
        <div className="footer-groups">
          <nav aria-label="页脚站内导航" className="footer-link-group">
            <span className="footer-group-label">站内</span>
            <Link href="/blog">博客</Link>
            <Link href="/apps">项目</Link>
            <Link href="/friends">友链</Link>
          </nav>
          <nav aria-label="页脚社交媒体" className="footer-link-group">
            <span className="footer-group-label">社交</span>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="发送邮件联系 Ethan">邮件</a>
          </nav>
        </div>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} {SITE_NAME}</p>
    </footer>
  );
}
