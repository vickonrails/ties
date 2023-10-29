import { BarChart4, HeartHandshake, PieChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Connection } from "lib/types";

export function DetailsAccordion({ connection }: { connection: Connection }) {
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

                <AccordionContent className="text-muted-foreground">
                    {connection.origin_context ?? '-'}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <BarChart4 />
                        <span>What value can you give them?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    {connection.value_to_them ?? '-'}
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3 border-b-none">
                <AccordionTrigger>
                    <div className='flex justify-start gap-2'>
                        <PieChart />
                        <span>What value can they give you?</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    {connection.value_to_me ?? '-'}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}