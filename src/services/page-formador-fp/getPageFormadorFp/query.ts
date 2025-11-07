import {gql} from "@apollo/client";

export default gql`
query PageFormadorDeFp {
  pageFormadorDeFp {
    PageInfo {
      title
      subtitle
      subtitle2
      description
      configs
      headerImage {
      formats
      url  
      }
      cms_topico {
        name
        slug
      }
    }
    session_desc {
      label
      description
    }
    perguntas {
      questions
      response
    }
    session_oferta {
      label
      description
    }
    formadores {
      location
      name
      button {
        label
        url
        external_link
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
    
    saiba_mais {
      title
      url
      url_externo
      button_label
    }
  }
}


`