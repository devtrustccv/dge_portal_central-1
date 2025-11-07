export interface ProfilesAPIResponse {

  profiles: Array<{
    name: string;
    slug: string;
  }>;
  activePolicies: Array<{
    label: string;
    slug: string;
  }>;
  topicServices: Array<{
    name: string;
    slug: string;
  }>;

}

export interface IFilterOption {
  type?: "group" | "nested" | "select" | "date" | "checkbox";
  value: string;
  label?: string;
  items?: {
    value: string;
    label?: string;
    items?: { value: string; label?: string }[];
  }[];
}

export function mapper(
  response: ProfilesAPIResponse
): IFilterOption[] {
  const { profiles, activePolicies, topicServices } = response;
  const config: IFilterOption[] = [{
    type: "nested",
    value: "active_policie",
    label: "Política Ativa",
    items: activePolicies.map((policy) => ({
      value: policy.slug,
      label: policy.label,
    })),
  },
  {
    type: "nested",
    value: "profile",
    label: "Perfil",
    items: profiles.map((profile) => ({
      value: profile.slug,
      label: profile.name,
    })),
  },
  {
    type: "nested",
    value: "topic_services",
    label: "Tópicos de Serviço",
    items: topicServices.map((topic) => ({
      value: topic.slug,
      label: topic.name.trim(),
    })),
  }]
  return [
    ...config,
    /*{
      type: "date",
      value: "date",
      label: "Data",
    },*/
  ];
}
