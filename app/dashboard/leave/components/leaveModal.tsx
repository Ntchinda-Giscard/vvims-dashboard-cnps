"use client"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Avatar, Paper, Divider, rem, Badge, Group, Button, Dialog, TextInput, Text } from "@mantine/core"
import classes from "@/app/dashboard/leave/components/styles.module.css";
import {useEffect, useState} from "react"
import { IconPlus, IconCalendar } from "@tabler/icons-react";
import cx from 'clsx';
import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_LEAVE, REJECT_LEAVE } from "../mutation/mutations";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { GET_LEAVES_APPROVAL_STATUS } from '../queries/queries';

export default function LeaveModal({opened, close, leave}: any){
    const user = useSelector((state: any) => state.auth.userInfo);
    const [acceptLeave, {loading:loadAccept}] = useMutation(ACCEPT_LEAVE);
    const [declineLeave, {loading:loadDecline}] = useMutation(REJECT_LEAVE);
    const {data, loading, error} = useQuery(GET_LEAVES_APPROVAL_STATUS, {
        variables:{
            leave_id: leave?.id
        }
    });

    useEffect(() =>{
        console.log("Leave modal")
        console.log("Leaves :", leave)
        console.log("Le :", data?.leave_approval)
    }, [leave, data])

    function getMonthAbbreviation(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    }

    function getDayNumber(dateString: any) {
        const date = new Date(dateString);
        const day = date.getDate(); // Extracts the day number (1-31)
        return day.toString().padStart(2, '0'); // Pads with '0' if needed
    }

    function getDayOfWeek(dateString: any) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    }

    function getDaysDifference(startDate:any, endDate: any) {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        // Calculate the difference in milliseconds
        //@ts-ignore
        const diffInMs = end - start;
      
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
        return Math.abs(diffInDays); // Return the absolute value to avoid negative days
    }

    const [openedDialog, { toggle, close: closeDialog , open}] = useDisclosure(false);
    const [value, setValue] = useState('');


    const handleAccept = () =>{
        acceptLeave({
            variables:{
                id: leave?.id,
                approver_id: user?.employee?.id
            },
            onCompleted: () =>{
                toast.success("Leave accepted");
                close()
            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })
    }

    const handleReject = () =>{
        
        declineLeave({
            variables:{
                id: leave?.id,
                approver_id: user?.employee?.id,
                comments: value
            },
            onCompleted: () =>{
                toast.success("Leave rejected");
                toggle();
                close();
                setValue('');
            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })

    }

    return(
        <>
            <Modal
                size="sm"
                withCloseButton={false}
                opened={opened} 
                onClose={close}
                styles={{
                    header:{
                        padding: 10,
                        background: "#EEEEEE"
                    },
                    body:{
                        padding: 0
                    }
                }}
            >
                <Modal.Header>
                    <div className="flex w-full items-center flex-row justify-between">
                        <div className="flex flex-row gap-2 ">
                            <Avatar src={leave?.employee?.file?.file_url} radius="xl" size="md" />
                            <div className="flex flex-col gap-0">
                                <p className={classes.name}> {leave?.employee?.firstname} </p>
                                <p className={classes.function}> {leave?.employee?.function} </p>
                            </div>
                        </div>
                        {
                            data?.leave_approval?.[0]?.approval_status === "PENDING" ?  
                            null :
                            <Badge variant="light" color={ data?.leave_approval?.[0]?.approval_status === "REJECTED" ? "red" : "" } >
                                {data?.leave_approval?.[0]?.approval_status}
                            </Badge> 
                        }
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex flex-row w-full mt-5 justify-center  items-center gap-5">
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> {getMonthAbbreviation(leave?.start_date)} </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `} >
                                    <p className={classes.day}>{getDayNumber(leave?.start_date)}</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> {getDayOfWeek(leave?.start_date)} </p>
                            </div>
                            <div className={"flex flex-col"}>
                                <Divider my={5} color={'black'} size="sm" variant="dashed" />
                                <p className={classes.numberDays}> 
                                    {`${getDaysDifference(leave?.start_date, leave?.end_date) } days` }
                                </p>
                            </div>
                            <div className="flex flex-col items-center" >
                                <p className={classes.month}> {getMonthAbbreviation(leave?.end_date)} </p>
                                <div className= {`flex py-1 px-1 flex-row gap-2 items-center ${classes.boders} `}>
                                    <p className={classes.day}>{getDayNumber(leave?.end_date)}</p>
                                    <IconCalendar style={{ width: rem(16), height: rem(16) }} />
                                </div>
                                <p className={classes.numberDays}> {getDayOfWeek(leave?.end_date)} </p>
                            </div>
                        </div>
                        <div className={classes.commentBox}>
                            <div className={classes.leaveType}> 
                                <p className={classes.type}> {`${leave?.leave_type} leave`} </p>
                            </div>
                            <p className={classes.comment}> {leave?.comment} </p>
                        </div>
                    </div>
                    {
                        data?.leave_approval?.[0]?.approval_status === "REJECTED" ?
                        <div className="mt-1 pl-2 pr-2 flex flex-col gap-2">
                            <p style={{fontSize: 'small'}}>Reason: </p>
                            <em style={{fontSize: 'smaller', lineHeight: 1.6}}>
                                {data?.leave_approval?.[0]?.comments}
                            </em>
                        </div> : null
                    }
                    <Group grow mt={"md"} px={15} py={15}>
                        <Button 
                            disabled={data?.leave_approval?.[0]?.approval_status === "ACCEPTED"}
                            onClick={handleAccept} loading={loadAccept} color="#16DBCC"  radius="md">Accept</Button>
                        <Button
                            disabled={data?.leave_approval?.[0]?.approval_status === "REJECTED"}
                            onClick={open}
                            loading={loadDecline} color="red"  radius="md">Reject</Button>
                    </Group>

                    
                </Modal.Body>
            {/* Modal content */}
            <Dialog position={{ top: 20, left: "30%"}} opened={openedDialog} withCloseButton onClose={closeDialog} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Reason for refusal
        </Text>

        <Group align="flex-end">
          <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={handleReject}>Save</Button>
        </Group>
      </Dialog>
            </Modal>
        </>
    )
}