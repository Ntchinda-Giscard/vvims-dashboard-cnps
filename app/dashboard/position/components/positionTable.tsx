"use client"
import { ActionIcon, Table } from '@mantine/core';
import { IconAdjustments, IconTrash, IconEdit } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
export default function PositionTable({datas}:any) {
  const rows = datas?.map((data: { id: Key | null | undefined; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; level: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; employees_aggregate: { aggregate: { count: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; }) => (
    <Table.Tr key={data?.id}>
      <Table.Td>{data?.text_content?.content}</Table.Td>
      <Table.Td>{data?.level}</Table.Td>
      <Table.Td>{data?.employees_aggregate?.aggregate?.count}</Table.Td>
      <Table.Td>
        <ActionIcon variant="transparent" color="green" aria-label="Settings">
          <IconEdit style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="transparent" color="red" aria-label="Settings">
          <IconTrash style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th> Position</Table.Th>
          <Table.Th> Level </Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}




{/* <ActionIcon variant="transparent" color="red" aria-label="Settings">
            <IconTrash style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="transparent" color="green" aria-label="Settings">
            <IconEdit style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon> */}