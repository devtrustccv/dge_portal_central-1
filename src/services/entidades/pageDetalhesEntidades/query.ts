import { gql } from "@apollo/client";

export default gql`
query DetalhesEntidades{
  pageDetalhesEntidade {
    PageInfo {
      title
      subtitle
      subtitle2
      description
      headerImage {
        formats
        url
      }
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