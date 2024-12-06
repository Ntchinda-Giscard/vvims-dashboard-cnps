"use client"
import { ActionIcon, Table } from '@mantine/core';
import { IconAdjustments, IconTrash, IconEdit } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';



export default function AgencyTable({datas, onEdit, onDelete}:any) {
  const rows = datas?.map((data: any) => (
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

