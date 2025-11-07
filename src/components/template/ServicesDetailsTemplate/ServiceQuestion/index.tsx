import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/atoms/accordion"
import { IServiceQuestion } from '@/services/services/type'
interface ServiceQuestionProps {
    questions: IServiceQuestion[]
}
export function ServiceQuestion({ questions }: ServiceQuestionProps
) {
    return (
        <div>
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                {questions?.map((item, index) => {
                    const hasResponse = !!item?.response?.trim();
                    return (
                        <AccordionItem key={index} value={"item - " + index} display="custom">
                            <AccordionTrigger hasResponse={hasResponse} className="font-medium text-[#334155]">
                                {item?.question}
                            </AccordionTrigger>
                            {hasResponse && (
                                <AccordionContent>
                                    <div
                                        className="text-editor text-[#616E85]"
                                        dangerouslySetInnerHTML={{ __html: item?.response || "" }}
                                    />
                                </AccordionContent>
                            )}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    )
}
