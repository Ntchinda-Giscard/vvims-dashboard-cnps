"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Badge, Button,  } from '@mantine/core';
import { IconUserX, IconUserCheck, IconPrinter, IconCheck, IconX } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect, useRef } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function ViewAttendanceTable({datas, onEdit, onDelete, onDeactivate}:any) {
  const [scrolled, setScrolled] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null);  // Create a ref to target the table

  useEffect(()=> {
    console.log("Days", datas?.[0])
  }, [datas]);

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
      attendance_status: any;
      days: any;
    clock_out_time: ReactNode;
    clock_in_time: ReactNode;
    attendance_state: any;
    clock_in_date: ReactNode;
    employee: any;
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; };
}; 
}) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044" }} >{ `${data?.firstname}`}</Table.Td>
      {/* <> */}
        {
            data?.attendance_status.map((d: any) =>(
                <Table.Td key={d?.id} style={{ color: "#404044" }} >
                    { d=== -1 ? <IconX key={d?.id} style={{width: rem(10), height: rem(10)}} color="red" /> :(d===1 ? <IconCheck style={{width: rem(10), height: rem(10)}} key={d?.id}  color="lime" /> : "-") }
                </Table.Td>
            ))
        }
      {/* </> */}

    </Table.Tr>
  ));

  return (
    <>
    <Button onClick={handlePrint} leftSection={<IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1} />}>
        PDF
      </Button>
      <ScrollArea h={300} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    <div ref={tableRef}>
      <Table withRowBorders miw={700}>
        <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
          <Table.Tr>
            <Table.Th style={{ color: "#404044" }}> Name </Table.Th>
              {
                  datas?.[0]?.days?.map((d: any) =>(
                    <Table.Th key={d?.id} style={{ color: "#404044" }}> {d} </Table.Th>
                      
                  ))
              }
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      </div>
      </ScrollArea>
    </>
  );
}

