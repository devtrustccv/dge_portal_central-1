import {gql} from "@apollo/client";

export default gql`
query {
  pageEfetuarCandidOFormativa {
    PageInfo {
      title
      subtitle
      description
      headerImage {
      formats
      url  
      }
      configs
      cms_topico {
        name
        slug
      }
    }
    termo_aceitacao
  }
}

`