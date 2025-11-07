import {gql} from "@apollo/client";

export default gql`
query PageListaDeApoio {
  pageListaDeApoio {
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
    statistics {
      title
      description
      statistic_data {
        label
        number
      }
      acion {
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
    cms_instituicao_entidades_do_setor {
      title
      description
      image {
      formats
      url  
      }
      button {
        url
        label
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