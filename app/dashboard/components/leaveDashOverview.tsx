"use client"

import { Paper } from "@mantine/core";
import cx from 'clsx';
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import { useQuery } from "@apollo/client";
import { AGG_LEAVES_PENDING, AGG_LEAVES_ACCEPTED, AGG_LEAVES_REJECTED } from "../query/get_percent";
import { useEffect } from "react";


function LeaDashOverview() {

    const {data: dataPending, error: errPending} = useQuery(AGG_LEAVES_PENDING);
    const {data: dataAccepted, error: errAccepted} = useQuery(AGG_LEAVES_ACCEPTED);
    const {data: dataReject, error: errRejected} = useQuery(AGG_LEAVES_REJECTED);

    useEffect(() => {
        console.log("Pending data", dataPending )
    },[dataPending,dataAccepted , dataReject])

    if (errPending) return <div>{ `${errPending}`} </div>
    if (errAccepted) return <div>{ `${errAccepted}`} </div>
    if (errRejected) return <div>{ `${errRejected}`} </div>

    return ( <>

    <Paper
        withBorder
        p={15}
        radius={"lg"}
    >
        <p className={cx([classes.titleCars])}> Leave Overview </p>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataPending?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> pending leaves </p>
        </div>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataAccepted?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> accepted leaves </p>
        </div>

        <div className={classes.overviewCard}>
            <p className={classes.overviewValue}> {dataReject?.leaves_aggregate?.aggregate?.count} </p>
            <p className={classes.overviewLabel}> rejected leaves </p>
        </div>

    </Paper>
    
    </> );
}

export default LeaDashOverview;

function Cards(){
}