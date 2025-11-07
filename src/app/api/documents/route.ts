import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const idRelacao = searchParams.get("idRelacao");
    const tipoRelacao = searchParams.get("tipoRelacao");
    const appCode = searchParams.get("appCode");

    if (!idRelacao || !tipoRelacao || !appCode) {
        return NextResponse.json(
            { error: "Missing parameters" },
            { status: 400 }
        );
    }
    const remoteUrl = `${API_URL}/api/documentos/preview-by-tipo-rel` +
        `?idRelacao=${encodeURIComponent(idRelacao)}` +
        `&tipoRelacao=${encodeURIComponent(tipoRelacao)}` +
        `&appCode=${encodeURIComponent(appCode)}`;

    try {
        const response = await fetch(remoteUrl, {
            method: "GET",
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Document not found" },
                { status: response.status }
            );
        }

        const buffer = await response.arrayBuffer();

        const contentType = response.headers.get("content-type") || "application/pdf";
        const contentDisposition = response.headers.get("content-disposition") ||
            `inline; filename="${tipoRelacao}_${idRelacao}.pdf"`;

        return new NextResponse(Buffer.from(buffer), {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": contentDisposition,
            },
        });
    } catch (_error) {
        return NextResponse.json(
            { error: _error || "Failed to fetch document" },
            { status: 502 }
        );
    }
}
