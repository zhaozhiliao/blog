export function DownloadLink({ href, label = "下载 App" }: { href: string; label?: string }) {
  const isAppStore = new URL(href).hostname === "apps.apple.com";
  return (
    <a href={href} className="download-link" target="_blank" rel="noopener noreferrer">
      {isAppStore && (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M17.05 12.536c.031 3.234 2.837 4.31 2.868 4.324-.024.076-.448 1.534-1.478 3.04-.891 1.302-1.816 2.599-3.273 2.626-1.432.026-1.893-.849-3.53-.849-1.636 0-2.148.822-3.504.875-1.406.053-2.477-1.408-3.375-2.705-1.835-2.652-3.237-7.495-1.354-10.764.936-1.624 2.609-2.652 4.425-2.678 1.383-.026 2.688.929 3.53.929.84 0 2.418-1.149 4.071-.98.692.029 2.635.279 3.883 2.106-.101.063-2.317 1.349-2.293 4.076ZM14.36 4.6c.747-.904 1.25-2.162 1.113-3.414-1.076.043-2.378.717-3.15 1.62-.691.8-1.296 2.081-1.133 3.308 1.2.093 2.423-.61 3.17-1.514Z" />
        </svg>
      )}
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
