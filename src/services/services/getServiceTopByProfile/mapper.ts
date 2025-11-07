import {
  IMoreAccessedService,
  IServiceTop,
  IServiceTopByProfile,
} from "../type";

export const mapper = (payload: any): IMoreAccessedService => {
  const data = payload?.moreAccessedService || {};

  const service_top_by_profile: IServiceTopByProfile[] = Array.isArray(data.service_top_by_profile)
    ? data.service_top_by_profile.map((item: any) => {
      return {
        services: Array.isArray(item.services)
          ? item.services.map((service: any) => ({
            slug: service.slug ?? "",
            title: service.title ?? "",
            total: service.total ?? "",
            document_id: service.document_id ?? "",
          }))
          : [],
        profile_name: item.profile_name ?? "",
        profile_slug: item.profile_slug ?? "",
        profile_plurall_name: item.profile_plurall_name ?? "",
        profile_icon: item.profile_icon ?? "",
        description: item.description ?? "",
      };
    })
    : [];

  const service_top: IServiceTop[] = Array.isArray(data.service_top)
    ? data.service_top.map((item: any) => ({
      slug: item.slug ?? "",
      title: item.title ?? "",
      total: item.total ?? "",
      document_id: item.document_id ?? "",
      profile: {
        icon: item.profile?.icon ?? null,
        name: item.profile?.name ?? null,
        slug: item.profile?.slug ?? null,
        documentId: item.profile?.documentId ?? null,
      },
      active_policie: item.active_policie
        ? {
          id: item.active_policie.id,
          slug: item.active_policie.slug,
          label: item.active_policie.label,
          documentId: item.active_policie.documentId,
        }
        : null,
      topic_services: Array.isArray(item.topic_services)
        ? item.topic_services.map((topic: any) => ({
          id: topic.id,
          name: topic.name,
          slug: topic.slug,
          documentId: topic.documentId,
        }))
        : [],
    }))
    : [];

  return {
    service_top_by_profile,
    service_top,
  };
};
