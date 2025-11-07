import {gql} from "@apollo/client";

export default gql`
query PageCnq {
  pageCnq {
    PageInfo {
      id
      title
      subtitle
      subtitle2
      description
      headerImage {
        formats
      }
      configs
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