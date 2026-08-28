import {NextResponse} from "next/server";

const CMS_URL = process.env.CMS_URL;

export async function POST(req: Request) {
    const COLLECTION_PATH = "/api/cms-curriculo-cvs"
    try {
        const body = await req.json();
        const ownerEmail = body?.ownerEmail;
        const content = body?.content || body;

        if (!ownerEmail) {
            return NextResponse.json(
                {error: "ownerEmail é obrigatório para guardar o currículo"},
                {status: 400}
            );
        }

        const response = await fetch(`${CMS_URL}${COLLECTION_PATH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email: ownerEmail,
                    content
                }
            }),
        });

        const data = await response.json().catch(() => {
            console.error("save-cv: erro ao parsear JSON da resposta.");
            return null;
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: data?.error || "Erro ao registrar log"},
                {status: 500}
            );
        }

        return NextResponse.json(data);

    } catch {
        console.error("save-cv: erro interno.");

        return NextResponse.json(
            {error: "Erro interno"},
            {status: 500}
        );
    }
}
