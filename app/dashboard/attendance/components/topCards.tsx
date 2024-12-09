"use client"
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
    IconUserX,
    IconUsersGroup,
    IconUserCheck,
    IconUserExclamation,
    IconUserOff,
    IconUserPin,
    IconArrowUpRight,
    IconArrowDownRight, IconClock,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import {
    GET_ABSENT_EMPLOYEE,
    GET_LATE_EMPLOYEES,
    GET_ONTIME_EMPLOYEES,
    GET_PRESENT_EMPLOYEES,
    GET_TOTAL_EMPLOYEE
} from "@/app/dashboard/attendance/queries/get_total_empl";
import { useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const icons = {
    user: IconUsersGroup,
    discount: IconUserX,
    receipt: IconUserCheck,
    coin: IconUserExclamation,
    absent: IconUserOff,
    present: IconUserPin,
};



export default function StatsGrid({time, date, is_late}: any) {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {loading: loadTotalEmpl, data: dataEmpl, error: errTotalEmpl} = useSubscription(GET_TOTAL_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadPresent, data: dataPresent, error: errPresent } = useSubscription(GET_PRESENT_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadOnTime, data: dataOnTime, error: errOnTime} = useSubscription(GET_ONTIME_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadLate, data: dataLate, error: errLate} = useSubscription(GET_LATE_EMPLOYEES,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {loading: loadAbsent, data: dataAbsent, error: errAbsent} = useSubscription(GET_ABSENT_EMPLOYEE,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    useEffect(() =>{
        console.log(dataEmpl)
        if(errTotalEmpl){
            console.log("Error", errTotalEmpl)
        }
    }, [dataEmpl, dataPresent, dataLate, dataAbsent, dataOnTime])


    const data = [
        // { title: 'Total employee', icon: 'user', value: dataEmpl?.employees_aggregate?.aggregate?.count, diff: 0 },
        { title: 'Present employee', icon: 'present', value: dataPresent?.employees_aggregate?.aggregate?.count, diff: 0 },
        { title: 'On time employee', icon: 'receipt', value: dataOnTime?.employees_aggregate?.aggregate?.count, diff: 0 },
        { title: 'Late employee', icon: 'coin', value: dataLate?.employees_aggregate?.aggregate?.count, diff: 0 },
        { title: 'Absent employee', icon: 'discount', value: (dataEmpl?.employees_aggregate?.aggregate?.count - dataPresent?.employees_aggregate?.aggregate?.count), diff: 0 },
    ]
    const time_extract = (datetime: any) => {
        if (datetime === null) {
            return "--:--:--";
        }
        const date = new Date(datetime);
        const options = { timezone: 'Africa/Douala', hour12: false };
        return date.toLocaleTimeString('en-US', options);
    };

    function formatDate(dateStr: any) {
        const date = new Date(dateStr);

        // List of month names
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Extract parts of the date
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        // Return formatted date
        return `${month} ${day}, ${year}`;
    }

    const stats = data.map((stat) => {
        //@ts-ignore
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper w={"100%"} withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="#404040" className={classes.title}>
                        {stat.title}
                    </Text>
                    <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className={classes.value} style={{color: "#404040"}} >{stat.value}</Text>
                    <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                        <span>{stat.diff}%</span>
                        <DiffIcon size="1rem" stroke={1.5} />
                    </Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous day
                </Text>
            </Paper>
        );
    });
    return (

        <div className={"flex gap-3 flex-col-reverse min-w-full justify-center md:flex-row md:justify-between"} >
            {stats}
            <Paper w={"100%"} withBorder p="md" radius="md">
                <Group justify="space-between">
                    <Text size="xs" c="#404040" className={classes.title}>
                        {"Time"}
                    </Text>
                    <IconClock className={classes.icon} size="1.4rem" stroke={1.5} />
                </Group>
                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className={classes.value} fw={900} fz={'lg'} c={is_late ? 'red' : 'teal'} >{time_extract(time)}</Text>
                    <Text  fz="sm" c={'dimmed'} fw={500} className={classes.diff}>
                        <span> GMT+1</span>
                    </Text>
                </Group>

                <Text fz="sm" fw={500} c="#404040" mt={7}>
                    {formatDate(date)}
                </Text>
            </Paper>
        </div>

    );
}