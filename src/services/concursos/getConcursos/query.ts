import {gql} from "@apollo/client";

export default gql`
query Concurso($filters: ConcursoFiltersInput) {
  concursos(filters: $filters) {
    slug
    title
    concurso_description
    data_publicacao
    documentId
    documentos {
      id
      url
      file {
        documentId
        url
      }
      label
    }
    url
    url_externo
    edital
    fonte_recursos
    medida
    prazo
    publico_alvo
    estado
  }
}
`