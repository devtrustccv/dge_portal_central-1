import {NextResponse} from "next/server";

const CMS_URL = process.env.CMS_URL;

export async function POST(req: Request) {

    try {
        const body = await req.json();

        const response = await fetch(`${CMS_URL}/api/cms-curriculo-cvs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email: body.personal?.email,
                    content: body
                }
            }),
        });

        const data = await response.json().catch(err => {
            console.error("route.ts → erro ao parsear JSON da resposta:", err);
            return null;
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: data?.error || "Erro ao registrar log"},
                {status: 500}
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("route.ts → catch geral:", error);

        return NextResponse.json(
            {error: "Erro interno"},
            {status: 500}
        );
    }
}