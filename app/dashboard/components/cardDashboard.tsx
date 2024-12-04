import { ThemeIcon, RingProgress, Text } from '@mantine/core'
import {  useEffect } from 'react'
import classes from "@/app/dashboard/components/css/dashboard.module.css";
import {IconInfoHexagon, IconUserX, IconUserShare, IconUsersGroup, IconUsers} from "@tabler/icons-react";
import { useQuery, useSubscription } from '@apollo/client';
import {GET_PERCENT, GET_TASK_COMPLETION, GET_TOT_LEAVE_EMPLOYEE, GET_VISITS_DAY} from '../query/get_percent';
import { useSelector } from 'react-redux';
import { GET_PRESENT_EMPLOYEES, GET_TOTAL_EMPLOYEE} from '../attendance/queries/get_total_empl';


function CardDashboard() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataPerc, error: errData, loading: loadData} = useQuery(GET_PERCENT);
    const {data: dataVisits} = useSubscription(GET_VISITS_DAY);
    const {data: dataTotLeave, error: errLeaaveTot, loading: loadLeaveTot} = useQuery(GET_TOT_LEAVE_EMPLOYEE);
    const {data: dataTaskPerc, error: errTaskPerc, loading: loadTaskPerc} = useQuery(GET_TASK_COMPLETION, {
        variables:{
            id: user?.employee?.id
        }
    });
    const {loading: loadAbsent, data: dataPresent, error: errAbsent} = useSubscription(GET_PRESENT_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })

    const {loading: loadTotalEmpl, data: dataEmpl, error: errTotalEmpl} = useSubscription(GET_TOTAL_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    });

    const {data: dataOnLeave, error: errONLeave, loading: loadOnLeave} = useQuery(GET_TOT_LEAVE_EMPLOYEE);
    useEffect(() =>{
      console.log("Total percentage:", dataTaskPerc)
    }, [dataTaskPerc ]);

    const data = [
      { icon: IconUsersGroup, title: "Total Employees", desc: "Tracking leave request", value: dataEmpl?.employees_aggregate?.aggregate?.count, color: "rgba(63, 36, 199, 0.18)" },
      { icon: IconUserShare, title: "On Leave", desc: "Tracking employees on leave in week", value: dataOnLeave ? dataOnLeave?.getTotalEmployeeOnLeave?.total : 0, color: "rgba(4, 32, 189, 0.19)"},
      { icon: IconUserX, title: "Absent employee", desc: "Tracking absent employees", value: (dataEmpl?.employees_aggregate?.aggregate?.count - dataPresent?.employees_aggregate?.aggregate?.count), color: "rgba(4, 189, 183, 0.45)" },
      { icon: IconInfoHexagon, title: "Attendance Percentage", desc: "Tracking attendance", value: `${dataPerc?.getAttendancePercentage?.attendancePercentage? dataPerc?.getAttendancePercentage?.attendancePercentage : 0}%`, color: "rgba(22, 189, 4, 0.29)" },
  ];
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
//   if (errTotalEmpl) return <div style={{color: "#404040"}}> {`${errTotalEmpl}`} </div>
    return (<>


        <div className="grid md:grid-cols-3 gap-4 h-full grid-cols-1 m-0 ">
            {/* First Column */}
            <div className="col-span-1 h-full flex flex-col gap-4 m-0">
                <div className={classes.card}>
                    <div className="flex flex-row w-full h-full items-center justify-between">

                        <RingProgress
                            size={120}
                            thickness={15}
                            roundCaps
                            sections={[
                                {value: dataTaskPerc?.getPercentageTask?.percentage, color: 'blue'}
                            ]}
                            label={
                                <Text className={`${classes.taskStat}`}
                                      ta='center'> {dataTaskPerc?.getPercentageTask?.percentage}% </Text>
                            }
                        />

                        <div className="flex flex-col gap-1">
                            <p className={classes.title}> Task completion </p>
                            <p className={classes.desc}> Tracking task completion </p>
                        </div>
                    </div>
                </div>
                <div key={'9'} className={classes.card}>
                    <div style={{marginBottom: 10}} className="flex flex-row justify-between mb-3 items-center">
                        <ThemeIcon radius="xl" size={70} color={'#FFF007'}>
                            <IconUsers color="black" stroke={1} style={{width: '60%', height: '60%'}}/>
                        </ThemeIcon>
                        <span className={classes.value}> {dataVisits?.visits_aggregate?.aggregate?.count} </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className={classes.title}> {'Daily Visits'} </p>
                        <p className={classes.desc}> {'Tracking daily visits'} </p>
                    </div>
                </div>
            </div>


            {/* Second Column */}
            <div className="col-span-2">
                <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                    {
                        data.map((item, index) => (
                            <div key={item?.desc} className={classes.card}>
                                <div style={{marginBottom: 10}}
                                     className="flex flex-row justify-between mb-3 items-center">
                                    <ThemeIcon radius="xl" size={70} color={item?.color}>
                                        <item.icon color="black" stroke={1} style={{width: '60%', height: '60%'}}/>
                                    </ThemeIcon>
                                    <span className={classes.value}> {item?.value} </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className={classes.title}> {item?.title} </p>
                                    <p className={classes.desc}> {item?.desc} </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    </>)
        ;
}

export default CardDashboard;