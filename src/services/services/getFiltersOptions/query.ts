import { gql } from "@apollo/client";

export default gql`
  query Profiles {
  profiles {
    name
    slug
  }
  activePolicies {
    label
    slug
  }
  topicServices {
    slug
    name
  }
}
`;
