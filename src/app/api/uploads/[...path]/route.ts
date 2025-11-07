import { NextRequest } from "next/server";

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;

    const CMS_URL = process.env.CMS_URL;
    if (!CMS_URL) {
        return new Response("CMS_URL is not defined", { status: 500 });
    }

    const targetUrl = `${CMS_URL.replace(/\/$/, "")}/uploads/${path.join("/")}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
        return new Response("Not found", { status: 404 });
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(response.body, {
        status: response.status,
        headers,
    });
}
