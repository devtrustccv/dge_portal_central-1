import { gql } from "@apollo/client";

export default gql`
query SiteInfo {
  siteInfo {
    logo {
      url
    }
    logo_white {
      url
    }
    site_name
  }
}
`;