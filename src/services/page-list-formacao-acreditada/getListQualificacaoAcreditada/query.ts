import { gql } from "@apollo/client";

export default gql`
query PageLQualificacaoAcredit {
  pageLQualificacaoAcredit {
    PageInfo {
      id
      title
      description
      subtitle
      subtitle2
      headerImage {
        formats
      }
      configs
      cms_topico {
        slug
        name
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