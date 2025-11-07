"use server";
import { meiliClient } from "@/lib/meilisearchClient";

export interface OfertaSearchParams {
  search?: string;
  page?: number;
  perPage?: number;
  tipo_oferta_emprego: string;
  filterObject?: {
    modelo?: string;
    experiencia?: string;
    idiomas?: string;
    inicio_candidatura?: string;
    fim_candidatura?: string;
    entidade?: string;
    ilha?: string;
    area_profissional?: string;
  };
}

export async function getOfertasEmpregoByMili({
  search = "",
  page = 1,
  perPage = 10,
  filterObject,
  tipo_oferta_emprego,
}: OfertaSearchParams) {
  try {
    let filter = `tipo_oferta_emprego.codigo='${tipo_oferta_emprego}'`;

    // Handle 'entidade' filter
    if (filterObject?.entidade) {
      const entidade = filterObject.entidade.split("&");
      if (filter) filter += " AND ";
      filter += `(${entidade.map((e) => `entidade='${e}'`).join(" OR ")})`;
    }
    // Handle 'modelo' filter
    if (filterObject?.modelo) {
      const modelo = filterObject.modelo.split("&");
      if (filter) filter += " AND ";
      filter += `(${modelo.map((e) => `modelo='${e}'`).join(" OR ")})`;
    }
    // Handle 'experiencia' filter
    if (filterObject?.experiencia) {
      const experiencia = filterObject.experiencia.split("&");
      if (filter) filter += " AND ";
      filter += `(${experiencia.map((e) => `experiencia='${e}'`).join(" OR ")})`;
    }
    // Handle 'area_profissional' filter
    if (filterObject?.area_profissional) {
      const area_profissional = filterObject.area_profissional.split("&");
      if (filter) filter += " AND ";
      filter += `(${area_profissional
        .map((e) => `area_profissional='${e}'`)
        .join(" OR ")})`;
    }
    // Handle 'idiomas' filter
    if (filterObject?.idiomas) {
      const idiomas = filterObject.idiomas.split("&");
      if (filter) filter += " AND ";
      filter += `(${idiomas.map((e) => `idiomas.label='${e}'`).join(" OR ")})`;
    }

    // Handle 'ilha' filter
    if (filterObject?.ilha) {
      const ilha = filterObject.ilha.split("&");
      if (filter) filter += " AND ";
      filter += `(${ilha.map((e) => `concelho='${e}'`).join(" OR ")})`;
    }

    // Handle 'inicio_candidatura' and 'fim_candidatura' range filter
    if (filterObject?.inicio_candidatura && filterObject?.fim_candidatura) {
      const inicio = Date.parse(filterObject.inicio_candidatura);
      const fim = Date.parse(filterObject.fim_candidatura) + (24 * 60 * 60 * 1000) - 1000; // Inclui todo o dia

      if (filter) filter += " AND ";
      filter += `(inicio_candidatura_timestamp >= ${inicio / 1000} AND fim_candidatura_timestamp <= ${fim / 1000})`;
    }

    const searchResults = await meiliClient
      .index("dge-oferta-emprego-estagio")
      .search(search, {
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
