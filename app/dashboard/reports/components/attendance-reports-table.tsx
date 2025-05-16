import { IconPencil, IconTrash, IconDownload, IconPrinter } from '@tabler/icons-react';
import { ActionIcon, Anchor, Avatar, Badge, Button, Group, rem, Table, Text } from '@mantine/core';
import Link from "next/link"
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key, ReactPortal, useEffect, useRef } from 'react';


const attendanceState: Record<string, string> = {
  present: 'blue',
  absent: 'cyan',
};


export function AttendanceReportsTable({datas}: any) {
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
  const rows = datas.map((item: {
      status: any;
      reason: ReactNode;
      late: boolean | undefined;
      departure: ReactNode;
      arrival: ReactNode;
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
        <Text c={"#404040"} fz='sm'>{item?.arrival}</Text>
      </Table.Td>
      <Table.Td>
        <Text c={"#404040"} fz='sm'>{item?.departure}</Text>
      </Table.Td>

      <Table.Td>
        <Text c={"#404040"} fz="sm">{item?.reason}</Text>
      </Table.Td>

      <Table.Td>
        <Badge color={attendanceState[item?.status?.toLowerCase()]} variant="light">
          {item?.status}
        </Badge>
      </Table.Td>
      
      
      <Table.Td>
        <Badge color={ item?.late ? "red" : "blue" } variant="light">
          {item?.late ? "Late" : "On time"}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    <Button onClick={handlePrint} leftSection={<IconPrinter style={{ width: rem(16), height: rem(16) }} stroke={1} />}>
                  PDF
                </Button>
      <Table.ScrollContainer minWidth={800}>
      <div ref={tableRef}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th> <Text c="#404040"> Employee </Text> </Table.Th>
              <Table.Th> <Text c="#404040"> Date </Text> </Table.Th>
              <Table.Th> <Text c="#404040"> Arrival </Text> </Table.Th>
              <Table.Th> <Text c="#404040"> Departure </Text> </Table.Th>
              <Table.Th> <Text c="#404040"> Reason </Text> </Table.Th>
              <Table.Th> <Text c="#404040"> Status </Text> </Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      </Table.ScrollContainer>
    </>
  );
}