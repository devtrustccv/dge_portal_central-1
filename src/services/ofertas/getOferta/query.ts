import {gql} from "@apollo/client";

export default gql`
    query OfertasFormativas_connection($filters: OfertaFormativaFiltersInput, $pagination: PaginationArg) {
  ofertasFormativas_connection(filters: $filters, pagination: $pagination) {
    nodes {
        codigo_qualificacao
        formacao
        denominacao_entidade
        familia
        carga_horaria
        concelho
        condicoes_acesso
        data_fim
        data_inicio
        detalhes_oferta
        documentId
        ilha
        nif_entidade
        nivel
        numero_vagas
        referencia_formacao
        duracao
        modalidade
        periodo_formacao
        texto_informativo
        url_logo_entidade
        website_entidade
      documentos_necessarios {
        id
        label
      }
      programa_formativo {
        id
        denominacao
        label
      }
      saida_profissional_desc
      saidas_profissionais {
        id
        label
      }
    }
    
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
`;