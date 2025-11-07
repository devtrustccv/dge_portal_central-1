import { gql } from "@apollo/client";

export default gql`
query ListaEntidadeFormadoras {
  pageListaEntidade {
    PageInfo {
      title
      subtitle
      description
      headerImage {
        formats
      }
      configs
    }
  }
}
`;