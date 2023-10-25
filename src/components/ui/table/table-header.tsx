import { Table } from "@tanstack/react-table"
import { Connection } from "lib/types"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"

export const TableHeader = <T extends Connection>({ table }: { table: Table<T> }) => {
    return (
        <thead>
            <tr className='bg-blue-50'>
                {table.getHeaderGroups().map(headerGroups => (
                    <>
                        {headerGroups.headers.map(header => (
                            <th className='font-normal text-left text-sm p-3 px-4 text-gray-600' key={header.id}>
                                <div className='flex items-center gap-2'>
                                    {header.column.columnDef.header as ReactNode}
                                    <ArrowUpDown className='h-4 w-4' />
                                </div>
                            </th>
                        ))}
                    </>
                ))}
                <th className='font-normal text-left text-sm p-3 px-4 text-gray-600'>
                    Actions
                </th>
            </tr>
        </thead>
    )
}
