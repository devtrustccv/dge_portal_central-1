"use server"
import { meiliClient } from "@/lib/meilisearchClient";

export interface OfertaSearchParams {
    search?: string;
    page?: number;
    perPage?: number;
    filterObject?: {
        entidade?: string,
        nivel?: string,
        familia?: string,
        concelho?: string;
        modalidade?: string,
        periodo_formacao?: string,
        saida_profissional?: string,
        data_inicio?: string;
        data_fim?: string;
    };
}

export async function getOfertaFormativaByMeiliSearch({
  search = "",
  page = 1,
  perPage = 10,
  filterObject,
}: OfertaSearchParams) {
    try {

        let filter = '';

        if (filterObject?.entidade) {
            const entidades = filterObject.entidade.split("&");
            filter += (filter ? ' AND ' : '') + `(${entidades.map(e => `denominacao_entidade='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.nivel) {
            const niveis = filterObject.nivel.split("&");
            filter += (filter ? ' AND ' : '') + `(${niveis.map(e => `nivel='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.familia) {
            const familias = filterObject.familia.split("&");
            filter += (filter ? ' AND ' : '') + `(${familias.map(e => `familia='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.concelho) {
            const concelhos = filterObject.concelho.split("&");
            filter += (filter ? ' AND ' : '') + `(${concelhos.map(e => `concelho='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.modalidade) {
            const modalidades = filterObject.modalidade.split("&");
            filter += (filter ? ' AND ' : '') + `(${modalidades.map(e => `modalidade='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.periodo_formacao) {
            const periodos = filterObject.periodo_formacao.split("&");
            filter += (filter ? ' AND ' : '') + `(${periodos.map(e => `periodo_formacao='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.saida_profissional) {
            const saidas = filterObject.saida_profissional.split("&");
            filter += (filter ? ' AND ' : '') + `(${saidas.map(e => `saidas_profissionais.label='${e}'`).join(" OR ")})`;
        }

        if (filterObject?.data_inicio || filterObject?.data_fim) {
            let dataFilter = '';

            if (filterObject.data_inicio) {
                const inicio = Date.parse(filterObject.data_inicio);
                if (!isNaN(inicio)) {
                    dataFilter += `data_inicio_timestamp >= ${inicio / 1000}`;
                }
            }

            if (filterObject.data_fim) {
                const fim = Date.parse(filterObject.data_fim);
                if (!isNaN(fim)) {
                    if (dataFilter) dataFilter += ' AND ';
                    dataFilter += `data_fim_timestamp <= ${fim / 1000}`;
                }
            }

            if (dataFilter) {
                filter += (filter ? ' AND ' : '') + `(${dataFilter})`;
            }
        }

        const searchResults = await meiliClient.index("dge-oferta-formativa").search(search, {
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