"use server"
import { meiliClient } from "@/lib/meilisearchClient";

interface ServiceSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        concelho?: string;
        familia?: string;
        modalidade?: string;
        metodologia?: string;
    };
}

export async function getEntidadesByMeiliSearch({
    search = "",
    page = 1,
    perPage = 10,
    filterObject,
    all = false, // Novo parâmetro para buscar tudo
}: ServiceSearchParams & { all?: boolean }) {
    try {
        const filter: string[] = [];

        if (filterObject?.concelho) {
            const concelhos = filterObject.concelho.split("&");
            filter.push(concelhos.map(e => `concelho='${e}'`).join(" OR "))  ;
        }
        if (filterObject?.familia) {
            const familias = filterObject.familia.split("&");
            filter.push(familias.map(e => `formacoes.familia='${e}'`).join(" OR ")) ;
        }
        if (filterObject?.modalidade) {
            const modalidades = filterObject.modalidade.split("&");
            filter.push(modalidades.map(e => `formacoes.modalidade='${e}'`).join(" OR ")) ;
        }
        if (filterObject?.metodologia) {
            const metodologias = filterObject.metodologia.split("&");
            filter.push(metodologias.map(e => `formacoes.metodologia='${e}'`).join(" OR ")) ;
        }

        const searchParams: any = {
            filter,
            limit: all ? 10000 : perPage, // Se "all" for true, busca tudo
        };

        if (!all) {
            searchParams.offset = (page - 1) * perPage; // Paginação apenas quando "all" for falso
        }

        const searchResults = await meiliClient.index("dge-entidades-formadora").search(search, searchParams);

        return {
            hits: searchResults.hits,
            total: searchResults.estimatedTotalHits ?? 0,
            page,
            perPage,
        };
    } catch (error) {
        console.error("Error fetching services from MeiliSearch:", error);
        throw error;
    }
}
