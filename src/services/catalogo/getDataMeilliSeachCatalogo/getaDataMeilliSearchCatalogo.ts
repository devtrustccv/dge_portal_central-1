"use server"
import { meiliClient } from "@/lib/meilisearchClient";

export interface OfertaSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        nivel?: string;
        familia?: string;
        ref_rvcc?: boolean,
        requisito_acesso?: string;
        flag_catalogo?: boolean;
    };
}

export async function getCatalogoByMeiliSearch({
   search = "",
   page = 1,
   perPage = 10,
   filterObject,
}: OfertaSearchParams) {
    try {
        let filter = "";

        if (filterObject?.nivel) {
            const niveis = filterObject.nivel.split("&");
            filter += (filter ? " AND " : "") + niveis.map(e => `nivel='${e}'`).join(" OR ");
        }

        if (filterObject?.familia) {
            const familias = filterObject.familia.split("&");
            filter += (filter ? " AND " : "") + familias.map(e => `familia='${e}'`).join(" OR ");
        }

        if (filterObject?.requisito_acesso) {
            const requisitos = filterObject.requisito_acesso.split("&");
            filter += (filter ? " AND " : "") + requisitos.map(e => `escolaridade_min='${e}'`).join(" OR ");
        }

        if (typeof filterObject?.flag_catalogo === "boolean") {
            filter += (filter ? " AND " : "") + `flag_catalogo=${filterObject.flag_catalogo}`;
        }

        if (typeof filterObject?.ref_rvcc === "boolean") {
            filter += (filter ? " AND " : "") + `ref_rvcc=${filterObject.ref_rvcc}`;
        }

        const searchResults = await meiliClient.index("dge-qualificacao").search(search, {
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
