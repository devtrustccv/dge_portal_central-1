import { gql } from "@apollo/client";

export default gql`
query ListaDocumento {
  listaDocumento {
    PageInfo {
      title
      subtitle
      subtitle2
      headerImage {
      formats
      url  
      }
      description
      configs
    }
    documentos_destaque {
    documentId
      tipo_documento {
        title
      } 
      title
      createdAt
      url
      file {
        url
      }
    }
  }
}
`