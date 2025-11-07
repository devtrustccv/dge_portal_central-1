import { mapApoiosIncentivos } from "./mappers/apoios-incentivos-mapper";
import { mapConcursos } from "./mappers/concurso-mapper";
import { mapDocumento } from "./mappers/documento-mapper";
import { mapEntidadesFormadora } from "./mappers/entidades-formadora-mapper";
import { mapOfertasFormativas } from "./mappers/oferta-formativa-mapper";
import { mapQualificacao } from "./mappers/qualificacao-mapper";
import { mapServices } from "./mappers/services-mapper";
import { meiliClient } from "@/lib/meilisearchClient";
import {mapQualificacaoAcredit} from "@/services/global-search/mappers/qualificacao-acredit-mapper";
import {mapOfertaEmpregoEstagio} from "@/services/global-search/mappers/oferta-emprego-estagio-mapper";


const indexConfig: {
  [key: string]: { mapper: (hit: any) => any; attributesToHighlight: string[] };
} = {
  "dge-service": {
    mapper: mapServices,
    attributesToHighlight: ["title", "description"],
  },
  "dge-concurso": {
    mapper: mapConcursos,
    attributesToHighlight: ["title", "concurso_description"],
  },
  "dge-oferta-formativa": {
    mapper: mapOfertasFormativas,
    attributesToHighlight: ["formacao", "detalhes_oferta"],
  },
  "dge-entidades-formadora": {
    mapper: mapEntidadesFormadora,
    attributesToHighlight: ["name", "zona"],
  },
  "dge-documento": {
    mapper: mapDocumento,
    attributesToHighlight: ["title", "tipo_documento"],
  },
  "dge-apoios-incentivos": {
    mapper: mapApoiosIncentivos,
    attributesToHighlight: ["title", "description"],
  },
  "dge-qualificacao": {
    mapper: mapQualificacao,
    attributesToHighlight: ["name", "description"],
  },
  "dge-qualificacao-acredit": {
    mapper: mapQualificacaoAcredit,
    attributesToHighlight: ["name", "description"],
  },
  "dge-oferta-emprego-estagio": {
    mapper: mapOfertaEmpregoEstagio,
    attributesToHighlight: ["name", "description"],
  },
};

export async function searchAll(locale: string, search: string) {
  try {
    const queries = Object.keys(indexConfig).map((indexUid) => ({
      indexUid,
      q: search,
      //filter: `locale="${locale}"`,
      attributesToHighlight: indexConfig[indexUid]?.attributesToHighlight,
      highlightPreTag: '<span class="text-primary">',
      highlightPostTag: "</span>",
    }));

    const searchResults = await meiliClient.multiSearch({ queries });

    const results = searchResults.results.reduce(
      (acc: { [key: string]: any[] }, result) => {
        const indexUid = result.indexUid;
        const config = indexConfig[indexUid];
        if (config && result.hits.length > 0) {
          acc[indexUid] = result.hits.map(config.mapper as any);
        }
        return acc;
      },
      {}
    );
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
