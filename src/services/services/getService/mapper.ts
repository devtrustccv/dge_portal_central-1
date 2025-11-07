import { IServiceItem } from "../type";

export const mapper = (data: any): IServiceItem | null => {
  const nodes = data?.services_connection?.nodes;

  if (!Array.isArray(nodes) || nodes.length === 0) {
    return null;
  }

  const node = nodes[0];

  const questions = Array.isArray(node.questions)
    ? node.questions.map((q: any) => ({
      question: q.questions,
      response: q.response,
    }))
    : [];

  return {
    documentId: node.documentId ?? "",
    slug: node.slug ?? "",
    title: node.title ?? "",
    url: node.url ?? "",
    url_externo: node.url_externo ?? "",
    avaliacao_media: node.avaliacao_media ?? 0,
    total_avaliacao: node.total_avaliacao ? Number(node.total_avaliacao) : 0,
    description: node.description ?? "",
    questions,
    profile: node.profile ? {
      name: node.profile.name,
      documentId: node.profile.documentId,
    } : null,
    topicServices: Array.isArray(node.topic_services)
      ? node.topic_services.map((ts: any) => ({
        name: ts.name,
        documentId: ts.documentId,
      }))
      : [],
    sectionTitle: node.service_section_title ?? null,
    activePolicy: node.active_policie
      ? {
        label: node.active_policie.label,
        slug: node.active_policie.slug,
      }
      : null,
  };
};

