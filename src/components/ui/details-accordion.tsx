import { BarChart4, HeartHandshake, PieChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

export function DetailsAccordion() {
    return (
        <Accordion type='single' collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <HeartHandshake />
                        <span>
                            How did you meet?
                        </span>
                    </div>
                </AccordionTrigger>

                <AccordionContent>
                    We met at a party last week.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <BarChart4 />
                        <span>What value can you give them?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    I can help them scale their business, since they have a youtube channel. I can help them share their content whenever
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3 border-b-none">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <PieChart />
                        <span>What value can they give you?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}