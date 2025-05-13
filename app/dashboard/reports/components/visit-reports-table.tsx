import { IconPencil, IconTrash, IconDownload } from '@tabler/icons-react';
import { ActionIcon, Anchor, Avatar, Badge, Group, Table, Text } from '@mantine/core';
import Link from "next/link"
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key, ReactPortal, useEffect } from 'react';


const attendanceState: Record<string, string> = {
  accepted: 'teal',
  rejected: 'red',
  pending: 'blue'
};


export function VisitsReportsTable({datas}: any) {

  useEffect(() =>{
    console.log( "Console data ====>", datas)
  }, [datas])

  function extractTime(isoString: string): string {
    const date = new Date(isoString);
    const hours: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const rows = datas.map((item: {
      checkOut: string;
      checkIn: string;
      visitorName: string | undefined;
      status: any;
      reason: ReactNode;
      late: boolean | undefined;
      departure: ReactNode;
      arrival: ReactNode;
      date: ReactNode;
      employee: ReactNode;
    types: any;
    report_link: any;
    to_date: ReactNode;
    id: Key | null | undefined; name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; avatar: string | null | undefined; job: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; from_date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; phone: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
}) => (
    <Table.Tr key={item?.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item?.visitorName}  name={item?.visitorName} color='initials' radius={30} />
          <Text fz="sm" fw={500}>
            {item?.visitorName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz='sm'>{item?.date}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz='sm'>{extractTime(item?.checkIn)}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz='sm'>{extractTime(item?.checkOut)}</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item?.reason}</Text>
      </Table.Td>

      <Table.Td>
        <Badge color={attendanceState[item?.status?.toLowerCase()]} variant="light">
          {item?.status}
        </Badge>
      </Table.Td>
      
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Visitor</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>checkIn</Table.Th>
            <Table.Th>checkOut</Table.Th>
            <Table.Th>Reason</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}