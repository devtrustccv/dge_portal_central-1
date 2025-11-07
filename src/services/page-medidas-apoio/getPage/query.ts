import { gql } from "@apollo/client";

export default gql`
query MedidasApoio {
  pageMedidasApoio {
    saiba_mais {
      title
      button_label
      url
      url_externo
    }
    PageInfo {
      title
      subtitle
      subtitle2
      headerImage {
        url
        name
        caption
      }
      description
      configs
      cms_topico {
        slug
        name
      }
    }
    session_entity {
      title
      image {
        url
        name
        caption
      }
      
      description
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
        number
        label
      }
    }
    session_medidas {
      label
      description
      
    }

    session_concursos {
      title
      description
      button {
        url
        label
        external_link
      }
    }
    cms_medidas_de_apoio_fp_tipo_medidas_connection {
      nodes {
        name
        image {
          url
        }
        documents_relevant {
          title
          description
          document_list {
            url
            label
            file {
              url
              previewUrl
              name
            }
          }
        }
      }
    }
    cms_medidas_de_apoio_fp_tipo_medidas {
      name
      documentId
      image {
        url
      }
      description
      documents_relevant {
        title
        description
        document_list {
          id
          file {
            url
          }
          label
          url
        }
        id
      }
    }
  }
}
`;