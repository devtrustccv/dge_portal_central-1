import { gql } from "@apollo/client";

export default gql `
query PageListaConcurso {
  pageConcursosEditais {
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
    
    SaibaMais{
      title
      button_label
      url
      url_externo
    }
  }
}
`