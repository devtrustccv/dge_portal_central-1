import { gql } from "@apollo/client";

export default gql`
query PageInfo {
  pageDetalhesCnq {
    PageInfo {
      title
      description
      headerImage {
        formats
      }
    }
  }
}
`;