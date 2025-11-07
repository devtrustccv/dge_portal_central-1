import { gql } from "@apollo/client";

export default gql`
  query Services_connection($filters: ServiceFiltersInput, $pagination: PaginationArg) {
  services_connection(filters: $filters, pagination: $pagination) {
    nodes {
      slug
      title
      topic_services {
        name
        slug
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
      total
    }
  }
}
`;
