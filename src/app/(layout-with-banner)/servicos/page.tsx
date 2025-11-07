export const dynamic = "force-dynamic";
import ServiceListTemplate from '@/components/template/ServicesListTemplate';
import { getPageListService } from '@/services/page-list-service/getPageListService';
import { getAllServices } from '@/services/services/getAllServices';
import { getFiltersOptions } from '@/services/services/getFiltersOptions';
import { getServicesByMeiliSearch } from '@/services/services/getServicesByMeiliSearch';
import { notFound } from 'next/navigation';

export default async function Servicos({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const params = await searchParams;

    const page = params?.page ? Number(params.page) || 1 : 1;
    const searchQuery = String(params?.search || '');

    const active_policie = params?.active_policie
      ? String(params.active_policie)
      : undefined;

    const profile = params?.profile ? String(params.profile) : undefined;

    const topic_services = params?.topic_services
      ? String(params.topic_services)
      : undefined;

    const filterObject = {
      active_policie,
      profile,
      topic_services,
    };

    const [data, servicesByMeili, highlightedServices, filtersConfig] =
      await Promise.all([
        getPageListService(),
        getServicesByMeiliSearch({
          search: searchQuery,
          page,
          perPage: 21,
          filterObject,
        }),
        getAllServices({}, { page: 1, pageSize: 3 }),
        getFiltersOptions(),
      ]);

    if (!data) return notFound();
    return (
      <ServiceListTemplate
        highlightedServices={highlightedServices?.nodes || []}
        {...data}
        initialServices={servicesByMeili}
        searchParams={params || {}}
        filtersConfigs={filtersConfig || []}
      />
    );
  } catch (error) {
    console.error('Error to get service:', error);
    return notFound();
  }
}
