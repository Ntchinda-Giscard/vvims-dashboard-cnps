import { IconPencil, IconTrash, IconDownload } from '@tabler/icons-react';
import { ActionIcon, Anchor, Avatar, Badge, Group, Table, Text } from '@mantine/core';
import Link from "next/link"
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key, ReactPortal, useEffect } from 'react';


const jobColors: Record<string, string> = {
  attendance: 'blue',
  visits: 'cyan',
  task: 'pink',
};

export function ReportsTable({datas}: any) {

  useEffect(() =>{
    console.log( "Console data ====>", datas)
  }, [datas])
  const rows = datas.map((item: {
    types: any;
    report_link: any;
    to_date: ReactNode;
    id: Key | null | undefined; name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; avatar: string | null | undefined; job: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; from_date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; phone: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
}) => (
    <Table.Tr key={item?.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item?.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item?.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item?.types.toLowerCase()]} variant="light">
          {item?.types}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz='sm'>{item?.from_date}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item?.to_date}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon component={Link} href={`${item?.report_link}`} variant="subtle" color="gray">
            <IconDownload size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Report</Table.Th>
            <Table.Th>Job title</Table.Th>
            <Table.Th>From</Table.Th>
            <Table.Th>To</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}