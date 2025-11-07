import {gql} from "@apollo/client";

export default gql`
query PageSnq($pagination: PaginationArg) {
  pageSnq {
    PageInfo {
      id
      title
      subtitle
      subtitle2
      headerImage {
        formats
      }
      description
      configs
      cms_topico {
        slug
        name
      }
    }
    documentId
    qualificao_title {
      id
      denominacao
      label
    }
    estrutura_title
    nivels_connection {
      nodes {
        documentId
        title
        description{
          id
          questions
          response
        }
      }
    }
    section_catalogo {
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
    familia_proficionals_connection(pagination: $pagination) {
      nodes {
        documentId
        code
        title
      }
    }
    outros_title
    componentes {
      id
      title
      description
      button{
        id
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
    SaibaMais {
      id
      title
      url
      url_externo
      button_label
    }
  }
}
`;