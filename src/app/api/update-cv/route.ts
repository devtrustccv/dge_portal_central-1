import {NextResponse} from "next/server"

const CMS_URL = process.env.CMS_URL
const COLLECTION_PATH = "/api/cms-curriculo-cvs"

type StrapiEntry = {
    id?: number | string
    documentId?: string
    email?: string
}

async function parseJsonSafely(response: Response) {
    return response.json().catch(err => {
        console.error("update-cv → erro ao parsear JSON da resposta:", err)
        return null
    })
}

async function findCurriculoByEmail(email: string): Promise<StrapiEntry | null> {
    const query = new URLSearchParams()
    query.set("filters[email][$eq]", email)
    query.append("fields[0]", "email")
    query.append("fields[1]", "documentId")

    const response = await fetch(`${CMS_URL}${COLLECTION_PATH}?${query.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-store"
    })

    const responseData = await parseJsonSafely(response)

    if (!response.ok) {
        throw new Error(responseData?.error?.message || "Erro ao consultar currículo no CMS")
    }

    const items = responseData?.data

    if (!Array.isArray(items) || items.length === 0) {
        return null
    }

    return items[0]
}

async function updateCurriculo(identifier: string | number, payload: unknown) {
    const response = await fetch(`${CMS_URL}${COLLECTION_PATH}/${identifier}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const responseData = await parseJsonSafely(response)

    return {
        ok: response.ok,
        status: response.status,
        data: responseData
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const ownerEmail = body?.ownerEmail
        const lookupEmail = ownerEmail
        const content = body?.content || body

        if (!CMS_URL) {
            return NextResponse.json({error: "CMS_URL não configurado"}, {status: 500})
        }

        if (!lookupEmail) {
            return NextResponse.json({error: "ownerEmail é obrigatório para atualizar o currículo"}, {status: 400})
        }

        const existingCurriculo = await findCurriculoByEmail(lookupEmail)

        if (!existingCurriculo) {
            return NextResponse.json(
                {error: `Currículo não encontrado para atualização com o email ${lookupEmail}`},
                {status: 404}
            )
        }

        const payload = {
            data: {
                email: lookupEmail,
                content
            }
        }

        const identifiersToTry = [existingCurriculo.documentId, existingCurriculo.id].filter(Boolean)

        if (identifiersToTry.length === 0) {
            return NextResponse.json(
                {error: "Currículo encontrado sem identificador para atualização"},
                {status: 500}
            )
        }

        let lastError: { status?: number; data?: any; identifier?: string | number } | null = null

        for (const identifier of identifiersToTry) {
            const result = await updateCurriculo(identifier as string | number, payload)

            if (result.ok) {
                return NextResponse.json(result.data)
            }

            lastError = {
                status: result.status,
                data: result.data,
                identifier
            }
        }

        return NextResponse.json(
            {
                error: lastError?.data?.error?.message || lastError?.data?.error || "Não foi possível atualizar o currículo no CMS",
                identifier: lastError?.identifier
            },
            {status: lastError?.status || 500}
        )
    } catch (error) {
        console.error("update-cv → catch geral:", error)

        return NextResponse.json(
            {error: error instanceof Error ? error.message : "Erro interno"},
            {status: 500}
        )
    }
}
