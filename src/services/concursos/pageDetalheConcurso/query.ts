import { gql } from "@apollo/client";

export default gql `
query PageConcursoDetalhe {
  pageDetalhesConcursosEditais {
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
    
  }
}
`