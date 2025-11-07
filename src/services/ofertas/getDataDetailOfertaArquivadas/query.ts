import {gql} from "@apollo/client";

export default gql`
 query OfertasFormativasArquivados_connection($filters: OfertasFormativasArquivadoFiltersInput) {
  ofertasFormativasArquivados_connection(filters: $filters) {
    nodes {
       formacao
        denominacao_entidade
        familia
        carga_horaria
        valor_propina
        valor_matricula
        concelho
        condicoes_acesso
        data_fim
        data_inicio
        data_avalicao
        data_resultado
        data_inicio_formacao
        data_fim_formacao
        detalhes_oferta
        documentId
        slug
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
        url
        file {
          documentId
          url
        }
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
      criterio_selecao {
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
`
;