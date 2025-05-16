"use client"
import { Paper, RingProgress, Progress, Group, Text, Stack } from "@mantine/core";
import classes from "@/app/dashboard/leave/components/styles.module.css";
import { useQuery } from "@apollo/client";
import {GET_AGG_BERIEVED, GET_AGG_MAT, GET_AGG_OTH, GET_AGG_SICK, GET_LEAVE_TYPE} from "../queries/queries";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key, useEffect } from "react";
import {useSelector} from "react-redux";

function LeaveTypesGroupAgg() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataLeaveType, loading: leaveTypeLoad} = useQuery(GET_LEAVE_TYPE);
    const {data: dataAggB} = useQuery(GET_AGG_BERIEVED, {
        variables:{
            employee_id: user?.employee?.id
        }
    });

    const {data: dataAggM} = useQuery(GET_AGG_MAT, {
        variables:{
            employee_id: user?.employee?.id
        }
    });

    const {data: dataAggS} = useQuery(GET_AGG_SICK, {
        variables:{
            employee_id: user?.employee?.id
        }
    });

    const {data: dataAggO} = useQuery(GET_AGG_OTH, {
        variables:{
            employee_id: user?.employee?.id
        }
    });

    useEffect(() =>{
        console.log("Leave types: ", dataLeaveType)
    }, [dataLeaveType])
    return ( <>

        <Paper
            p={"md"}
            withBorder
            className="w-full md:w-1/2"
            radius={'lg'}
            mt={'md'}
        >
            <p className={classes.cardTitle}> Comsumed leave types </p>
            <div className="grid grid-cols-2 gap-x-4 items-center" >
                <div className="grid grid-cols-2 gap-x-4">
                    {leaveTypeLoad? (
                        <p>Loading...</p>
                    ) : (
                        dataLeaveType?.leave_type?.map((leaveType: {
                            type: ReactNode; leave_type_name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; total_consumed_leave_days: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
    }, index: Key | null | undefined) => (
                            <div key={index} className={`flex gap-1`} >
                                <p className={classes.leaveTypes}>{leaveType?.type}</p>
                                <p className={classes.leaveLabel}>{'leave'}</p>
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-end">
                    
                    <RingProgress
                        size={115}
                        thickness={10}
                        roundCaps
                        sections={[
                            {value: (dataAggB?.leaves_aggregate?.aggregate?.count + dataAggM?.leaves_aggregate?.aggregate?.count + dataAggS?.leaves_aggregate?.aggregate?.count + dataAggO?.leaves_aggregate?.aggregate?.count)/48, color: 'blue.7'}
                        ]}
                        label={
                            <Text c={'black'} fw={700} ta={'center'} >
                                {dataAggB?.leaves_aggregate?.aggregate?.count + dataAggM?.leaves_aggregate?.aggregate?.count + dataAggS?.leaves_aggregate?.aggregate?.count + dataAggO?.leaves_aggregate?.aggregate?.count}
                            </Text>
                        }
                    />
                </div>
            </div>
            <Stack>
                <LeaveProgressConsumed consumed={dataAggB?.leaves_aggregate?.aggregate?.count} text={'BL'} />
                <LeaveProgressConsumed consumed={dataAggM?.leaves_aggregate?.aggregate?.count} text={'ML'} />
                <LeaveProgressConsumed consumed={dataAggS?.leaves_aggregate?.aggregate?.count} text={'SL'} />
                <LeaveProgressConsumed consumed={dataAggO?.leaves_aggregate?.aggregate?.count} text={'OL'} />
            </Stack>


        </Paper>
    
    </> );
}

export default LeaveTypesGroupAgg;



function LeaveProgressConsumed({text, consumed, total}: any){
    return(
        <>
          <Group justify="space-between">
            <Text fz="xs" c="#404040" fw={700}>
              {text}
            </Text>
            <Text fz="xs" c="dark" fw={700}>
                {`${consumed}/12`}
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={consumed/12}
              color=""
            />

            <Progress.Section
            //   className={classes.progressSection}
              value={100 -(consumed/12)}
              color="gray.1"
            />
            </Progress.Root>
        </>
    )
}