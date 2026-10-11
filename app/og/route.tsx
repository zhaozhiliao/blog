import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_AVATAR } from "@/lib/site";

export const runtime = "nodejs";

/** Dynamic OG image: page title + subtitle + site identity. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? SITE_NAME).slice(0, 80);
  const subtitle = (searchParams.get("subtitle") ?? "").slice(0, 120);

  const avatar = await readFile(join(process.cwd(), "public", SITE_AVATAR.slice(1)));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0A0A0A",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatarSrc} alt="" width={48} height={48} style={{ borderRadius: 24 }} />
          <div style={{ fontSize: 28, fontWeight: 600 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{title}</div>
          {subtitle && (
            <div style={{ marginTop: 20, fontSize: 30, color: "#A3A3A3", lineHeight: 1.4 }}>{subtitle}</div>
          )}
        </div>

        <div style={{ height: 6, width: 120, borderRadius: 3, background: "#454545" }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
