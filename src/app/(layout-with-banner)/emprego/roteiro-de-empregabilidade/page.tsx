import { notFound } from "next/navigation";
import { getPageRoteiroDeEmpregabilidade } from "@/services/page-roteiro-empregabilidade/getPage";
import { Banner } from "@/components/atoms/banner";
import Image from "next/image";
import SoftSkillsCarousel from "@/components/template/RoteiroDeEmpregabilidadeTemplates/SoftSkillsSection";

export default async function PageRoteiroDeEmpregabilidade() {
  try {
    const data = await getPageRoteiroDeEmpregabilidade();
    if (!data) return notFound();

    const {
      title,
      description,
      headerImage,
      subtitle,
      caroucel,
      cards,
      soft_skills_info,
    } = data;

    return (
      <div className="">
        <Banner title={subtitle} subTitle={title} image={headerImage?.url} />
        <div className="container">
          <div
              className="text-[#616E85] py-12 text-editor"
              dangerouslySetInnerHTML={{__html: description || ""}}
          />
        </div>

        <section className="container mx-auto px-4 mb-36">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] mt-10">
            {cards?.map((item, index) => (
              <a
                href={item.url}
                key={index}
                className="flex flex-col space-y-6 items-center p-[30px] lg:p-[60px]  text-center border rounded-xl shadow-sm hover:shadow-lg transition bg-white"
              >
                <Image
                  src={item.logo?.url ?? ""}
                  width={100}
                  height={100}
                  alt={item.name ?? ""}
                  className="object-fit"
                  sizes="100px"
                />
                <p className="font-[400] text-[#334155] leading-[28px] uppercase text-[18px]">
                  {item.name}
                </p>
              
              </a>
            ))}
          </div>
        </section>

        {soft_skills_info?.title && (
          <div className="bg-[#F8FAFC] py-20 lg:py-[160px]">
            <SoftSkillsCarousel info={soft_skills_info} items={caroucel??[]}/>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}
