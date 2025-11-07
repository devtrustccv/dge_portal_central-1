"use server"
import { meiliClient } from "@/lib/meilisearchClient";

interface ConcursoSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        medida?: string;
    };
    excludeDocumentId?: string;  // Novo parâmetro para excluir um documentId específico
}

export async function getApoioByMeiliSearch({
   search = "",
   page = 1,
   perPage = 10,
   filterObject,
   excludeDocumentId,
}: ConcursoSearchParams) {
    try {
        let filter = "";

        // Adiciona o filtro de 'medida', se fornecido
        if (filterObject?.medida) {
            const medidas = filterObject.medida.split("&");
            filter = medidas.map(e => `medida='${e}'`).join(" OR ");
        }

        // Filtro adicional para excluir o concurso com o 'documentId' passado
        if (excludeDocumentId) {
            filter += filter ? ` AND documentId != '${excludeDocumentId}'` : `documentId != '${excludeDocumentId}'`;
        }

        const searchResults = await meiliClient.index("dge-apoios-incentivos").search(search, {
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
