import { gql } from "@apollo/client";

export default gql`
query ListaOfertaFormativa {
  pageProgramaEmpresarial {
    PageInfo {
      id
      title
      subtitle
      subtitle2
      headerImage {
        formats
      }
      description
      cms_topico {
        slug
        name
      }
    }
    saiba_mais {
      id
      title
      button_label
      url
      url_externo
    }
    session_service {
      id
      title
      description
      button {
        label
        url
        external_link
      }
    }
    session_statistic {
      title
      description
      acion {
        url
        label
        external_link
      }
      statistic_data {
        label
        number
      }
    }

    session_doc_relev {
      label
      description
    }

    session_entity {
      title
      image {
        url
        name
      }
      description
      acion {
        url
        label
        external_link
      }
    }
      
  }
}
`;