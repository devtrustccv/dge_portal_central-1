"use client";
import { IServiceNode } from "@/services/services/type";
import { IPageListaServicoData } from "@/services/page-list-service/type";
import ServiceList from "./ServiceList";
import { Banner } from "@/components/atoms/banner";
import { Pagination } from "@/components/molecules/PaginationBeta";
import { SearchCard } from "@/components/molecules/SearchCard";
import Link from "next/link";
import { ServiceItem } from "../ServicesDetailsTemplate/ServiceItem";
import { motion } from "framer-motion";
import { NoItemsFound } from "@/components/organisms/NotItemnsFound";
import { FilterOption, SidebarFilter } from "@/components/molecules/FiltersBeta";

interface ServiceListTemplateProps extends IPageListaServicoData {
  initialServices: {
    hits: any[];
    total: number;
    page: number;
    perPage: number;
  };
  searchParams: { [key: string]: string | string[] | undefined };
  highlightedServices: IServiceNode[];
  filtersConfigs: FilterOption[];
}

const ServiceListTemplate: React.FC<ServiceListTemplateProps> = ({
  title,
  subtitle,
  headerImage,
  initialServices,
  searchParams,
  description,
  highlightedServices,
  filtersConfigs
}) => {
  const isHighlightVisible = Object.keys(searchParams).length == 0
  const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'

  return (
    <div className="pb-32">
      <Banner title={title} subTitle={subtitle} image={imagem} />
      <div className="container">
        <div className="py-12 text-editor text-[#616E85]" dangerouslySetInnerHTML={{__html: description || ''}}/>
      </div>
      <section className="container mx-auto px-4">
        <div className="flex md:gap-x-12">
          <aside className="hidden lg:block w-[312px]">
            <div className="sticky top-[98px]">
              {filtersConfigs && <SidebarFilter
                data={filtersConfigs}
              />}
            </div>
          </aside>

          <div className="w-full lg:flex-1 flex flex-col gap-8">
              <SearchCard configs={filtersConfigs}/>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: isHighlightVisible ? 1 : 0, y: isHighlightVisible ? 0 : 50 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, duration: 0.3 }}
            >
              {isHighlightVisible && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-3xl text-main-black">Em destaque</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {highlightedServices?.map((service) => (
                      <Link href={`/servicos/${service?.slug}`} key={service?.slug}>
                        <ServiceItem {...service} style="bg-gray" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-6 mt-6">
              <h3 className="text-3xl text-main-black">Lista de Serviços Digitais</h3>
              {initialServices?.hits?.length > 0 ? (
                <>
                  <ServiceList services={initialServices?.hits || []} />

                  {initialServices?.total > initialServices?.perPage && (
                    <Pagination
                      searchParams={searchParams}
                      totalCountOfRegisters={initialServices?.total || 0}
                      currentPage={searchParams?.page ? Number(searchParams?.page) : initialServices?.page || 1}
                      registerPerPage={initialServices?.perPage}
                    />
                  )}
                </>
              ) : (
                <NoItemsFound title="Nenhum Serviço Encontrado" description="Tente pesquisar por outro termo" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceListTemplate;











