"use client"
import { Button, Group, Paper, TextInput, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconPlus, IconSearch } from "@tabler/icons-react";
import VisitorTable from "./components/visitorTable";
import AddVisitor from "./components/addVisitorModal";
import { GET_VISITS, GET_VISITS_AGG } from "./query/get_visits";
import { useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import { Poppins } from 'next/font/google';
import FootPage from "../components/fotter";
import { ACCEPT_VISITS, CHECK_OUT_VISIT, REJECT_VISITS } from "./mutation/insert_visits";
import toast from "react-hot-toast";
import EditVisitor from "./components/editVisitor";
import { DateInput } from "@mantine/dates";
import  {useRouter, usePathname} from 'next/navigation'
import { useDispatch } from "react-redux";
import { addVisitor } from "./slices/visitorSlices";
import { DELETE_VISITS } from "./mutation/delete_visits";
import DeleteVisitorModal from "./components/deleteVisitModal";
import TopVisitorCard from "@/app/dashboard/visitors/components/topVisitorCards";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });


function Page() {
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()
    const [addOpenedVisitor, { open: openVisitor, close: closeVisitor }] = useDisclosure(false);
    const [editOpenedVisitor, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [date, setDate] = useState( new Date('2000-01-01'))
    const [to, setTo] = useState( new Date())
    const [editValue, setEditValue] = useState(null)
//   const user = useSelector((state: any) => state.auth.userInfo);
    const [search, setSearch] = useState('');
    const [deleteData, setDeleteData] = useState();
    const {data: dataVisits, loading: loadVisits, error: errVisits} = useSubscription(GET_VISITS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            search: `%${search}%`,
            _gte1: date ? date : "2000-01-01",
            _lte1: to
        }
    });

    const {data: dataAgg, error: errAgg, loading: loadAgg} = useSubscription(GET_VISITS_AGG,{
        variables:{
            search: `%${search}%`,
            _gte1: date ? date : "2000-01-01",
            _lte1: to
        }
    })

    const [acceptVisit, {}] = useMutation(ACCEPT_VISITS)
    const [rejectVisit, {}] = useMutation(REJECT_VISITS)
    const [checkOutVisit, {}] = useMutation(CHECK_OUT_VISIT)
    const [deleteVisitor, {}] = useMutation(DELETE_VISITS)

    useEffect(() =>{
        console.log(dataVisits)
    }, [dataVisits])

    const handleDelete= (v: any) =>{
        setDeleteData(v)
        openDelete()
    }

    const handleAcceptVisit= (v:any) =>{
        const toast_id = toast.loading('Operation in progress...')
        acceptVisit({
            variables:{
                id: v?.id
            },
            onCompleted: () =>{
                toast.dismiss(toast_id)
                toast.success("Operation successful")

            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })

    }
    const handleRejectVisit= (v:any) =>{
        const toast_id = toast.loading('Operation in progress...')
        rejectVisit({
            variables:{
                id: v?.id
            },
            onCompleted: () =>{
                toast.dismiss(toast_id)
                toast.success("Operation successful")

            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })
    }
    const handleCheckOutVisit= (v:any) =>{
        const toast_id = toast.loading('Operation in progress...')
        checkOutVisit({
            variables:{
                id: v?.id
            },
            onCompleted: () =>{
                toast.dismiss(toast_id)
                toast.success("Operation successful")

            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })
    }
    const handleView= (v: any) =>{
        dispatch(addVisitor(v))
        router.push(`${pathname}/${v?.id}`)
    }

    const handleEdit = (v: any) =>{
        setEditValue(v)
        console.log(v)
        openEdit()
    }

    // if (errAgg) return `Error: ${errAgg}`
    return ( <>
        <main className="flex flex-col min-h-full min-w-full">
            <DeleteVisitorModal
                data={deleteData}
                opened = {openedDelete}
                close={closeDelete}
            />
            <AddVisitor
                opened = {addOpenedVisitor}
                close={closeVisitor}
            />
            <EditVisitor
                opened={editOpenedVisitor}
                close={closeEdit}
                data={editValue}
            />
            <div className="flex md:flex-row flex-col justify-between">
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Visitors </p>
                <Button
                    onClick={openVisitor}
                    bg={"#16DBCC"}
                    leftSection={<IconPlus size={14} />}
                >
                    Add Visitor
                </Button>
            </div>
            <TopVisitorCard />
            <Paper radius="md" shadow="md" p="md" mt="lg" >
                <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between">
                    <TextInput
                        value={search}
                        onChange={(event) => setSearch(event.currentTarget.value)}
                        leftSection={<IconSearch  style={{ width: rem(16), height: rem(16) }} />}
                        placeholder="search"
                    />
                    <div className="flex flex-row gap-3">
                        <DateInput
                        //@ts-ignore
                        value={date}
                        //@ts-ignore
                        onChange={setDate}
                        // onChange={console.log}
                        placeholder="Date input"
                        leftsection={<IconCalendar style={{ width: rem(16), height: rem(16) }} />}
                        clearable
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            calendarHeader:{
                                color: "#000"
                            },
                            calendarHeaderControl:{
                                color: "#000"
                            }
                        }}
                    />

                    <DateInput
                        //@ts-ignore
                        value={to}
                        //@ts-ignore
                        onChange={setTo}
                        // onChange={console.log}
                        placeholder="Date input"
                        leftsection={<IconCalendar style={{ width: rem(16), height: rem(16) }} />}
                        clearable
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            calendarHeader:{
                                color: "#000"
                            },
                            calendarHeaderControl:{
                                color: "#000"
                            }
                        }}
                    />
                    </div>
                    
                </div>
                {
                    loadVisits || errVisits ?
                        <FullWidthSkeletonStack /> :
                        <VisitorTable
                            datas={dataVisits?.visits}
                            onAccept={(v:any) =>handleAcceptVisit(v)}
                            onReject={(v:any) => handleRejectVisit(v)}
                            onCheckOut={(v:any) =>handleCheckOutVisit(v)}
                            onEdit={(v:any) =>handleEdit(v)}
                            onView={(v: any) => handleView(v) }
                            onDelete={(v:any) =>handleDelete(v)}
                        />}
                <div className="flex justify-center md:justify-between">
                    {
                        errAgg || loadAgg ? null :
                            <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                                Displaying { dataVisits?.visits?.length ? dataVisits?.visits?.length*activePage : 0} of {dataAgg?.visits_aggregate?.aggregate?.count} visits.
                            </p>}
                    {
                        errAgg || loadAgg ? null :
                            <FootPage
                                activePage={activePage}
                                onPage={(v: any) => setPage(v)}
                                total={Math.ceil(dataAgg?.visits_aggregate?.aggregate?.count/itemsPerPage)}
                            />
                    }
                </div>
            </Paper>
        </main>
    </> );
}

export default Page;