"use client"
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import styles from "@/app/dashboard/components/css/MyCalendar.module.css";
import { useQuery } from "@apollo/client";
import { Paper, Divider, Space, Box, Avatar, darken, lighten } from "@mantine/core";
import {DatePicker, DatePickerProps, Calendar} from "@mantine/dates"
import { GET_EVENT_CARD } from "../query/get_percent";
import NoDataComponent from "./nodataComponent";
import { useEffect, useState } from "react";
import { IconChevronRight, IconClock } from "@tabler/icons-react";
import Link from "next/link";
import {useSelector} from "react-redux";

var randomColor = require('randomcolor');

function NewEvents() {
    const [value, setValue] = useState<Date>(new Date())
    const user = useSelector((state: any) => state.auth.userInfo);

    function formatDateToYYYYMMDD(date: Date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    const {data, loading, error} = useQuery(GET_EVENT_CARD, {
        variables:{
            date: formatDateToYYYYMMDD(value),
            employeeId: user?.employee?.id
        }
    });

    const getDayProps: DatePickerProps['getDayProps'] = (date) => {
        if (date.getDay() === new Date().getDay() && date.getDate() === new Date().getDate()) {
          return {
            style: {
              backgroundColor: '#fff020',
              color: 'var(--mantine-color-white)',
              borderRadius: 30,
            },
          };
        }


            if (date.getDay() === value?.getDay() && date.getDate() === value?.getDate()) {
                return {
                  style: {
                    backgroundColor: '#007fff',
                    color: 'var(--mantine-color-white)',
                    borderRadius: 30,
                  },
                };
            }

      
        return {};
      };
      
      const getYearControlProps: DatePickerProps['getYearControlProps'] = (date) => {
        if (date.getFullYear() === new Date().getFullYear()) {
          return {
            style: {
              color: 'var(--mantine-color-blue-filled)',
              fontWeight: 700,
            },
          };
        }
      
        if (date.getFullYear() === new Date().getFullYear() + 1) {
          return { disabled: true };
        }
      
        return {};
      };
      
      const getMonthControlProps: DatePickerProps['getMonthControlProps'] = (date) => {
        // if (date.getMonth() === 1) {
          return {
            style: {
              color: 'var(--mantine-color-blue-filled)',
              fontWeight: 700,
            },
          };
        // }
      
        // if (date.getMonth() === 5) {
        //   return { disabled: true };
        // }
      
        // return {};
      };
      
    useEffect(() =>{
        console.log("Event data ===>", data)
    },[data])
    var color = randomColor();
    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <p className={classes.taskEventTitle}> Task and Events </p>
                <div className="flex flex-row items-center">
                    <Link href={"/dashboard/events"} style={{fontSize: 12, color: "blue", fontWeight: 300}}> view all </Link>
                    <IconChevronRight stroke={1} style={{width: 10, height: 10, color: "blue"}} />
                </div>
            </div>
                <>
                    <div className="w-full flex justify-center">
                        <DatePicker
                            // type={"multiple"}
                            // value={value}
                            // size={'xs'}
                            // w={"100%"}
                            //@ts-ignore
                            onChange={setValue}
                            defaultDate={new Date()}
                            getDayProps={getDayProps}
                            getYearControlProps={getYearControlProps}
                            getMonthControlProps={getMonthControlProps}
                            styles={{
                                calendarHeader: {
                                    color: "#000"
                                },
                                calendarHeaderControl: {
                                    color: "#000"
                                },
                                day:{
                                    fontSize: 'small'
                                }
                            }}
                        />

                    </div>
                    <Space h="md" />
                    {
                        data?.getEventsByUser?.length >= 1 && !error ?
                        <>
                            {
                                data?.getEventsByUser?.map((e: any) => (
                                    <EventCard
                                        key={e?.description}
                                        title={e?.event?.title}
                                        st={e?.event?.startTime}
                                        et={e?.event?.endTime}
                                        color={randomColor()}
                                        participant={e?.participant}
                                    />
                                ))
                            }

                        </>

                 :
                <NoDataComponent button_msg={"Add event"} link={"/dashboard/events"} comment="No event have been created yet. Click the button bellow to add new events." />
                }
                </>
        </>
    );
}

export default NewEvents;


function EventCard({color, st, et, title, participant}: any){

    return(
        <>
            <div className="flex flex-col">
                <Divider my="xs" label={st?.slice(0, 5)} labelPosition="left" />
                <div className="flex flex-row">
                    <Box w={30}></Box>
                    <Box p="md" bg={lighten(`${color}`, 0.8)} className={classes.eventCard} w="100%" >
                        <div className="flex flex-col">
                            <span className={classes.eventTitleSpan} style={{ borderLeft: `solid 3px ${darken(`${color}`, 0.5)}` }} >
                                {title}
                            </span>
                            <div className="flex flex-row gap-2 mt-2  mb-2 items-center">
                                <IconClock color="#404040" stroke={1} width={15} height={15} />
                                <p className={classes.eventTime}> {`${st?.slice(0, 5)}-${et?.slice(0, 5)}`} </p>
                            </div>

                            <Avatar.Group>
                                {
                                    participant.slice(0, 3)?.map((p: { firstname: any; lastname: any; }) => (
                                        <Avatar key={p?.firstname} color="initials" size="sm" name= {`${p?.firstname} ${p?.lastname}`} src="" />
                                    ) )
                                }

                                { participant?.length > 3 ?
                                    <Avatar color="initials" size="sm">+3</Avatar> : null}
                            </Avatar.Group>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

function EventButton({title, time, desc, date}:any){

    return(<>
        <div className="flex flex-row items-center gap-3">
            <EventDateBox date={date} />
            <div className="flex flex-col w-full "> 
                <div className={"flex flex-row w-full justify-between"}>
                    <div className={classes.eventTitle}>{title}</div>
                    <div className={classes.eventTime}> {time}</div>
                </div>
                <div className={`${classes.eventDesc}`}> {desc} </div>
            </div>
        </div>
    </>);
}

function EventDateBox({date}:any){

    return(<>
        <div className={classes.dateEvent}>
            <span className={classes.dateSpan}> 18 </span>
            <span className={classes.dateSpan}> FEB </span>
        </div>
    </>);
}