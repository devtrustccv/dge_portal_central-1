import {gql} from "@apollo/client";

export default gql`
query PageDetalhesApoio {
  pageDetalhesApoio {
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
      cms_topico {
        name
        slug
      }
    }
    session_doc_relev {
      label
      description
    }
    session_service {
      title
      description
      button {
        label
        url
        external_link
      }
    }
  }
}

`