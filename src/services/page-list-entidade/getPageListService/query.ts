import { gql } from "@apollo/client";

export default gql`
query PageListaEntidade{
  pageListaEntidade {
    PageInfo {
      title
      subtitle
      subtitle2
      description
      headerImage {
        formats
        url
      }
      configs
    }
    SaibaMais {
      title
      button_label
      url
      url_externo
    }
  }
}
`;