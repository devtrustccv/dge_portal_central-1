"use server"
import { meiliClient } from "@/lib/meilisearchClient";

export interface OfertaSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        nivel?: string;
        familia?: string;
        modalidade?: string;
        metodologia?: string;
        flag_catalogo?: boolean;
    };
}

export async function getQualificacaoAcreditadaByMeiliSearch({
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

        if (filterObject?.modalidade) {
            const requisitos = filterObject.modalidade.split("&");
            filter += (filter ? " AND " : "") + requisitos.map(e => `modalidade='${e}'`).join(" OR ");
        }

        if (filterObject?.metodologia) {
            const requisitos = filterObject.metodologia.split("&");
            filter += (filter ? " AND " : "") + requisitos.map(e => `metodologia='${e}'`).join(" OR ");
        }

        if (typeof filterObject?.flag_catalogo === "boolean") {
            filter += (filter ? " AND " : "") + `flag_catalogo=${filterObject.flag_catalogo}`;
        }

        const searchResults = await meiliClient.index("dge-qualificacao-acredit").search(search, {
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
