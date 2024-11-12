"use client"

import { useSubscription } from "@apollo/client";
import { useState } from "react";
import { GET_LEAVE_APPROVALS, LEAVE_APPROVAL_AGG } from "./query/leave_aproval";
import { Poppins } from "next/font/google";
import { NumberInput, Paper } from "@mantine/core";
import FullWidthSkeletonStack from "../components/defaultTable";
import LeavesApprovalTables from "./components/leaveApprovalTable";
import FootPage from "../components/fotter";


const poppins = Poppins({ subsets: ["latin"], weight:["400"] });


export default function Page(){
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {data: dataLeave, error: errLeave, loading: loadLeave} = useSubscription(GET_LEAVE_APPROVALS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    });

    const {data: dataAgg, error: errAgg, loading: loadAgg} = useSubscription(LEAVE_APPROVAL_AGG)


    return(
        <>
            <main className="flex flex-col min-w-full min-h-full">
                <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Leave approvals </p>
                </div>
                <Paper
                    shadow="md"
                    radius="md"
                    p="md"
                >
                    {
                        errLeave || loadLeave ?
                        <FullWidthSkeletonStack /> :
                        <LeavesApprovalTables
                            datas={dataLeave?.leave_approval}
                        />
                    }
                    <div className="flex min-w-full items-center md:flex-row flex-col justify-center md:justify-between">
                            {
                                errAgg || loadAgg ? null :
                                <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                                Displaying { dataLeave?.leave_approval?.length ? dataLeave?.leave_approval?.length*activePage : 0} of {dataAgg?.leave_approval_aggregate?.aggregate?.count} leaves.
                                </p>}
                            {
                                errAgg || loadAgg ? null :
                                <div className="flex flex-row">
                                <NumberInput w={100} value={itemsPerPage} min={10} max={100} 
                                //@ts-ignore
                                onChange={setItemsPerPage} />
                                <FootPage 
                                    activePage={activePage}
                                    onPage={(v: any) => setPage(v)}
                                    total={Math.ceil(dataAgg?.leave_approval_aggregate?.aggregate?.count/itemsPerPage)}
                                />
                                </div>
                            }
                    </div>
                </Paper>
            </main>
        </>
    );
}