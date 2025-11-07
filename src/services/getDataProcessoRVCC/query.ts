import { gql } from "@apollo/client";

export default gql`
query PageProcessoRvcc {
  pageProcessoRvcc {
    documentId
    PageInfo {
      id
      title
      subtitle
      subtitle2
      description
      headerImage {
        formats
      }
      configs
      cms_topico {
        name
        slug
      }
    }
    certificacao_config {
      id
      title
      description
      tabs {
        id
        label
        description
        list_contents {
          id
          questions
          response
        }
      }
    }
    session_entities_cert {
      id
      title
      description
      button {
        id
        label
        url
        external_link
      }
    }
    tabs {
      id
      title
      description
      tabs {
        id
        label
        description
        list_contents {
          id
          questions
          response
        }
      }
    }
    session_doc_relev {
      id
      label
      description
  
    }
    session_entity {
      id
      title
        description
      image {
        formats
      }
      acion {
        id
        label
        url
        external_link
      }
    }
    statistics {
      id
      title
      description
      acion {
        id
        label
        url
        external_link
      }
      statistic_data {
        id
        label
        number
      }
    }
    session_service {
      id
      title
      description
      button {
        id
        label
        url
        external_link
      }
    }
    saiba_mais {
      id
      title
      url
      url_externo
      button_label
    }
  }
}
`;