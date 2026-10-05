import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const SECRET = process.env.GEOFLOW_API_SECRET || "poolux-geoflow-secret-change-me";

interface GeoFlowPayload {
  title: string;
  slug: string;
  markdown: string;
  meta_description: string;
  keywords: string[];
  author: string;
  published_at: string;
  featured_image?: string;
  category?: string;
}

function verifySignature(body: string, sigHeader: string | null): boolean {
  if (!sigHeader) return false;
  try {
    const hmac = crypto
      .createHmac("sha256", SECRET)
      .update(body)
      .digest("hex");
    return sigHeader === `sha256=${hmac}`;
  } catch {
    return false;
  }
}

function validatePayload(data: unknown): data is GeoFlowPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.title === "string" &&
    d.title.length > 0 &&
    typeof d.slug === "string" &&
    d.slug.length > 0 &&
    typeof d.markdown === "string" &&
    d.markdown.length > 0 &&
    typeof d.meta_description === "string" &&
    Array.isArray(d.keywords) &&
    d.keywords.every((k) => typeof k === "string") &&
    typeof d.author === "string" &&
    typeof d.published_at === "string"
  );
}

function buildMdxFrontmatter(data: GeoFlowPayload): string {
  const keywordsYaml = data.keywords.map((k) => `  - "${k.replace(/"/g, '\\"')}"`).join("\n");

  return `---
title: "${data.title.replace(/"/g, '\\"')}"
slug: "${data.slug}"
description: "${data.meta_description.replace(/"/g, '\\"')}"
publishedAt: "${data.published_at}"
author: "${data.author.replace(/"/g, '\\"')}"
category: "${(data.category || "Uncategorized").replace(/"/g, '\\"')}"
featuredImage: "${(data.featured_image || "").replace(/"/g, '\\"')}"
keywords:
${keywordsYaml}
---

${data.markdown}
`;
}

export async function POST(req: NextRequest) {
  // 1. Read body
  let body: string;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json(
      { error: "failed to read request body" },
      { status: 400 }
    );
  }

  // 2. Verify signature
  const sig = req.headers.get("x-hub-signature");
  if (!verifySignature(body, sig)) {
    console.warn("[GEOFlow] 签名验证失败");
    return NextResponse.json(
      { error: "unauthorized — signature mismatch" },
      { status: 401 }
    );
  }

  // 3. Parse & validate
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: "invalid JSON body" },
      { status: 400 }
    );
  }

  if (!validatePayload(data)) {
    return NextResponse.json(
      {
        error: "invalid payload — missing required fields (title, slug, markdown, meta_description, keywords, author, published_at)",
      },
      { status: 422 }
    );
  }

  // 4. Write MDX file
  try {
    const mdxDir = path.join(process.cwd(), "src", "data", "blog");
    await mkdir(mdxDir, { recursive: true });

    const mdxContent = buildMdxFrontmatter(data);
    const filePath = path.join(mdxDir, `${data.slug}.mdx`);
    await writeFile(filePath, mdxContent, "utf-8");

    console.log(
      `[GEOFlow] ✅ 文章已写入: ${data.slug}.mdx (${data.title})`
    );

    return NextResponse.json({
      status: "ok",
      slug: data.slug,
      file: `src/data/blog/${data.slug}.mdx`,
    });
  } catch (err) {
    console.error("[GEOFlow] 文件写入失败:", err);
    return NextResponse.json(
      { error: "failed to write MDX file", detail: String(err) },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json(
    { status: "ok", message: "GEOFlow content receiver is running. Use POST to push articles." },
    { status: 200 }
  );
}
