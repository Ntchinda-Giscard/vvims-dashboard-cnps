"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Badge, Avatar } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck, IconDoorExit } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function VisitByVisitorTable({datas, onEdit, onCheckIn, onCheckOut, onView, onAccept, onReject, onDelete}:any) {
    const [scrolled, setScrolled] = useState(false)
    const dateConverter=(timeString: any) =>{
        if(timeString  === null) return '--:--'
        const [hour, minute] = timeString.split(':');

        // Convert to WAT (UTC+1)
        const watHour = (parseInt(hour) + 1) % 24; // Handle hour wrap-around

        // Return formatted WAT time
        return `${watHour.toString().padStart(2, '0')}:${minute}`;
    }


    const rows = datas?.map((data: any) => (
        <Table.Tr key={data?.id}>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }} >
                <VisitorIcon
                    file_url={data?.visitorByVisitor?.fileByPhoto?.file_url}
                    firstname={data?.visitorByVisitor?.firstname}
                    lastname={data?.visitorByVisitor?.lastname}
                />

            </Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{data?.visitorByVisitor?.phone_number}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{data?.department?.text_content?.content}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{data?.service?.text_content?.content}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{`${data?.employee?.firstname ? data?.employee?.firstname : '' }`+ " "+ `${data?.employee?.lastname ? data?.employee?.lastname:''}` }</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{data?.date}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize'}}>{ dateConverter(data?.check_in_at)}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{dateConverter(data?.check_out_at)}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>{data?.reason}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: 'capitalize' }}>
                <Badge variant="light" color={data?.visit_status?.status === 'PENDING' ? 'blue' : (data?.visit_status?.status === 'ACCEPTED' ? 'teal' : 'red')}>
                    {data?.visit_status?.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Menu shadow="md">
                    <Menu.Target>
                        <ActionIcon variant="transparent" color="gray" aria-label="Actions">
                            <IconDotsVertical style={{ width: '70%', height: '70%' }}  stroke={1.5} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color="green" onClick={() => onView(data)} leftSection={<IconEye  style={{ width: rem(14), height: rem(14) }} /> }> View </Menu.Item>
                        <Menu.Item color="blue" onClick={() => onEdit(data)} leftSection={<IconEdit  style={{ width: rem(14), height: rem(14) }} />}> Edit </Menu.Item>
                        <Menu.Item color="teal" onClick={() => onAccept(data)} leftSection={<IconUserCheck  style={{ width: rem(14), height: rem(14) }} />}> Accept </Menu.Item>
                        <Menu.Item color="orange" onClick={() => onReject(data)} leftSection={<IconUserX  style={{ width: rem(14), height: rem(14) }} />}> Reject </Menu.Item>

                        {data?.visit_status?.status === "ACCEPTED" ?
                            <Menu.Item color="purple" onClick={() => onCheckOut(data)} leftSection={<IconDoorExit  style={{ width: rem(14), height: rem(14) }} /> }> Checkout </Menu.Item> : null}
                        <Menu.Item color="red" onClick={() => onDelete(data)} leftSection={<IconTrash  style={{ width: rem(14), height: rem(14) }} />}> Delete </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>


            <Table withRowBorders miw={500}>
                <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                    <Table.Tr>
                        <Table.Th style={{ color: "#404044" }}> Visitor </Table.Th>
                        <Table.Th style={{ color: "#404044" }}> Phone </Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Department</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Service</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Employee</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Date</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Check in</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Check out</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Reason</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Status</Table.Th>
                        <Table.Th style={{ color: "#404044" }}>Actions</Table.Th>
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

function VisitorIcon({file_url, firstname, lastname}: visitor_icon){

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

