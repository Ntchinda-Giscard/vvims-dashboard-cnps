
"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Badge, Avatar } from '@mantine/core';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";


export default function TaskTable({datas, onEdit, onAddTask, onDelete, onSee}:any) {

    const [scrolled, setScrolled] = useState(false)
    const rows = datas?.map((data:   any) => (
        <Table.Tr key={data?.id}>
            <Table.Td style={{ color: "#404044", textTransform: "capitalize"}} >{ `${data?.title}`}</Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>
                { <VisitorIcon
                    firstname={data?.employee?.firstname}
                    lastname={data?.employee?.lastname}
                    file_url={data?.employee?.file?.file_url}
                /> }
            </Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>
                { <VisitorIcon
                    firstname={data?.employeeByAssignedTo?.firstname}
                    lastname={data?.employeeByAssignedTo?.lastname}
                    file_url={data?.employee?.file?.file_url}
                /> }
            </Table.Td>
            <Table.Td style={{ color: "#404044", textTransform: "capitalize"}} >{data?.description}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>


            <Table withRowBorders miw={700}>
                <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                    <Table.Tr>
                        <Table.Th style={{ color: "#404044" }}> Task </Table.Th>
                        <Table.Th style={{ color: "#404044" }}> Assign by </Table.Th>
                        <Table.Th style={{ color: "#404044" }}> Assign to </Table.Th>
                        <Table.Th style={{ color: "#404044" }}> Description </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}

function Paticipants({participants}: any){

    return(
        <>
            <Avatar.Group>
                {
                    participants.slice(0, 3).map((p: { employee: {
                            file: any; firstname: any; lastname: any;
                        }; file: { file_url: string | null | undefined; }; }) => (
                        <Avatar key={p?.employee.lastname} color="initials" size="sm" name={`${p?.employee?.firstname} ${p?.employee?.lastname}`} src={p?.employee?.file?.file_url} />
                    ))
                }

                { participants.length > 3 ?

                    <Avatar size="sm"> {`+${participants.length-3}`} </Avatar> : null
                }
            </Avatar.Group>
        </>
    )
}

function VisitorIcon({file_url, firstname, lastname}: any){

    return(
        <>
            <div className="flex flex-row gap-3 items-center">
                <Avatar variant="filled" color={'initials'} name={`${firstname} ${lastname}`} size={'sm'} radius="xl" src={file_url} alt="no image here" />
                <div className='flex flex-col'>
                    <p style={{fontSize: 'x-small', textTransform: 'uppercase'}}> {firstname} </p>
                    <p style={{fontSize: 'x-small', textTransform: 'capitalize'}}> {lastname} </p>
                </div>
            </div>
        </>
    )
}