import { gql } from "@apollo/client";

export default gql`
query MoreAccessedService {
  moreAccessedService {
    service_top_by_profile
    service_top
  }
}
`;
