import { gql } from "@apollo/client";

export default gql`
  query PageListaServico {
  pageListaServico {
    PageInfo {
      configs
      headerImage {
        formats
        url
      }
      title
      subtitle
      description
    }
  }
}
`;
