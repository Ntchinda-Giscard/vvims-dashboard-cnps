"use client"
import { ActionIcon, Badge, Table, rem } from '@mantine/core';
import { IconAdjustments, IconTrash, IconEdit, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];
export default function DeparmentTable({datas, onEdit, onDelete, onDeactivate, onActivate}:any) {
  const rows = datas?.map((data: any) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044" }}>{data?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.services_aggregate?.aggregate?.count}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.employees_aggregate?.aggregate?.count}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.department?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>
      <Badge variant="light" 
      color= { data?.status === "ACTIVE" ? "teal" : data?.status === "INACTIVE" ? "red" : "" }
      size="lg" radius="md">{data?.status}</Badge>
        
      </Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => onEdit(data)} variant="transparent" color="green" aria-label="Edit">
          <IconEdit style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        {
          data?.status === "ACTIVE" ?
          <ActionIcon  onClick={() => onActivate(data)} variant="transparent" color="orange" aria-label="Deactivate">
            <IconUserX  style={{ width: '70%', height: '70%' }}  stroke={1.5} />
          </ActionIcon> : data?.status === "INACTIVE" ? 
          <ActionIcon  onClick={() => onDeactivate(data)} variant="transparent" color="blue" aria-label="Deactivate">
          <IconUserCheck  style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon> : null
        }
        <ActionIcon  onClick={() => onDelete(data)} variant="transparent" color="red" aria-label="Delete">
          <IconTrash style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Name </Table.Th>
          <Table.Th style={{ color: "#404044" }}> No. Service </Table.Th>
          <Table.Th style={{ color: "#404044" }}>No. Employees</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Supervising Dept.</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Status</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

