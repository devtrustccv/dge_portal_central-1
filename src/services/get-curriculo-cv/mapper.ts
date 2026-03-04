import {CurriculoCv} from "@/services/get-curriculo-cv/type";

export function mapper(response: any): CurriculoCv[] {
    const cvs = response?.cmsCurriculoCvs || [];

    return cvs.map((cv: any) => ({
        email: cv.email || "",
        content: {
            skills: cv.content?.skills || [],
            idiomas: cv.content?.idiomas || [],
            summary: cv.content?.summary || "",
            personal: {
                nome: cv.content?.personal?.nome || "",
                email: cv.content?.personal?.email || "",
                endereco: cv.content?.personal?.endereco || "",
                socialMidia: cv.content?.personal?.socialMidia || [],
                telefone: cv.content?.personal?.telefone || "",
                foto: cv.content?.personal?.foto || "",
            },
            projects: (cv.content?.projects || []).map((p: any) => ({
                nome: p.nome || "",
                descricao: p.descricao || "",
                link: p.link || "",
            })),
            education: (cv.content?.education || []).map((e: any) => ({
                curso: e.curso || "",
                dataInicio: e.dataInicio || "",
                dataFim: e.dataFim || "",
                instituicao: e.instituicao || "",
                observacoes: e.observacoes || "",
            })),
            experience: (cv.content?.experience || []).map((e: any) => ({
                cargo: e.cargo || "",
                empresa: e.empresa || "",
                local: e.local || "",
                dataInicio: e.dataInicio || "",
                dataFim: e.dataFim || "",
                descricao: e.descricao || "",
            })),
            references: (cv.content?.references || []).map((r: any) => ({
                nome: r.nome || "",
                cargo: r.cargo || "",
                email: r.email || "",
                empresa: r.empresa || "",
                telefone: r.telefone || "",
            })),
            certificates: (cv.content?.certificates || []).map((c: any) => ({
                nome: c.nome || "",
                entidade: c.entidade || "",
                dataInicio: c.dataInicio || "",
                dataConclusao: c.dataConclusao || "",
            })),
        },
    }));
}