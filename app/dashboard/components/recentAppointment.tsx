"use client"

import {Paper, Badge, Avatar, Group} from "@mantine/core"
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from "clsx";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link"
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_RECENT_APP_CARD } from "../query/get_percent";
import { useEffect } from "react";
import NoDataComponent from "./nodataComponent";

function RecentAppointment() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data, loading, error} = useQuery(GET_RECENT_APP_CARD, {
        variables:{
            employee_id: user?.employee?.id
        }
    });

    useEffect(() =>{
        console.log("Data APPOINTMENT", data)
        if (error){
            console.log("Error", error)
        }
    },[data])

    if (error) return <div> {`${error}`} </div>
    
      
    return ( <>
        <Paper
            withBorder
            p={15}
            h={"100%"}
            radius="lg"
        >
            <div className="flex flex-row justify-between items-center">
                <p className={cx([classes.titleCars])}> Upcoming Appointment </p>
                <div className="flex flex-row items-center">
                    <Link href={"/dashboard/appointment"} style={{fontSize: 12, color: "blue", fontWeight: 300}}> view all </Link>
                    <IconChevronRight stroke={1} style={{width: 10, height: 10, color: "blue"}} />
                </div>

            </div>
            {/* <div className="flex flex-row gap-3 mb-3">
                <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} color="blue" radius="md">Today</Badge>
                <Badge styles={{
                    label:{
                        textTransform: 'capitalize'
                    },
                    root:{
                        cursor: 'pointer'
                    }
                }} variant="outline" color="blue" radius="md">Tomorow</Badge>
            </div> */}
                {
                    data?.appointments.length < 1 || error ?
                    <NoDataComponent
                        comment="No appointment for today. Click the button to create new appointment"
                        button_msg="Add appointments"
                        link={'/dashboard/appointment'}
                    /> :
                    <div className="grid grid-cols-1 gap-x-2 gap-y-3 flex justify-between lg:grid-cols-2">
                    
                       { data?.appointments?.map((a: {
                            id: any; visitor: { firstname: any; }; description: any; start_time: any; end_time: any;}) =>(
                            <AppoineeCard 
                                key={a?.id}
                                visitor_name={a?.visitor?.firstname}
                                reason={a?.description}
                                st={a?.start_time}
                                et={a?.end_time}
                            />
                        ))}
                    </div> 
                   
                }
                
            

        </Paper>
    </> );
}

export default RecentAppointment;




function AppoineeCard({visitor_name, reason, st, et}: any){
    function removeSeconds(timeString:string | null) {
        if (timeString === null) return "--:--";
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
      }
    return(<>
        <div className={classes.appointeContainer}>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <Avatar variant="filled" color="#73B7F0" radius="xl" src={""} alt="no image here" />
                    <div className="flex flex-col">
                        <p className={classes.appointeeName}> {visitor_name} </p>
                        <p className={classes.appointeeReason}> {reason} </p>
                    </div>
                </div>
                <Badge variant="white" size="xs" color="teal.5"> {`${removeSeconds(st)}-${removeSeconds(et)}`}</Badge>
            </div>
        </div>
    </>);
}