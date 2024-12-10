"use client"
import { UnstyledButton, Group, Avatar, Text, rem, Menu, Indicator, ThemeIcon, Divider, Popover, Box, Button } from '@mantine/core';
import {IconLogout,
  IconBell,
  IconSettings,
  IconChevronRight,
  IconCalendar, IconChecks} from '@tabler/icons-react';
import {useRouter } from "next/navigation"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/auth/login/slice/authSlice';
import { useMediaQuery } from '@mantine/hooks';
import classes from '@/app/dashboard/components/css/topBar.module.css';
import { useEffect, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { GET_EVENT_NOTIF } from '../events/queries/event_notif';
import { ACCEPT_EVENT, DECLINE_EVENTS } from '../events/mutation/insert_events';
import Link from 'next/link'

export function UserButton({name, url, email}: any) {
  const notif_type = {
    EVENT : 'EVENT',
    MESSAGES : 'MESSAGES',
    VISITS : 'VISITS',
  }
  const userInfo = useSelector((state: any) => state.auth.userInfo)
  const dispatch = useDispatch();
  const router = useRouter();

  const matches = useMediaQuery('(min-width: 426px)');

  const {data: dataNotif} = useSubscription(GET_EVENT_NOTIF,{
    variables:{
      employee_id: userInfo?.employee?.id
    }
  });
  const [acceptEvents, {loading: acceptLoad}] = useMutation(ACCEPT_EVENT);
  const [declineEvent, {loading: declineLoad}] = useMutation(DECLINE_EVENTS);

  const acceptEventsPart = (id: any) =>{
    console.log('Accept notif', id)
    acceptEvents({
      variables:{
        id: id?.id
      }
    })
  }

  const declineEventsPart = (id: any) =>{
    console.log('Decline notif', id)
    declineEvent({
      variables:{
        id: id?.id
      }
    })
  }

  const [notif, setNotif] = useState()

  useEffect(() =>{
    console.log('Print notif', dataNotif)
    setNotif(dataNotif)
    console.log('Print notif', notif)
  }, [dataNotif])

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token")
    // Navigate to login page
    router.push('/auth/login');

  }

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);

    // Get components of the date
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options); // e.g., "Nov 21, 2024"

    const hours: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');

    return `${formattedDate} - ${hours}:${minutes}`;
  }

  function hasUnreadNotifications(employeeNotifications: any) {
    if(!employeeNotifications) return false
    return employeeNotifications?.filter((n: { type: string; }) => n?.type !== 'MESSAGES').some((notification: { is_read: boolean; }) => notification.is_read === false);
  }

  return (
      <UnstyledButton
          // className={classes.user}
          mr={20}
      >
        <Group gap={0}>

          <Menu
              withArrow
          >
            <div className="flex flex-row gap-4">
              <Popover
                  shadow="md"
                  radius="lg"
                  width={'lg'}
                  closeOnClickOutside={true}
                  styles={{
                    dropdown:{
                      padding: 0
                    }
                  }}
              >
                <Popover.Target>
                  <Indicator disabled={!hasUnreadNotifications(dataNotif?.employee_notifications)} color="red" size={10}>
                    <ThemeIcon variant="light" color="white">
                      <IconBell style={{ width: '70%', height: '70%' }} />
                    </ThemeIcon>
                  </Indicator>

                </Popover.Target>
                <Popover.Dropdown>
                  <div className={'flex w-full flex-row justify-between'}>
                    <p className={classes.notif}> Notifications </p>
                    <div className={'flex flex-row items-center'}>
                      <IconChecks color={'#007fff'} style={{width: 16, height: 16}} />
                      <Text fz={'xs'} td={'underline'} mr={'md'} style={{cursor: 'pointer'}} c={'blue'} > mark as read </Text>
                    </div>

                  </div>
                  <Divider my={'sm'}/>
                  {
                    dataNotif?.employee_notifications?.filter((n: { type: string; }) => n?.type !== 'MESSAGES')?.map((n : any) =>(
                        <Box py={10} px={20} key={n?.id} >
                          <div className="flex flex-row gap-5">
                            <ThemeIcon variant="light" radius="xl" size="lg">
                              <IconCalendar style={{ width: '70%', height: '70%' }} />
                            </ThemeIcon>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex flex-col">
                                <p className={classes.notif_title}> {`${n?.action}`} {`${n?.event?.employee?.firstname}`} <span className={classes.notif_desc}> added you to</span> {`${n?.title}`} </p>
                              </div>
                              <div className='flex flex-row'>
                                <p className={classes.notif_time}> {formatTimestamp(n?.created_at)} </p>
                              </div>
                              {
                                n?.event?.event_participants?.[0]?.status !== 'PENDING' ?
                                    null :
                                    <Group>
                                      <Button loading={acceptLoad} onClick={() => acceptEventsPart(n?.event?.event_participants?.[0])} variant="filled" color="blue" radius="md" size="xs" > Accept </Button>
                                      <Button loading={declineLoad} onClick={() => declineEventsPart(n?.event?.event_participants?.[0])} variant="outline" color="blue" radius="md" size="xs" > Decline </Button>
                                    </Group>
                              }
                            </div>
                          </div>
                          <Divider my={'xs'} />
                        </Box>
                    ))
                  }

                  <div className="flex flex-row items-center m-2 justify-end">
                    <Link href={"/dashboard/notifications"} style={{fontSize: 12, color: "blue", fontWeight: 300}}> view all </Link>
                    <IconChevronRight stroke={1} style={{width: 10, height: 10, color: "blue"}}/>
                  </div>

                </Popover.Dropdown>
              </Popover>

              <Avatar
                  src={url}
                  radius="xl"
                  name={name}
                  color={'initials'}
                  size={'sm'}
              />
            </div>
            <div style={{ flex: 1, display: matches ? 'block' : 'none' }}>
              <Text tt={'capitalize'} c={'white'} size="sm" fw={500}>
                {name}
              </Text>

              <Text c="dimmed" size="xs">
                {email}
              </Text>
            </div>
            <Menu.Target>
              <IconChevronRight color={'white'} style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item rightSection={<IconChevronRight size={16} stroke={1.5} />}>
                <Group>
                  <Avatar
                      radius="xl"
                      src={url}
                  />

                  <div>
                    <Text tt={'capitalize'} c={'black'} size="sm" fw={500}>
                      {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                      {email}
                    </Text>
                  </div>
                </Group>
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                  leftSection={<IconBell style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  component={Link}
                  href={'/dashboard/notifications'}
                  // onClick={handleLogout}
              >
                Notifications
              </Menu.Item>
              <Menu.Item
                  leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  component={Link}
                  href={'/dashboard/settings'}
                  // onClick={handleLogout}
              >
                Settings
              </Menu.Item>
              <Menu.Item
                  leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  onClick={handleLogout}
                  color={'red'}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </UnstyledButton>
  );
}
