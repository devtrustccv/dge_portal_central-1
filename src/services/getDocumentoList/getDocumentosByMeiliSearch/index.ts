"use server"
import { meiliClient } from "@/lib/meilisearchClient";

interface ConcursoSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        topicos_servicos?: string;
        tipo_documento?: string;
        politicas_ativas?: string;
        data_inicio?: string;
        data_fim?: string;
    };
    excludeDocumentId?: string;
}

export async function getDocumentoByMeiliSearch({
    search = "",
    page = 1,
    perPage = 10,
    filterObject,
    excludeDocumentId,
}: ConcursoSearchParams) {
    try {
        const filterParts: string[] = []; // Array para armazenar os filtros individuais

        // Filtro por Tópicos de Serviço
        if (filterObject?.topicos_servicos) {
            const slugs = filterObject.topicos_servicos.split("&");
            filterParts.push(slugs.map(e => `topicos_servicos.name='${e}'`).join(" OR "));
        }

        // Filtro por Políticas Ativas
        if (filterObject?.politicas_ativas) {
            const politicas = filterObject.politicas_ativas.split("&");
            filterParts.push(politicas.map(e => `politicas_ativas.label='${e.trim()}'`).join(" OR "));
        }

        // Filtro por Tipo de Documento
        if (filterObject?.tipo_documento) {
            const codigos = filterObject.tipo_documento.split("&");
            filterParts.push(codigos.map(e => `tipo_documento='${e}'`).join(" OR "));
        }

        // Filtro por Período de Candidatura
        if (filterObject?.data_inicio && filterObject?.data_fim) {
            const inicio = Date.parse(filterObject.data_inicio) / 1000;
            const fim = Date.parse(filterObject.data_fim) / 1000;

            filterParts.push(`(publishedAt_timestamp >= ${inicio} AND publishedAt_timestamp <= ${fim})`);
        }



        // Excluir um documento específico
        if (excludeDocumentId) {
            filterParts.push(`documentId != '${excludeDocumentId}'`);
        }

        // Junta tudo com AND (para combinar diferentes categorias)
        const filter = filterParts.join(" AND ");

        // Executa a busca no MeiliSearch
        const searchResults = await meiliClient.index("dge-documento").search(search, {
            filter,
            offset: (page - 1) * perPage,
            limit: perPage,
        });

        return {
            hits: searchResults.hits,
            total: searchResults.estimatedTotalHits,
            page,
            perPage,
        };
    } catch (error) {
        console.error("Error fetching services from MeiliSearch:", error);
        throw error;
    }
}
