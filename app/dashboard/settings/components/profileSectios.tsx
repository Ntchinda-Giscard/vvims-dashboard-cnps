"use client"
import { Avatar, Button, Card, Group, Text, Badge } from '@mantine/core';
import classes from './UserCardImage.module.css';
import {useSelector} from "react-redux";
import {useSubscription, useQuery} from "@apollo/client";
import {GET_EMP} from "@/app/dashboard/query/notif";
import {useEffect, useState } from 'react';
import {ATTENDANCE_OF_EMPLOYEE, EMPLOYEES_LEAVES, VISITS_OF_EMPLOYEE} from "@/app/dashboard/settings/query/query";



export function UserCardImage() {
    const user = useSelector((state: any) => state.auth.userInfo);
    const [pp, setPP] = useState('')
    const {data, loading, error} = useSubscription(GET_EMP,{
        variables:{
            id: user?.employee?.id
        }
    });
    const {data: dataVisits} = useQuery(VISITS_OF_EMPLOYEE, {
        variables:{
            host_employee: user?.employee?.id
        }
    });
    const {data: dataLeaves} = useQuery(EMPLOYEES_LEAVES, {
        variables:{
            employee_id: user?.employee?.id
        }
    })

    const {data: dataAtt} = useQuery(ATTENDANCE_OF_EMPLOYEE,{
        variables:{
            employee_id: user?.employee?.id
        }
    })
    const stats = [
        { value: `${dataVisits?.visits_aggregate?.aggregate?.count}`, label: 'Visits' },
        { value: `${dataLeaves?.leaves_aggregate?.aggregate?.count}`, label: 'Leaves' },
        { value: `${dataAtt?.attendance_aggregate?.aggregate?.count}`, label: 'Presence' },
    ];

    useEffect(() =>{
        setPP(data?.employees_by_pk?.file?.file_url)
        console.log("Profile image", user)
    }, [data])
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
            <Card.Section
                h={140}
                style={{
                    backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1671580362598-babe0f2d5967?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
            />
            <Avatar
                // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                src={pp}
                size={150}
                color={'initials'}
                name={`${user?.employee?.firstname} ${user?.employee?.lastname}`}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text ta="center" tt={'capitalize'} fz="lg" fw={500} mt="sm">
                {`${user?.employee?.firstname} ${user?.employee?.lastname}`}
            </Text>
            <Text ta="center" tt={'capitalize'} fz="sm" c="dimmed">
                {user?.employee?.function}
            </Text>
            <Group mt="md" justify="center" gap={30}>
                {items}
            </Group>
            <Badge fullWidth variant={'light'} radius="md" mt="xl" size="xl"> ACTIVE </Badge>
            {/*<Button fullWidth  variant="default">*/}
            {/*    Follow*/}
            {/*</Button>*/}
        </Card>
    );
}