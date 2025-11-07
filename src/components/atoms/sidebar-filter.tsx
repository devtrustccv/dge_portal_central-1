import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

interface IConfigItem {
    label: string;
    value: string;
}

interface IConfigGroup {
    items: IConfigItem[];
    label: string;
    value: string;
}

export interface IConfig {
    items: IConfigItem[] | IConfigGroup[];
    label: string;
    value: string;
}

export function SidebarFilter({
  data,
}: {
    data: IConfig[],
    initialFilters: any
}) {

    return (
        <Accordion type="multiple" className="hidden sm:block md:w-[200px] lg:flex lg:flex-col lg:w-[280px] h-auto">
            {data?.map((item, index) => (
                <AccordionItem key={index} value={item.label}>
                    <AccordionTrigger hasResponse={true} className="font-poppins font-medium text-[18px] text-[#334155] leading-[27px] tracking-[0]">
                        {item.label}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#616E85] font-poppins text-[16px] font-normal leading-normal capitalize">
                        {Array.isArray(item.items) && (
                            <div className="flex flex-col gap-y-4">
                                {item.items.map((option, optionIndex) => (
                                    <AccordionItem key={optionIndex} value={option.label}>
                                        {"items" in option ? (
                                            <div className="px-6 font-normal">
                                                <AccordionTrigger hasResponse={true} className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0px]">
                                                    {option.label}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {option.items.map((subOption, subIndex) => (
                                                        <div key={subIndex} className="flex items-center gap-4 px-6">
                                                            <input type="checkbox" title={subOption.label} />
                                                            <label className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0]">
                                                                {subOption.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </AccordionContent>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4 px-6">
                                                <input type="checkbox" title={option.label} />
                                                <label className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0]">
                                                    {option.label}
                                                </label>
                                            </div>
                                        )}
                                    </AccordionItem>
                                ))}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
