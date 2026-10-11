/** Shared App config types — imported by each `content/apps/<slug>/app.config.ts`. */

/** Content for the shared App introduction template. */
export interface AppLanding {
  headline?: string;
  subhead?: string;
  intro?: string[];
  /** Hero download button; href falls back to `external.download`.
      Set `disabled: true` or omit href/download URL for a non-interactive state. */
  downloadCta?: { label: string; href?: string; disabled?: boolean };
  /** Product screenshot/image src, or an ordered image list. */
  screenshot?: string | string[];
  featuresTitle?: string;
  features?: { title: string; desc: string }[];
  pricingTitle?: string;
  pricingSubtitle?: string;
  plans?: {
    name: string;
    price: string;
    items: string[];
  }[];
}

export interface AppConfig {
  /** URL segment — must match this directory name. */
  slug: string;
  name: string;
  tagline: string;
  logo?: string;
  platform?: string;
  external?: {
    github?: string;
    download?: string;
    website?: string;
  };
  landing?: AppLanding;
}
