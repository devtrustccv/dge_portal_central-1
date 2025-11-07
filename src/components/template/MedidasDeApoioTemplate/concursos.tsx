import ConcursoList from "@/components/organisms/Concursos/concursoList";
import { IConcursoNode } from "@/services/concursos/types";
import Link from "next/link";

export default function ConcursosSection({
  data,
  concursos,
}: {
  data: any;
  concursos: IConcursoNode[];
}) {
  return (
    <section className="container flex flex-col gap-8 mt-32 mb-16">
      <div className="flex flex-col gap-y-4 md:flex-row justify-between">
        <p className="font-poppins font-medium text-[32px] md:text-[44px] leading-[42px] md:leading-[56px] text-[#334155]  tracking-[0%] ">
          {data?.title}
        </p>
        {data?.button?.url && (
          <Link href={data.button.url}>
            <p className="w-full md:w-[238px] h-[44px] rounded-[32px] bg-[#EFF2F5] font-normal text-[16px] text-[#334155] leading-[100%] tracking-[0%] capitalize flex a justify-center items-center">
              {data?.button?.label}
            </p>
          </Link>
        )}{" "}
      </div>
      <p className="font-poppins font-light text-[16px] leading-[28px] tracking-[1%]">
        {data?.description}
      </p>

      <div>
        <ConcursoList cols={3} concursos={concursos ?? []}></ConcursoList>
      </div>
    </section>
  );
}
