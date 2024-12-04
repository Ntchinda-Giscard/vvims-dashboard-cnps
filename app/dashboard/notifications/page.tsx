"use client"
import cx from "clsx";
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import {Box, Button, Divider, Group, Paper, ThemeIcon} from "@mantine/core";
import {Poppins} from "next/font/google";
import {useSelector} from "react-redux";
import {useMutation, useSubscription} from "@apollo/client";
import {GET_EVENT_NOTIF} from "@/app/dashboard/events/queries/event_notif";
import {ACCEPT_EVENT, DECLINE_EVENTS} from "@/app/dashboard/events/mutation/insert_events";
import {IconCalendar, IconUsers} from "@tabler/icons-react";
import Link from 'next/link';


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

const icons = {
    EVENTS: <IconCalendar style={{ width: '70%', height: '70%' }} />,
    VISITS: <IconUsers style={{ width: '70%', height: '70%' }} />
}

export default function Page(){

    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const {data: dataNotif} = useSubscription(GET_EVENT_NOTIF,{
        variables:{
            employee_id: userInfo?.employee?.id
        }
    });

    const [acceptEvents, {loading: acceptLoad}] = useMutation(ACCEPT_EVENT);
    const [declineEvent, {loading: declineLoad}] = useMutation(DECLINE_EVENTS);

    const acceptEventsPart = (id: any) =>{
        console.log('Accept notify', id)
        acceptEvents({
            variables:{
                id: id?.id
            }
        })
    }

    const declineEventsPart = (id: any) =>{
        console.log('Decline notify', id)
        declineEvent({
            variables:{
                id: id?.id
            }
        })
    }

    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);

        // Get components of the date
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate: string = date.toLocaleDateString('en-US', options); // e.g., "Nov 21, 2024"

        const hours: string = date.getHours().toString().padStart(2, '0');
        const minutes: string = date.getMinutes().toString().padStart(2, '0');

        return `${formattedDate} - ${hours}:${minutes}`;
    }

    function hasUnreadNotifications(employeeNotifications: any) {
        if(!employeeNotifications) return false
        return employeeNotifications?.filter((n: { type: string; }) => n?.type !== 'MESSAGES').some((notification: { is_read: boolean; }) => notification.is_read === false);
    }


    return(
        <>
            <main className="flex min-h-full flex-col gap-3">
                <p className={cx([classes.heading, font_heading.className])}> Notifications </p>
                <Paper
                    shadow={'md'}
                    radius={'md'}
                >
                    {
                        dataNotif?.employee_notifications?.filter((n: { type: string; }) => n?.type !== 'MESSAGES')?.map((n : any) =>(
                            <Box py={10} px={20} key={n?.id} >
                                <div className="flex flex-row gap-5">
                                    <ThemeIcon variant="light" radius="xl" size="lg">

                                        {
                                            // @ts-ignore
                                            icons[`${n?.type}`]
                                        }
                                    </ThemeIcon>
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="flex flex-col">
                                            { n?.type === 'EVENTS' ?
                                                <p className={classes.notif_title}> {`${n?.action}`} {`${n?.event?.employee?.firstname}`}
                                                    <span className={classes.notif_desc}> added you to</span> {`${n?.title}`}
                                                </p> :
                                                <p className={classes.notif_title}> {`${n?.action}`}
                                                    <span className={classes.notif_desc}>
                                                        <Link href={'/dashboard/visitors'}> {`${n?.message}`} </Link>
                                                         </span>
                                                </p>
                                            }
                                        </div>
                                        <div className='flex flex-row'>
                                            <p className={classes.notif_time}> {formatTimestamp(n?.created_at)} </p>
                                        </div>
                                        {
                                            n?.event?.event_participants?.[0]?.status !== 'PENDING' ?
                                                null :
                                                <Group>
                                                    <Button loading={acceptLoad} onClick={() => acceptEventsPart(n?.event?.event_participants?.[0])} variant="filled" color="blue" radius="md" size="xs" > Accept </Button>
                                                    <Button loading={declineLoad} onClick={() => declineEventsPart(n?.event?.event_participants?.[0])} variant="outline" color="blue" radius="md" size="xs" > Decline </Button>
                                                </Group>
                                        }
                                    </div>
                                </div>
                                <Divider my={'xs'} />
                            </Box>
                        ))
                    }
                </Paper>
            </main>
        </>
    )
}