import Link from "next/link";
import type { ComponentProps, ComponentType } from "react";
import { SITE_ORIGIN } from "@/lib/site";

/* Custom MDX element mapping. Internal links go through next/link; the rest of
   the styling is handled by the `.prose` wrapper in globals.css. */
const components = {
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="table-scroll" role="region" aria-label="表格，可横向滚动" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  a: ({ href = "", children, ...props }: { href?: string; children?: React.ReactNode }) => {
    const external = /^(https?:)?\/\//i.test(href) && new URL(href, SITE_ORIGIN).origin !== SITE_ORIGIN;
    if (!external) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}<span className="external-arrow" aria-hidden="true">↗</span>
      </a>
    );
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MDXContent({ body: Body }: { body: ComponentType<any> }) {
  return (
    <div className="prose">
      <Body components={components} />
    </div>
  );
}
