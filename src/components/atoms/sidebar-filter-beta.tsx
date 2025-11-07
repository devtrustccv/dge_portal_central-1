import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

export interface FilterItem {
    data: {
        value: string;
        label: string;
        options?: {
            title: string;
            subOption?: { value: string }[];
        }[];
    }[];
}

export function SidebarFilter({
    data
}: {
    data: FilterItem["data"]
}) {

    return (
        <Accordion type="multiple" className="md:w-[200px] lg:w-[280px] h-auto">
            {
                data?.map((item, index) => (
                    <AccordionItem key={index} value={item.label}>
                        <AccordionTrigger hasResponse={true} className="font-poppins font-medium text-[18px] text-[#334155] leading-[27px] tracking-[0]">
                            {item.label}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#616E85] font-poppins text-[16px] font-normal leading-normal capitalize">
                            {item.options && (
                                <div className="flex flex-col gap-y-4">
                                    {item.options.map((option, index) => (
                                        <AccordionItem key={index} value={option?.title}>
                                            {
                                                option?.subOption ? (
                                                    <div className="px-6 font-normal">
                                                        <AccordionTrigger hasResponse={true} className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0px]">
                                                            {option?.title}
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            {option?.subOption?.map((subOption, index) => (
                                                                <div key={index} className="flex items-center gap-4 px-6">
                                                                    <input type="checkbox" title={option?.title} />
                                                                    <label className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0]">
                                                                        {subOption?.value}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </AccordionContent>
                                                    </div>
                                                ) : (
                                                    <div key={index} className="flex items-center gap-4 px-6">
                                                        <input type="checkbox" title={option?.title} />
                                                        <label
                                                            className="font-poppins font-normal text-[16px] leading-[24px] tracking-[0]">
                                                            {option?.title}
                                                        </label>
                                                    </div>
                                                )
                                            }
                                        </AccordionItem>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }

        </Accordion>
    );
}