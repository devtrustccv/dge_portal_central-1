import { gql} from "@apollo/client";

export default gql`
        query {
             footer {
                  logo {
                  formats
                    url
                  }
                  contact {
                    label
                    url
                    external_link
                  }
                  site_map_title
                  site_map {
                    label
                    url
                    external_link
                  }
                  useful_links_title
                  usefull_links {
                    label
                    url
                    external_link
                  }
                   client {
                    logo {
                          formats
                          url
                    }
                     name
                     url
                  }
                  social_midia {
                    logo {
                      url
                      formats
                    }
                    name
                    url
                  }
            }
        }
`;