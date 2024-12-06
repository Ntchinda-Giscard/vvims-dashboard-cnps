"use client"
import { IconArrowLeft, IconCalendar, IconId, IconIdBadge, IconMapPin, IconPhone, IconPin, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ActionIcon, Group, Paper, Badge, Text, Image, Card, Stack,rem, Divider, Button, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ContactIconsList } from "../components/contactSection";
import { useSubscription } from "@apollo/client";
import { GET_VISITS_BY_VSITOR, GET_VISIT_BY_VISTOR_AGG } from "../query/get_visits";
import { Poppins } from "next/font/google";
import { DateInput } from "@mantine/dates";
import FullWidthSkeletonStack from "../../components/defaultTable";
import VisitByVisitorTable from "../components/visitByVisitorTable";
import FootPage from "../../components/fotter";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

function Pages() {
    const router = useRouter();
    const visitor = useSelector((state: any) => state.visitor.visitor);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [date, setDate] = useState( new Date('2100-01-01'))
    const [editValue, setEditValue] = useState(null)
//   const user = useSelector((state: any) => state.auth.userInfo);
    const [search, setSearch] = useState('');
    const [deleteData, setDeleteData] = useState();
    const {data: dataVisits, loading: loadVisits, error: errVisits} = useSubscription(GET_VISITS_BY_VSITOR,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            search: `%${search}%`,
            date: date ? date : "2100-01-01",
            visitor: visitor?.visitorByVisitor?.id
        }
    });
    const {data: dataAgg, error: errAgg, loading: loadAgg} = useSubscription(GET_VISIT_BY_VISTOR_AGG,{
        variables:{
            search: `%${search}%`,
            date: date ? date : "2100-01-01",
            visitor: visitor?.visitorByVisitor?.id
        }
    })
    const dateConverter=(date: any) =>{
        if(date  === null) return '--:--:--'
        const new_date = new Date(date).toLocaleTimeString('en-GB', {hour12: false})
        return new_date
    }
    useEffect(() =>{
        console.log("Visitor", visitor)
    },[visitor, dataVisits])
    return ( <>
        <main className="flex flex-col min-w-full min-h-full">
            <Group mb="xl">
                <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                    <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Visitor details </p>
            </Group>
            <div className="flex md:flex-row gap-5 flex-col">
                <div className=" lg:w-1/3" >
                    <Card withBorder>
                        <Card.Section>
                            <Image
                                // radius="md"
                                src={visitor?.visitorByVisitor?.fileByPhoto?.file_url}
                                h={200}
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />
                        </Card.Section>
                        <div className="flex flex-row justify-between items-center">
                            <p style={{color:'black', fontSize: 'xsmall', textTransform: "uppercase"}}> status </p>

                            <Badge mt="xs" variant="light" color={visitor?.visit_status?.status === 'PENDING' ? 'blue' : (visitor?.visit_status?.status === 'ACCEPTED' ? 'teal' : 'red')}>
                                {visitor?.visit_status?.status}</Badge>
                        </div>
                        <div className="flex flex-row justify-center " >
                            <p style={{fontWeight: 700, fontSize: 'medium', color: "black", textTransform: "capitalize", textAlign: "center"}}>
                                {visitor?.visitorByVisitor?.firstname + " " +visitor?.visitorByVisitor?.lastname}
                            </p>
                            {/* <Stack gap={3}>
                        <Text size="sm" c='dimmed'> {`Clock in: ${dateConverter(visitor?.check_in_at)}`} </Text>
                        <Text size="sm" c='dimmed'> {`Clock out: ${dateConverter(visitor?.check_out_at)}`} </Text>
                    </Stack> */}
                        </div>
                        <div className="flex flex-col mt-9" >
                            <div className="flex flex-row justify-between " >
                                <Group>
                                    <IconPhone style={{width: rem(16), height: rem(16)}} stroke={1} />
                                    <Text c='black'>  Phone </Text>
                                </Group>
                                <Text c='dimmed'> {visitor?.visitorByVisitor?.phone_number} </Text>
                            </div>
                            <Divider mt={2} mb={15} />
                            <div className="flex flex-row justify-between " >
                                <Group>
                                    <IconId style={{width: rem(16), height: rem(16)}} stroke={1}/>
                                    <Text c='black'> Id Number </Text>
                                </Group>
                                <Text c='dimmed'> {visitor?.visitorByVisitor?.id_number} </Text>
                            </div>
                            <Divider mt={2} mb={5} />
                            <div className="flex flex-row justify-between " >
                                <Group>
                                    <IconIdBadge style={{width: rem(16), height: rem(16)}} stroke={1} />
                                    <Text c='black'> Reg No. </Text>
                                </Group>
                                <Text c='dimmed'> {visitor?.reg_no} </Text>
                            </div>
                            <Divider mt={2} mb={5} />
                        </div>
                        <p style={{ textAlign: 'center', color: "#404040", fontWeight: 700 }}> Host </p>
                        <Group>
                            <p style={{color: "#404040", fontWeight: 500, textTransform: 'capitalize'}}> {visitor?.employee?.firstname} </p>
                            <p style={{color: "#404040", fontWeight: 500, textTransform: 'capitalize'}}> {visitor?.employee?.lastname} </p>
                        </Group>
                        <div className="flex justify-center min-w-full mt-5 mb-5 gap-3">
                            <IconMapPin style={{width: rem(16), height: rem(16)}} stroke={1} />
                            <Text c='black'> {visitor?.visitorByVisitor?.company?.address} </Text>
                        </div>
                        <div className="flex justify-center min-w-full gap-2">
                            <p style={{color: "#404040", fontSize: 'smaller'}}> vvims</p>
                            <p style={{color: "#404040", fontSize: 'smaller'}}> -</p>
                            <p style={{color: "#404040", fontSize: 'smaller'}}>{visitor?.visitorByVisitor?.company?.abbrev} </p>
                        </div>

                        <Button disabled color={"#16DBCC"} fullWidth mt="md" radius="md">
                            Print Card
                        </Button>
                    </Card>
                </div>
                <div className="flex lg:w-2/3 flex-col w-full">
                    <Paper withBorder p="md" >
                        <p style={{color: "#404040", fontWeight: 700, textTransform: 'capitalize'}}> National Identity Card / Passport </p>
                        <div className="flex flex-col md:flex-row gap-5 mt-5">
                            <div className="flex flex-col">
                                <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Front</p>
                                <Image
                                    radius="md"
                                    src={visitor?.visitorByVisitor?.fileByFrontId?.file_url                        }
                                    h={200}
                                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                />

                            </div>
                            <div className="flex flex-col">
                                <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Back</p>
                                <Image
                                    radius="md"
                                    src={visitor?.visitorByVisitor?.fileByBackId?.file_url                       }
                                    h={200}
                                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                />

                            </div>
                        </div>
                    </Paper>
                    {/* <Paper shadow="md" radius="md" mt={'md'}> */}
                    {/* <Text fz="lg" fw={700} c="#fff">
                    Contact information
                </Text> */}

                    {/* <ContactIconsList /> */}
                    {/* </Paper> */}
                    <Paper radius="md" shadow="md" p="md" mt="lg" >
                        <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between">
                            <TextInput
                                value={search}
                                onChange={(event) => setSearch(event.currentTarget.value)}
                                leftSection={<IconSearch  style={{ width: rem(16), height: rem(16) }} />}
                                placeholder="search"
                            />
                            <DateInput
                                //@ts-ignore
                                value={date}
                                //@ts-ignore
                                onChange={setDate}
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
                        {
                            loadVisits || errVisits ?
                                <FullWidthSkeletonStack /> :
                                <VisitByVisitorTable
                                    datas={dataVisits?.visits}
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
                </div>
            </div>
        </main>
    </> );
}

export default Pages;