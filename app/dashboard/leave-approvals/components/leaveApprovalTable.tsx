"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Avatar, Badge } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function LeavesApprovalTables({datas, onEdit, onDelete, onDeactivate}:any) {
  const [scrolled, setScrolled] = useState(false)
  const rows = datas?.map((data: {
      comments: ReactNode;
      approval_status: string;
      leave: any;
    status: ReactNode;
    start_date: ReactNode;
    end_date: ReactNode;
    leave_type: ReactNode;
    employee: any;
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; };
}; 
}) => (
    <Table.Tr key={data?.id}>
      
      <Table.Td style={{ color: "#404044" }} >
        <EmployeeIcon 
          file_url={data?.employee?.file?.file_url}
          firstname={data?.employee?.firstname}
          lastname={data?.employee?.lastname}
        />
      </Table.Td>
      <Table.Td style={{ color: "#404044" }} >
        <EmployeeIcon 
          file_url={data?.leave?.employee?.file?.file_url}
          firstname={data?.leave?.employee?.firstname}
          lastname={data?.leave?.employee?.lastname}
        />
      </Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.leave?.leave_type}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.leave?.start_date}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.leave?.end_date}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>
      <Badge variant="light" color={data?.approval_status === "PENDING" ? "blue" : data?.approval_status === "ACCEPTED" ? "teal" : "red" } >
        {data?.approval_status}
      </Badge>
      </Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.comments}</Table.Td>
      {/* <Table.Td>
        <Menu shadow="md">
            <Menu.Target>
            <ActionIcon variant="transparent" color="gray" aria-label="Settings">
                <IconDotsVertical style={{ width: '70%', height: '70%' }}  stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item color="green" onClick={() => onEdit(data)} leftSection={<IconEye  style={{ width: rem(14), height: rem(14) }} /> }> View </Menu.Item>
              <Menu.Item color="red" onClick={() => onDelete(data)} leftSection={<IconTrash  style={{ width: rem(14), height: rem(14) }} /> }> Delete </Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </Table.Td> */}
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    
    <Table withRowBorders miw={700}>
      <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Approver </Table.Th>
          <Table.Th style={{ color: "#404044" }}> Employee </Table.Th>
          <Table.Th style={{ color: "#404044" }}>Leave type</Table.Th>
          <Table.Th style={{ color: "#404044" }}> From </Table.Th>
          <Table.Th style={{ color: "#404044" }}>To</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Status</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Comment</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}

interface visitor_icon{
  file_url: string,
  firstname: string,
  lastname: string
}

function EmployeeIcon({file_url, firstname, lastname}: visitor_icon){

  return(
    <>
      <div className="flex flex-row gap-3 items-center">
        <Avatar variant="filled" radius="xl" src={file_url} alt="no image here" />
        <div className='flex flex-col'>
          <p style={{fontSize: 'small', textTransform: 'uppercase'}}> {firstname} </p>
          <p style={{fontSize: 'small', textTransform: 'capitalize'}}> {lastname} </p>
        </div>
      </div>
    </>
  )
}