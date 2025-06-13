"use client";
import { IconPencil, IconTrash, IconDownload, IconPrinter } from '@tabler/icons-react';
import { ActionIcon, Anchor, Avatar, Badge, Button, Group, rem, ScrollArea, Table, Text } from '@mantine/core';
import Link from "next/link"
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key, ReactPortal, useEffect, useRef, useState } from 'react';


const attendanceState: Record<string, string> = {
  present: 'blue',
  absent: 'red',
};


export function AttendanceReportsTable({datas}: any) {
  const [scrolled, setScrolled] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null);  // Create a ref to target the table
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
  useEffect(() =>{
    console.log( "Console data ====>", datas)
  }, [datas])

  function extractTime(isoString: string | null | undefined): string | null {
  if (!isoString) return null;

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null; // invalid date

  const hours: string = date.getHours().toString().padStart(2, '0');
  const minutes: string = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


  /**
 * Calculate duration between two times in "HH:mm" format.
 */
  function calculateDuration(startTime?: string, endTime?: string): string | null {
  if (!startTime || !endTime) return null;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (
    isNaN(startHour) || isNaN(startMinute) ||
    isNaN(endHour) || isNaN(endMinute)
  ) {
    return null;
  }

  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  let diff = (end.getTime() - start.getTime()) / (1000 * 60); // difference in minutes

  if (diff < 0) {
    diff += 24 * 60; // handle overnight duration
  }

  const hours = Math.floor(diff / 60);
  const minutes = Math.floor(diff % 60);

  return `${hours}h ${minutes}m`;
}

  



  const rows = datas.map((item: {
      status: any;
      reason: ReactNode;
      late: boolean | undefined;
      departure: string;
      arrival: string | null;
      date: ReactNode;
      employee: string;
    types: any;
    report_link: any;
    to_date: ReactNode;
    id: Key | null | undefined; name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; avatar: string | null | undefined; job: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; from_date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; phone: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
}) => (
    <Table.Tr key={item?.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} name={item?.employee} color='initials' radius={30} />
          <Text c={"#404040"} fz="sm" fw={500}>
            {item?.employee}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text c={"#404040"} fz='sm'>{item?.date}</Text>
      </Table.Td>
      <Table.Td>
        <Text c={"#404040"} fz='sm'>{extractTime(item?.arrival)}</Text>
      </Table.Td>
      <Table.Td>
        <Text c={"#404040"} fz='sm'>{extractTime(item?.departure)}</Text>
      </Table.Td>

      <Table.Td>
        <Text c={"#404040"} fz='sm'>{ 
        //@ts-ignore
        calculateDuration( extractTime(item?.arrival), extractTime(item?.departure)  )
        }</Text>
      </Table.Td>

      <Table.Td>
        <Text c={"#404040"} fz="sm">{item?.reason}</Text>
      </Table.Td>

      {/* <Table.Td>
        <Badge color={attendanceState[item?.status?.toLowerCase()]} variant="light">
          {item?.status}
        </Badge>
      </Table.Td>
      
      
      <Table.Td>
        <Badge color={ item?.late ? "red" : "blue" } variant="light">
          {item?.late ? "Late" : "On time"}
        </Badge>
      </Table.Td> */}
    </Table.Tr>
  ));

  return (
    <>
    <Button onClick={handlePrint} leftSection={<IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1} />}>
                  PDF
                </Button>
      <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

        <Table.ScrollContainer minWidth={800}>
        <div ref={tableRef}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th> <Text c="#404040"> Employee </Text> </Table.Th>
                <Table.Th> <Text c="#404040"> Date </Text> </Table.Th>
                <Table.Th> <Text c="#404040"> Arrival </Text> </Table.Th>
                <Table.Th> <Text c="#404040"> Departure </Text> </Table.Th>
                <Table.Th> <Text c="#404040"> Duration </Text> </Table.Th>
                <Table.Th> <Text c="#404040"> Reason </Text> </Table.Th>
                {/* <Table.Th> <Text c="#404040"> Status </Text> </Table.Th> */}
                {/* <Table.Th /> */}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
        </Table.ScrollContainer>
      </ScrollArea>
    </>
  );
}