"use client"
import {Button, rem, ScrollArea, Table} from '@mantine/core';
import {IconCheck, IconPrinter, IconX} from '@tabler/icons-react';
import {Key, ReactNode, useRef, useState} from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function AttendanceTable({ datas, onEdit, onDelete, onDeactivate }: any) {
    const [scrolled, setScrolled] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);  // Create a ref to target the table

    const time_extract = (datetime: any) => {
        if (datetime === null) {
            return "--:--:--";
        }
        const date = new Date(datetime);
        const options = { timezone: 'Africa/Douala', hour12: false };
        return date.toLocaleTimeString('en-US', options);
    };

    const handlePrint = () => {
        const printContents = tableRef.current?.innerHTML;  // Get the table content
        const originalContents = document.body.innerHTML;   // Save the original page content

        if (printContents) {
            document.body.innerHTML = printContents;          // Replace body with table content
            window.print();                                   // Trigger print dialog
            document.body.innerHTML = originalContents;       // Restore original content
            window.location.reload();                         // Reload page to reset state
        }
    };

    const rows = datas?.map((data: {
        clock_out_time: ReactNode;
        clock_in_time: ReactNode;
        attendance_state: any;
        clock_in_date: ReactNode;
        employee: any;
        function: ReactNode;
        firstname: any;
        lastname: any;
        id: Key | null | undefined;
        region: any;
        department: { text_content: { content: ReactNode } };
        service: { text_content: { content: ReactNode } };
        phone_number: ReactNode;
        position: {
            function: ReactNode;
            text_content: { content: ReactNode };
        };
    }) => (
        <Table.Tr key={data?.id}>
            <Table.Td style={{ color: "#404044" }}>{`${data?.employee?.firstname}` + " " + `${data?.employee?.lastname}`}</Table.Td>
            <Table.Td style={{ color: "#404044" }}>{data?.employee?.department?.text_content?.content}</Table.Td>
            <Table.Td style={{ color: "#404044" }}>{data?.employee?.service?.text_content?.content}</Table.Td>
            <Table.Td style={{ color: "#404044" }}>{data?.clock_in_date}</Table.Td>
            <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clock_in_time)}</Table.Td>
            <Table.Td style={{ color: "#404044" }}>
                {data?.attendance_state?.is_late ? (
                    <IconX key={data?.id} style={{width: rem(10), height: rem(10)}} color="red" />
                ) : (
                    <IconCheck style={{width: rem(10), height: rem(10)}} key={data?.id}  color="lime" />
                )}
            </Table.Td>
            <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clock_out_time)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Button onClick={handlePrint} leftSection={<IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1} />}>
                PDF
            </Button>

            <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                {/* Ref target for printing */}
                <div ref={tableRef}>
                    <Table withRowBorders miw={700}>
                        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                            <Table.Tr>
                                <Table.Th style={{ color: "#404044" }}> Name </Table.Th>
                                <Table.Th style={{ color: "#404044" }}>Department</Table.Th>
                                <Table.Th style={{ color: "#404044" }}>Service</Table.Th>
                                <Table.Th style={{ color: "#404044" }}>Date</Table.Th>
                                <Table.Th style={{ color: "#404044" }}>Clock in time</Table.Th>
                                <Table.Th style={{ color: "#404044" }}></Table.Th>
                                <Table.Th style={{ color: "#404044" }}>Clock out time</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div>
            </ScrollArea>
        </>
    );
}