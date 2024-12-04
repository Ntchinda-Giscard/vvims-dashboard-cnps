"use client"
import { useDisclosure } from '@mantine/hooks';
import { Button, FloatingIndicator, Paper, Tabs, TextInput } from "@mantine/core";
import EventsTable from "./components/eventsTables";
import { IconSearch } from "@tabler/icons-react";
import classes from './Demo.module.css';
import { useEffect, useState } from "react";
import AddEvent from './components/addEvents';
import { useSubscription } from '@apollo/client';
import {GET_COMPLETED_EVENTS, GET_EVENT_AGG, GET_EVENTS, GET_PENDING_EVENTS} from './queries/get_events';
import AddTask from "@/app/dashboard/events/components/add_task";
import  {useRouter, usePathname} from 'next/navigation'
import FootPage from "@/app/dashboard/components/fotter";



function EventsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [value, setValue] = useState<string | null>('1');
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const {data: dataAgg, error: errAgg, loading: loadAgg} = useSubscription(GET_EVENT_AGG);
    const  {data: dataPend, error: errorPend, loading: loadPend} = useSubscription(GET_PENDING_EVENTS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    })
    const  {data: dataCompt, error: errorComt, loading: loadCompt} = useSubscription(GET_COMPLETED_EVENTS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    })
    const {data: dataEvents, error: errError, loading: loadEvents} = useSubscription(GET_EVENTS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    });
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const [openedAdd, { open: openAdd , close: closeAdd }] = useDisclosure(false);
    const [openedTask, { open: openTask, close: closeTask }] = useDisclosure(false);
    const [eventData, setEventData] = useState()

  useEffect(() =>{
      console.log("Events table", dataEvents);
  }, [dataEvents])

    const handleAddTask = (v: any) => {
        openTask()
        setEventData(v)
        console.log('Event chosen', v)
    }

    const handleRoute = (v: any) =>{
        router.push(`${pathname}/${v?.id}`)
    }
 
  
    return ( 
    <>
        <main className="flex flex-col min-w-full min-h-full">
            <AddEvent
                close={closeAdd}
                opened={openedAdd}

            />
            <AddTask
                opened={openedTask}
                close={closeTask}
                data={eventData}
            />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Events Managements </p>
                <Button  color={"#16DBCC"} 
                    onClick={openAdd}
                >
                    Add Event
                </Button>
            </div>
            <Paper
                p="md"
                shadow="md"
                radius="lg"
            >
                {/*<div className="flex mt-4 mb-4 flex-col lg:flex-row items-center lg:justify-between justif-center ">*/}
                <div className='flex flex-row gap-5 mb-4'>
                    <p style={{fontWeight: 800, fontSize: "medium", color: "#404040"}}> Events </p>
                    <TextInput radius={'md'} leftSection={<IconSearch stroke={1} width={20} height={20}/>}
                               placeholder="Search for events"/>
                </div>
                <Tabs variant="none" mt={15} value={value} onChange={setValue}>
                    <Tabs.List ref={setRootRef} className={classes.list}>
                        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                            All events
                        </Tabs.Tab>
                        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                            Completed
                        </Tabs.Tab>
                        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
                            Pending
                        </Tabs.Tab>

                        <FloatingIndicator
                            target={value ? controlsRefs[value] : null}
                            parent={rootRef}
                            className={classes.indicator}
                        />
                    </Tabs.List>
                    <Tabs.Panel value="1">
                        <EventsTable
                            datas={dataEvents?.events}
                            onAddTask={(v: any) => handleAddTask(v)}
                            onSee={(v: any) => handleRoute(v)}
                        />
                        {
                            errAgg || loadAgg ? null :
                                <FootPage
                                    activePage={activePage}
                                    onPage={(v: any) => setPage(v)}
                                    total={Math.ceil(dataAgg?.events_aggregate?.aggregate?.count / itemsPerPage)}
                                />
                        }
                    </Tabs.Panel>
                    <Tabs.Panel value="2">
                        <EventsTable
                            datas={dataCompt?.events}
                            // onAddTask={(v: any) => handleAddTask(v)}
                            onSee={(v: any) => handleRoute(v)}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="3">
                        <EventsTable
                            datas={dataPend?.events}
                            // onAddTask={(v: any) => handleAddTask(v)}
                            onSee={(v: any) => handleRoute(v)}
                        />
                        {/*{*/}
                        {/*    errAgg || loadAgg ? null :*/}
                        {/*        <FootPage*/}
                        {/*            activePage={activePage}*/}
                        {/*            onPage={(v: any) => setPage(v)}*/}
                        {/*            total={Math.ceil(dataAgg?.events_aggregate?.aggregate?.count / itemsPerPage)}*/}
                        {/*        />*/}
                        {/*}*/}
                    </Tabs.Panel>
                    {/*<Tabs.Panel value="1">*/}
                    {/*    */}
                    {/*</Tabs.Panel>*/}
                </Tabs>
                {/*</div>*/}



            </Paper>
        </main>

    </>
    );
}

export default EventsPage;