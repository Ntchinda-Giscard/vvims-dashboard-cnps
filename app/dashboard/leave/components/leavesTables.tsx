"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Avatar, Badge } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function LeavesTables({datas, onEdit, onDelete, onDeactivate}:any) {
  const [scrolled, setScrolled] = useState(false);
  function getDaysBetweenDates(date1Str: string | number | Date, date2Str: string | number | Date) {
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
  
    // Calculate the difference in milliseconds
    //@ts-ignore
    const diffInMs = date2 - date1;
  
    // Convert milliseconds to days
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    return diffInDays;
  }
  const rows = datas?.map((data: {
    comment: ReactNode;
    license: ReactNode;
    status: ReactNode;
    start_date: ReactNode;
    end_date: ReactNode;
    leave_type: ReactNode;
    employee: any;
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; 
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
      <Table.Td style={{ color: "#404044" }}>{data?.employee?.license}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.employee?.department?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.employee?.service?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.leave_type}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.comment}</Table.Td>
      
      <Table.Td style={{ color: "#404044" }}>{
        //@ts-ignore
      getDaysBetweenDates(data?.start_date, data?.end_date)}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.start_date}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.end_date}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>
      <Badge variant="light" color={data?.status === "PENDING" ? "blue" : data?.status === "ACCEPTED" ? "teal" : "red" } >
      {data?.status}
      </Badge>
      </Table.Td>
      <Table.Td>
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
        
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    
    <Table withRowBorders miw={700}>
      <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Employee </Table.Th>
          <Table.Th style={{ color: "#404044" }}> Registration number</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Department</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Service</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Reason</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Description</Table.Th>
          <Table.Th style={{ color: "#404044" }}> Delais </Table.Th>
          <Table.Th style={{ color: "#404044" }}>From</Table.Th>
          <Table.Th style={{ color: "#404044" }}>To</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Status</Table.Th>
          <Table.Th style={{ color: "#404044" }}></Table.Th>
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