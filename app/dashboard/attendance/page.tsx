"use client"
import {Button, Group, NumberInput, Paper, rem} from "@mantine/core"
import StatsGrid from "@/app/dashboard/attendance/components/topCards";
import AttendanceTable from "./components/attendanceTable";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_ATTENDACES_USER, GET_ATTENDANCES, GET_ATT_AGG } from "./queries/get_total_empl";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import FootPage from "../components/fotter";
import { Poppins } from "next/font/google";
import AttendanceLineChart from "./components/attendanceLineChart";
import AttendanceBarChart from "./components/chartAttendance";
import Link from "next/link"
import {usePathname} from 'next/navigation'
import { CLOCK_IN, CLOCK_OUT } from "./mutation/clock_in";
import toast from "react-hot-toast";
import { DateInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

function Page(){
    const pathname = usePathname()
    const user = useSelector((state: any) => state.auth.userInfo);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [value, setValue] = useState<Date | null>(new Date());

    const {data: dataAtt, loading: loadAtt, error: errAtt} = useSubscription(GET_ATTENDANCES,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            clock_in_date: value
        }
    })

    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_ATT_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
            clock_in_date: value
        }
    });



    const {data: dataAttStatus, loading: loadAttStatus, error: errorAttStatus} = useSubscription(GET_ATTENDACES_USER,{
        variables:{id: user?.employee?.id}
    });

    useEffect(() =>{
        console.log("status", dataAttStatus)
    },[dataAttStatus])

    const [clockin, {loading: loadClockin}] = useMutation(CLOCK_IN)
    const [clockout, {loading: loadClockout}] = useMutation(CLOCK_OUT)
    const getLocation = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser");
            toast('Geolocation is not supported by your browser', {
                icon: '📍',
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    const toast_id = toast.loading("Clocking in...")
                    clockin({
                        variables:{
                            employee_id: user?.employee?.id,
                            location: {
                                type: "Point",
                                coordinates:[longitude, latitude]
                            }
                        },
                        onCompleted: () =>{
                            toast.dismiss(toast_id)
                            toast.success("Clock in successful")
                        },
                        onError: (err) =>{
                            toast.dismiss(toast_id)
                            toast.error(`${err.message}`)
                        }
                    })
                },
                (err) => {
                    console.error("Unable to retrieve your location");
                    toast('Unable to retrieve your location', {
                        icon: '📍',
                    });
                }
            );
        }
    };

    const clockIn = () =>{
        const toast_id = toast.loading("Clocking in...")
        clockin({
                        variables:{
                            employee_id: user?.employee?.id,
                            location: {
                                type: "Point",
                                coordinates:["11.5170657", "3.8727566"]
                            }
                        },
                        onCompleted: () =>{
                            toast.dismiss(toast_id)
                            toast.success("Clock in successful")
                        },
                        onError: (err) =>{
                            toast.dismiss(toast_id)
                            toast.error(`${err.message}`)
                        }
                    })
    }

    const handleClockOut = () =>{
        const toast_id = toast.loading("Clocking in...")
        clockout({
            variables:{
                employee_id: user?.employee?.id,
            },
            onCompleted: () =>{
                toast.dismiss(toast_id)
                toast.success("Clock out successful")
            },
            onError: (err) =>{
                toast.dismiss(toast_id)
                toast.error(`Clock in error`)
            }
        })
    }

    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Company Attendance </p>
                    <Group grow>
                        <Button
                            disabled ={!!(dataAttStatus?.attendance?.[0]?.clock_out_time || loadAttStatus)}
                            loading={loadClockin || loadClockout}
                            onClick={ dataAttStatus?.attendance?.[0]?.clock_in_time ? handleClockOut : clockIn}
                            color={dataAttStatus?.attendance?.[0]?.clock_in_time ? 'red' : ''} >
                            {
                                dataAttStatus?.attendance?.[0]?.clock_in_time ? 'Clock out' : "Clock in"
                            }
                        </Button>
                        <Button component={Link} href={`${pathname}/view-all-attendances`} bg={"#16DBCC"}>
                            View All Attendance
                        </Button>
                    </Group>
                </div>
                <StatsGrid
                    time={dataAttStatus?.attendance?.[0]?.clock_in_time}
                    date={dataAttStatus?.attendance?.[0]?.clock_in_date}
                    is_late={dataAttStatus?.attendance?.[0]?.attendance_state?.is_late}
                />
                <div className={"flex flex-col md:flex-row min-w-full gap-3"}>
                    <div className={"flex md:w-3/5"}>
                        <Paper p="md" withBorder mt="lg" w="100%" radius="md">
                            <p style={{ fontSize: "medium", fontWeight: 500, marginBottom: 15, color: "#404040" }}> Attendance Comparison Chart </p>
                            <AttendanceLineChart />
                        </Paper>
                    </div>
                    <div className={"flex md:w-2/5"}>
                        <Paper p="md" withBorder mt="lg" radius="md" w="100%">
                            <p style={{ fontSize: "medium", fontWeight: 500, marginBottom: 15, color: "#404040" }}> On time Comparison Chart </p>
                            <AttendanceBarChart />
                        </Paper>
                    </div>
                </div>
                <Paper mt="lg" shadow="md" radius="md" p="md">
                    <div>
                        <DateInput
                            value={value}
                            w={300}
                            onChange={setValue}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="Date"
                            placeholder="Date input"
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
                    {
                        loadAtt || errAtt ? <FullWidthSkeletonStack /> :
                            <AttendanceTable
                                datas={dataAtt?.attendance}
                            />
                    }
                    <div className="flex min-w-full items-center md:flex-row flex-col justify-center md:justify-between">
                        {
                            errAgg || loadAgg ? null :
                                <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                                    Displaying { dataAtt?.attendance?.length ? dataAtt?.attendance?.length*activePage : 0} of {dataAgg?.attendance_aggregate?.aggregate?.count} employees.
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
                                        total={Math.ceil(dataAgg?.attendance_aggregate?.aggregate?.count/itemsPerPage)}
                                    />
                                </div>
                        }
                    </div>
                </Paper>
            </main>
        </>
    )
}

export default Page