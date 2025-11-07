import { gql } from "@apollo/client";

export default gql`
query EntidadesFormadoras_connection($pagination: PaginationArg, $filters: EntidadesFormadoraFiltersInput, $formacoesPagination2: PaginationArg) {
  entidadesFormadoras_connection(pagination: $pagination, filters: $filters) {
    nodes {
      slug
      documentId
      name
      ilha
      concelho
      zona
      long_latitude
      contacts {
        title
        type
        value
      }
      alvara_entidade {
        address
        number
        estabelecimento
        date_init
        date_end
        estado
        url_alvara
      }
      formacoes(pagination: $formacoesPagination2) {
        name
        nivel
        familia
        metodologia
        modalidade
        num_alvara
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