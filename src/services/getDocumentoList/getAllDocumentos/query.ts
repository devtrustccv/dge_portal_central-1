import { gql } from "@apollo/client";

export default gql`
query GetDocumentos($filters: DocumentoFiltersInput) {
  documentos(filters: $filters) {
    title
    url
    file {
    documentId
    url  
    }
    topicos_servicos {
      name
      slug
    }
  }
}
`