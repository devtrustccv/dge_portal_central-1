import {gql} from "@apollo/client";

export default gql`
query PageDicasDeCarreira {
  pageDicasDeCarreira {
    PageInfo {
      title
      subtitle
      subtitle2
      description
      cms_topico {
        name
        slug
      }
      headerImage {
        formats
      }
    }
    session_desc {
      label
      description
    }
    session_dicas {
      title
      description
      image {
      formats
      url  
      }
    }
    conclusao {
      label
      description
    }
  }
}
`