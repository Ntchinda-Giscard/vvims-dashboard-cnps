"use client"
import classes from "@/app/dashboard/leave/components/styles.module.css";
import { useQuery, useSubscription } from "@apollo/client";
import { ThemeIcon } from "@mantine/core";
import { IconDoorEnter, IconDoorExit, IconUsers } from "@tabler/icons-react";
import { useEffect } from "react";
import {CLOCKOUT_VISITORS, GET_VISITS_DAY, TOTAL_VISITS} from "@/app/dashboard/query/get_percent";

export default function TopVisitorCard(){

    const {data: dataVisits} = useSubscription(GET_VISITS_DAY);
    const {data: dataClockOut} = useSubscription(CLOCKOUT_VISITORS);
    const {data: dataTotalVisits} = useSubscription(TOTAL_VISITS)

    const data = [
        { icon: IconUsers, title: "Total Visits", desc: "Tracking total visits", value: dataTotalVisits?.visits_aggregate?.aggregate?.count },
        { icon: IconDoorExit, title: "Daily clockout", desc: "Tracking daily clockin", value: dataClockOut?.visits_aggregate?.aggregate?.count },
        { icon: IconDoorEnter, title: "Daily clockin", desc: "Tracking daily clockout", value: dataVisits?.visits_aggregate?.aggregate?.count },
    ];



    useEffect(() =>{
        console.log("Pending :",)
    },[])


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