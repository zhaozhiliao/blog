/** App registry. All apps share one layout and use /apps/<slug>. */
export type {
  AppConfig,
  AppLanding,
} from "./app-types";

import type { AppConfig } from "./app-types";
import { echokit } from "./echokit/app.config";
import { watermind } from "./watermind/app.config";

import { keywordVolumeLab } from "./keyword-volume-lab/app.config";

export const apps: AppConfig[] = [watermind, echokit, keywordVolumeLab];
