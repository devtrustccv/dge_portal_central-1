import {gql} from "@apollo/client";

export default gql`
query PageComoProcurarEmprego  {
  pageComoProcurarEmprego 
     {
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
      url  
      }
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