"use client"
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../atoms/tabs";
import { Headline } from "../../atoms/headline";
import { MobileTabsAccordion } from "./MobileTabsAccordion"; //
import { ISectionVozKreMais } from "@/services/homepage/type";
import Link from "next/link";


interface CarrerTabsProps extends ISectionVozKreMais { }

export function CareerTabs({ questionarios_vos_kres, description }: CarrerTabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(questionarios_vos_kres.length > 0 ? questionarios_vos_kres[0]?.title : "");

  return (
    <section className="container mx-auto text-center py-16 md:py-20 3xl:py-[100px]">
      <Headline
        logo={{
          mobile: "/assets/logo-large.svg",
          desktop: "/assets/logo-small.svg",
        }}
        align="center"
        highlightType="gradient"
        description={description}
      />

      <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="mt-8 container max-w-[1286px] p-0">
        <MobileTabsAccordion
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          questionarios_vos_kres={questionarios_vos_kres}
        />
        <div className="border w-fit mx-auto rounded-full">
          <TabsList className="hidden md:flex  justify-center space-x-4 w-fit mx-auto p-1.5 rounded-full">
            {questionarios_vos_kres?.map((category, index) => (
              <TabsTrigger key={index} value={category?.title} className="inline-flex items-center justify-center hover:bg-[#F8FAFD] whitespace-nowrap rounded-full px-6 py-2 text-lg h-[46px] font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[linear-gradient(90deg,#61C3A8_0%,#0454A0_100%)] data-[state=active]:text-white">
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {questionarios_vos_kres?.map((category, index) => (
          <TabsContent key={index} value={category?.title} className="mt-8">
            <div className="flex flex-wrap md:justify-center gap-4">
              {category.Questionarios_Links?.map((question) => (
                <Link href={question.url || "#"} key={question.label} target={question.external_link ? "_blank" : "_self"}>
                  <button
                    key={question.label}
                    className="border text-left md:text-center border-[#BFC4CD] px-6 py-2 rounded-full hover:border-[#F8FAFD] hover:bg-[#F8FAFD] transition-all ease-in-out duration-300"
                  >
                    {question.label}
                  </button>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
