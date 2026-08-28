import {NextResponse} from "next/server"

const CMS_URL = process.env.CMS_URL

export async function POST(req: Request) {
    try {

        const body = await req.json()

        const response = await fetch(`${CMS_URL}/api/cms-logs-cvs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    nome: body.nome,
                    email: body.email,
                    telefone: body.telefone,
                    endereco: body.endereco
                }
            })
        })

        if (!response.ok) {
            return NextResponse.json(
                {error: "Erro ao registrar log"},
                {status: 500}
            )
        }

        const data = await response.json()

        return NextResponse.json(data)

    } catch {
        console.error("logDownloadCV: erro interno.")
        return NextResponse.json(
            {error: "Erro interno"},
            {status: 500}
        )
    }
}
