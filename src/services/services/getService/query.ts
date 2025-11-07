import { gql } from "@apollo/client";

export default gql`
  query Services_connection($filters: ServiceFiltersInput, $sort: [String]) {
  services_connection(filters: $filters, sort: $sort) {
    nodes {
      slug
      documentId
      title
      description
      questions {
        questions
        response
      }
      avaliacao_media
      total_avaliacao
      url
      url_externo
      publico
      transacional
      profile {
        documentId
        name
      }
      topic_services {
        documentId
        name
      }
      active_policie {
        label
        slug
      }
    }
  }
}
`;
