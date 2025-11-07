import { IServiceNode } from "@/services/services/type";
import { CardContent } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { Separator } from "@/components/atoms/separator";

interface ServicesListProps {
  services: IServiceNode[];
}

export function ServicesRelated({ services }: ServicesListProps) {
  return (
    <section className="container pt-8 pb-16 ">
      <Separator />
      <div className="flex justify-between md:items-center my-8">
        <h2 className="font-poppins font-medium text-3xl md:text-[2.5rem] text-main-black">
          Serviços Relacionados
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((item, index) => (
          <CardContent className="bg-[#F8FAFC] rounded-[16px] p-6 h-full flex flex-col justify-between" key={index}>
            <p className="font-poppins font-light text-[16px] leading-[28px] tracking-[0%]">
              {item?.title}
            </p>
            <Link href={`/servicos/${item?.slug}`} className="flex justify-end">
              <Button
                className="w-[96px] h-[28px] bg-[#0454A01A] mt-2 rounded-[8px] gap-[10px] text-[#0454A0] font-poppins font-semibold text-[12px] leading-[30px] tracking-[0%] hover:text-white"
              >
                Ver Mais
              </Button>
            </Link>
          </CardContent>
        ))}
      </div>
    </section>
  );
}
