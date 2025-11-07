import {gql} from "@apollo/client";

export  default gql `
query EntidadesFormadoras_connection (
  $filters: EntidadesFormadoraFiltersInput, 
  $pagination: PaginationArg, 
  $sort: [String]
  ){
  entidadesFormadoras_connection (
    filters: $filters, 
    pagination: $pagination, 
    sort: $sort
    ){
    nodes {
      slug
      documentId
      name
      concelho
      zona
      formacoes {
        name
      }
      publishedAt
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