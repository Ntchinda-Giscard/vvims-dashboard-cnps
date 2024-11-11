"use client"
import classes from "@/app/dashboard/leave/components/styles.module.css";
import { useQuery, useSubscription } from "@apollo/client";
import { ThemeIcon } from "@mantine/core";
import { IconInfoHexagon, IconCalendar, IconCalendarDot, IconUsersGroup } from "@tabler/icons-react";
import { GET_MONTH_LEAVE, GET_PENDING_LEAVES_AGG } from "../queries/queries";
import { useEffect } from "react";

export default function TopLeaveCard(){

    const {data:dataPending, loading: loadPending} = useSubscription(GET_PENDING_LEAVES_AGG);
    const {data:dataLEaveMonth, loading: loadMonthLeave} = useSubscription(GET_MONTH_LEAVE);
    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_MONTH_LEAVE);

    const data = [
        { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: dataPending?.leaves_aggregate?.aggregate?.count },
        { icon: IconCalendar, title: "Total Request", desc: "Total leave", value: dataAgg?.leaves_aggregate?.aggregate?.count },
        { icon: IconUsersGroup, title: "On leave", desc: "Tracking employees on leave", value: 0 },
        // { icon: IconInfoHexagon, title: "Pending Request", desc: "Tracking leave request", value: 4 },
    ];

    

    useEffect(() =>{
        console.log("Pending :", dataPending)
    },[dataLEaveMonth, dataPending])


    return(
        <>
            <div className="flex flex-col md:flex-row gap-2">
                {
                    data.map((item, index) => (
                        <div key={item?.desc} className={classes.leavecard}>
                            <div className="flex flex-row justify-between items-center">
                                <ThemeIcon radius="xl" size="lg" color="rgba(247, 247, 247, 1)">
                                    <item.icon color="black" stroke={1} style={{ width: '60%', height: '60%' }} />
                                </ThemeIcon>
                                <span className={classes.value}> {item?.value} </span>
                            </div>
                            <div className="flex flex-col">
                                <p className={classes.title}> {item?.title} </p>
                                <p className={classes.desc}> {item?.desc} </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}