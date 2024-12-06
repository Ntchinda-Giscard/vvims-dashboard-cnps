"use client"
import { ActionIcon, Table } from '@mantine/core';
import { IconAdjustments, IconTrash, IconEdit } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
export default function AgencyTable({datas, onEdit, onDelete}:any) {
  const rows = datas?.map((data: { id: Key | null | undefined; region: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; city: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; neighborhood: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; office: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044" }} >{data?.region}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.city}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.neighborhood}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.office}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.phone_number}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => onEdit(data)} variant="transparent" color="green" aria-label="Settings">
          <IconEdit style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        <ActionIcon  onClick={() => onDelete(data)} variant="transparent" color="red" aria-label="Settings">
          <IconTrash style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Region</Table.Th>
          <Table.Th style={{ color: "#404044" }}> City </Table.Th>
          <Table.Th style={{ color: "#404044" }}>Neighborhood</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Office</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Phone Number</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

