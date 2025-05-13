"use client"
import { Button, NumberInput, Paper, Space } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import LeavesTables from "./components/leavesTables";
import { useDisclosure } from '@mantine/hooks';
import AddLeaveManagement from "./components/addLeaveModal";
import { GET_LEAVES, GET_LEAVE_AGG } from "./queries/queries";
import { useMutation, useSubscription, useQuery } from "@apollo/client";
import LeaveModal from "./components/leaveModal";
import { useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import { DELETE_LEAVE } from "./mutation/mutations";
import DeleteLEaveModal from "./components/deleteLeaveModal";
import TopLeaveCard from "./components/topLeaveCards";
import Demo from "./components/leaveGraph";
import FootPage from "../components/fotter";
import { Poppins } from "next/font/google";
import LeaveTypesGroupAgg from "./components/leaveTypeGroupBy";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });


function Page() {
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
    const [openedSeeLeave, { open: openLeave, close : closeLeave}] = useDisclosure(false);
    const [openedDeleteLeave, { open: openDelete, close : closeDelete }] = useDisclosure(false);
    const {data: dataLeave, error: errLeave, loading: loadLeave} = useQuery(GET_LEAVES,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    });
    const {data: dataAgg, error: errAgg, loading: loadAgg} = useQuery(GET_LEAVE_AGG)
    const [deleteLeave, {}] = useMutation(DELETE_LEAVE);


    const [leaves, setLeaves] = useState();

    const handleViewLeave= (v: any) =>{
        setLeaves(v)
        openLeave()
    }
    const handelDelete= (v:any) =>{
        setLeaves(v)
        openDelete()
    }
    return ( <>
        <main className="flex flex-col min-w-full min-h-full">
            <AddLeaveManagement
                opened={openedAdd}
                close={closeAdd}
            />
            <LeaveModal
                opened={openedSeeLeave}
                close={closeLeave}
                leave={leaves}
            />
            <DeleteLEaveModal
                opened={openedDeleteLeave}
                close={closeDelete}
                leave={leaves}
            />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Leaves </p>
                <Button onClick={openAdd} leftSection={ <IconPlus size={14} /> }  color={"#16DBCC"}>
                    Add Leaves
                </Button>
            </div>
            <TopLeaveCard />
            {/* <Paper withBorder>
                    <Demo />
                </Paper> */}
            <div className="flex flex-col md:flex-row">
                <LeaveTypesGroupAgg />
            </div>
            <Space h={20} />
            <Paper
                shadow="md"
                radius="md"
                p="md"
            >
                {
                    errLeave || loadLeave ?
                        <FullWidthSkeletonStack /> :
                        <LeavesTables
                            datas={dataLeave?.leaves}
                            onEdit={(v:any) => handleViewLeave(v)}
                            onDelete={(v: any) => handelDelete(v)}
                        />
                }
                <div className="flex min-w-full items-center md:flex-row flex-col justify-center md:justify-between">
                    {
                        errAgg || loadAgg ? null :
                            <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                                Displaying { dataLeave?.leaves?.length ? dataLeave?.leaves?.length*activePage : 0} of {dataAgg?.leaves_aggregate?.aggregate?.count} leaves.
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
                                    total={Math.ceil(dataAgg?.leaves_aggregate?.aggregate?.count/itemsPerPage)}
                                />
                            </div>
                    }
                </div>
            </Paper>
        </main>
    </> );
}

export default Page;