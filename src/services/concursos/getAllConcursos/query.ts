import {gql} from "@apollo/client";

export  default gql `
query Concursos_connection($filters: ConcursoFiltersInput,
$pagination: PaginationArg){
  concursos_connection(filters: $filters,
  pagination: $pagination
  ) {
    nodes {
      slug
      data_publicacao
      title
      medida
      concurso_description
      edital
      estado
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