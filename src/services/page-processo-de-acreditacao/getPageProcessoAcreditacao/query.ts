import {gql} from "@apollo/client";

export default gql`
query PageProcessoAcreditacao {
  pageProcessoAcreditacao {
    PageInfo {
      title
      subtitle
      description
      headerImage {
      formats
      url  
      }
      cms_topico {
        name
        slug
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
          questions
          response
        }
      }
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
    id
      label
      description
    }
    session_entities_acredit {
      title
      description
      button {
        label
        url
        external_link
      }
    }
    session_entity {
      title
      description
      image {
      formats
      url  
      }
      acion {
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
      id
    }
  }
}
`