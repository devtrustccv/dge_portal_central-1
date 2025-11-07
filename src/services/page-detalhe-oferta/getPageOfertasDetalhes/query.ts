import { gql } from "@apollo/client";

export default gql`
query PageInfo {
  detalhesOfertaForm {
    PageInfo {
      id
      title
      subtitle
      subtitle2
      headerImage {
        formats
      }
      description
    }
  }
}
`