"use client"
import {Paper, Button, Checkbox, Group, TextInput, Select, rem} from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconCalendar, IconPdf, IconFileTypePdf } from '@tabler/icons-react';
import {DateInput} from "@mantine/dates";
import { useEffect, useState } from "react";
import { ReportsTable } from "./components/reports-table";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_EMPLOYEES_QUERY, GET_REPORT, REPORT_AGG } from "./query/query";
import { getFirstAndLastDayOfMonth } from "./utils";
import { INSERT_REPORT } from "./mutations/mutations";
import axiosClient from "../settings/components/axiosClient";
import toast from "react-hot-toast";
import FootPage from "../components/fotter";
import { GET_ALL_SERVICES } from "../visitors/query/get_all_services";
import { GET_ALL_DEPT } from "../departments/queries/get_dept";
import { GET_EMPLY } from "../add-employee/query/get_all_empl";
import { useSelector } from "react-redux";



export default function Page(){
    const user = useSelector((state: any) => state.auth.userInfo);
    const [checked, setChecked] = useState(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {data: dataReport, loading: loadReport, error: errReport} = useSubscription(GET_REPORT, {
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    });
    const {data: dataService, error: errService, loading: loadService } = useQuery(GET_ALL_SERVICES,{
        variables:{
        company_id: user?.employee?.company_id,
    }}
    );

    const {data: dataDept, loading: loadDept, error: errDept} = useQuery(GET_ALL_DEPT,{
    variables:{
    company_id: user?.employee?.company_id
    }
    });
    const {data: dataAllEmpl, loading: loadAll, error: errAll} = useQuery(GET_EMPLOYEES_QUERY,{
    variables:{
        company_id: user?.employee?.company_id
    }
    })
    const [pdf_url, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [about, setAbout] = useState<string | null>(null);
    const [deptArr, setDept] = useState([]);
    const [servArr, setServ] = useState([]);
    const [allArr, setAll] = useState([]);


    const {loading: loadAgg, error: errAgg, data: dataAgg} = useSubscription(REPORT_AGG);
    const [inserReport, {loading: loadInsert}] = useMutation(INSERT_REPORT)

    useEffect(() =>{
        console.log( "Exactly", dataReport)
        const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
            value: d?.id,
            label: d?.text_content?.content
        }))
        const servOptions = dataService?.services?.map((d: { id: any; text_content: { content: any; }; }) =>({
            value: d?.id,
            label: d?.text_content?.content
        }))
        const allOptions = dataAllEmpl?.employees?.map((d: {
            service: any;
            department: any; id: any; firstname: any, lastname:any 
}) =>({
            value: d?.id,
            label: `${d?.firstname}` + " "+ `${d?.lastname}` ,
            department: d?.department?.text_content?.content
        }))
        
        setDept(deptOptions)
        setServ(servOptions)
        setAll(allOptions)
        console.log("Employees", dataAllEmpl)
    },[dataReport, dataDept, dataService, dataAllEmpl])
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            type: "Visits",
            about: "",
            termsOfService: false,
            from: new Date(),
            to: null,
            department: "",
            service: "",
            employee: "",
        },

        validate: {
            type: (value) => ( value?.length > 0 ? null : 'Invalid choice'),
            // from: (value) => ( value !== null ? null : 'Invalid date'),
            // to: (value) => ( value !== null ? null : 'Invalid date'),
        },
    });

    form.watch('about', ({ previousValue, value, touched, dirty }) => {
        console.log({ previousValue, value, touched, dirty });
        setAbout(value);
    });

    async function handleSubmit(values: any){
        // setLoading(true);
        console.log(values)
        console.log(values.type?.toLowerCase());
        inserReport({
            variables:{
                categoryId: about === 'Employee' ? values?.employee : about === "Service" ? values?.service : values?.department,
                category1: values?.about?.toUpperCase(),
                reportType: values?.type?.toUpperCase(),
                fromDate: values?.from?.toISOString().split('T')[0],
                toDate: values?.to?.toISOString().split('T')[0],
            },
            onCompleted: (data) =>{
                console.log("report data", data);
                toast.success("Operation successful")
            }, onError: (error) => {
                console.log("Error", error)
                toast.error(`${error.message}`)
            }
        })

        // try{
            
        //     setPdfUrl(response.data.pdf_url)
        //     console.log(response.data.pdf_url);
        //     toast.success("Operation successful")
        // }catch (err){
        //     toast.error(`${err}`)
        // }finally{
        //     setLoading(false);
        // }
    }
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <p style={{fontWeight: 800, fontSize: "x-large", color: "#404040"}}> Reports </p>
            </main>

            <Paper
                radius={'md'}
                shadow={'md'}
                mt={'md'}
                mb={'md'}
                p={'md'}
            >
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Generate Reports </p>
                <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
                    <Select
                        mt={'lg'}
                        withAsterisk
                        radius={'md'}
                        data={['Visits', 'Attendance']}
                        defaultValue={'Visits'}
                        label="Reports type"
                        placeholder="select"
                        key={form.key('type')}
                        {...form.getInputProps('type')}
                        styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }}
                    />

                    <Select
                        mt={'lg'}
                        withAsterisk
                        radius={'md'}
                        data={['Employee', 'Service', 'Department']}
                        defaultValue={'Employee'}
                        label="Reports about"
                        placeholder="select"
                        key={form.key('about')}
                        {...form.getInputProps('about')}
                        styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }}
                    />
                    {
                        about === 'Employee' ? <Select label="Employees" key={form.key('employee')}
                        {...form.getInputProps('employee')} data={allArr}  styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }} /> : null
                    }

                    {
                        about === 'Service' ? <Select label="Services" key={form.key('service')}
                        {...form.getInputProps('service')} data={servArr} styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }} /> : null
                    }


                    {
                        about === 'Department' ? <Select label="Departments" key={form.key('department')}
                        {...form.getInputProps('department')} data={deptArr} styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }} /> : null
                    }


                    <Checkbox
                        mt="md"
                        label="Generate by date range"
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                        styles={{
                                label:{color: "#404040"},
                            
                        }}
                    />
                    <div className={'flex flex-col md:flex-row gap-3'}>
                        <DateInput
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="From"
                            placeholder="Date input"
                            key={form.key('from')}
                            {...form.getInputProps('from')}
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
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="To"
                            key={form.key('to')}
                            {...form.getInputProps('to')}
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



                    <Group justify="flex-end" mt="md">
                        <Button variant={'outline'} onClick={() => form.reset()}>Clear</Button>
                        <Button type="submit" loading={loadInsert} leftSection={<IconFileTypePdf style={{width: rem(16), height: rem(16)}} />} >Generate report</Button>
                    </Group>
                </form>
            </Paper>
            <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Reports history </p>
            <Paper
                radius={'md'}
                shadow={'md'}
                mt={'md'}
                p={'md'}
            >
                {
                    loadReport && <p>Loading...</p>
                }
                {
                    errReport && <p>{`${errReport}`}</p>
                }
                {
                    dataReport && <ReportsTable datas={dataReport?.reports} />
                }
                <FootPage 
                   activePage={activePage}
                   onPage={(v: any) => setPage(v)}
                    total={Math.ceil(dataAgg?.reports_aggregate?.aggregate?.count/itemsPerPage)}
                />
                
            </Paper>
        </>
    )
}