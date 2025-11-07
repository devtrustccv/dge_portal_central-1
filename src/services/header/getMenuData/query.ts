import { gql } from "@apollo/client";

export default gql`
  query Menus($sort: [String]) {
  menus(sort: $sort) {
    label
    url
    link_extern
    submenu {
      submenu {
        label
        url
        external_link
      }
      title
    }
  }
}
`;
