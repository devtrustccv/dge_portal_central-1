import { gql } from "@apollo/client";

export default gql`
  query OfertasFormativas_connection($filters: OfertaFormativaFiltersInput, $pagination: PaginationArg) {
  ofertasFormativas_connection(filters: $filters, pagination: $pagination) {
    nodes {
      slug
      documentId
      formacao
      denominacao_entidade
      url_logo_entidade
      referencia_formacao
      duracao
      periodo_formacao
      nivel
    }
  }
}
`;