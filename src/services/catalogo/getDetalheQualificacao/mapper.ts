import { IQualificacaoModal } from "@/services/catalogo/getDetalheQualificacao/Types/type";

export function mapper(response: any): IQualificacaoModal | null {
    if (!response) return null;
    const data = response?.cmsQualificacaos_connection?.nodes;

    return {
        nodes: data?.map((node: any) => ({
            documentId: node.documentId || '',
            slug: node?.slug || '',
            nivel: node.nivel || '',
            name: node.name || '',
            description: node.description || '',
            codigo_qualificacao: node.codigo_qualificacao || '',
            escolaridade_min: node.escolaridade_min || '',
            familia: node.familia || '',
            questions: node.questions.map((q: any) => ({
                id: q.id || '',
                questions: q.questions || '',
                response: q.response || '',
            })),
            programaFormativo: {
                formats: node.programaFormativo?.formats || '',
            },
            formacao: node.formacao.map((f: any) => ({
                id: f.id || '',
                denominacao: f.denominacao || '',
                label: f.label || '',
            })),
            certificado: node.certificado.map((c: any) => ({
                id: c.id || '',
                denominacao: c.denominacao || '',
                label: c.label || '',
            })),
            entidades_connection: {
                nodes: node.entidades_connection.nodes.map((ec: any) => ({
                    ilha: ec.ilha || '',
                    name: ec.name || '',
                    concelho: ec.concelho || '',
                    zona: ec.zona || '',
                    documentId: ec.documentId || '',
                    formacoes: ec.formacoes?.map((form: any) => ({
                        name: form.name || '',
                        nivel: form.nivel || '',
                        familia: form.familia || '',
                        metodologia: form.metodologia || '',
                        modalidade: form.modalidade || '',
                        num_alvara: form.num_alvara || '',
                    })) || [],
                })) || [],
            },
            SaibaMais: node.SaibaMais.map((sm: any) => ({
                id: sm.id || '',
                title: sm.title || '',
                url: sm.url || '',
                url_externo: sm.url_externo || '',
                button_label: sm.button_label || '',
            })),
        })) || [],
        pageInfo: {
            page: response.cmsQualificacaos_connection.pageInfo.page || 1,
            pageCount: response.cmsQualificacaos_connection.pageInfo.pageCount || 3,
            pageSize: response.cmsQualificacaos_connection.pageInfo.pageSize || 10,
            total: response.cmsQualificacaos_connection.pageInfo.total || 10,
        },
    };
}
