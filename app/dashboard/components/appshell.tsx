"use client"
import { AppShell, Burger, Group, NavLink, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserTopButton from './userSectionTopBar';
import classes from "@/app/dashboard/components/css/topBar.module.css"
import { Poppins } from "next/font/google";
import cx from 'clsx';
import {links} from "@/app/dashboard/components/links";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { GET_EMP, GET_NOTIF } from '../query/notif';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/auth/login/slice/authSlice';
import { UserButton } from './userButton';



const poppins_logo = Poppins({ subsets: ["latin"], weight:["500"] });
const poppins_light = Poppins({ subsets: ["latin"], weight:["400"] });


export default function ResponsiveSizes(
    {
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>
) {
  const userInfo = useSelector((state: any) => state.auth.userInfo)
  const dispatch = useDispatch()
  const router = useRouter()
  const {data, loading, error} = useSubscription(GET_EMP,{
    variables:{
      id: userInfo?.employee?.id
    }
  });

  useEffect(()=>{
    console.log("Loging data :", data);
    if (new Date(userInfo?.employee?.password_change_at) < new Date(data?.employees_by_pk?.password_change_at)   ){
      console.log("Logout")
      dispatch(logout())
      router.push("/auth/login")
    }
  },[data])





  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  return (
      <AppShell
          header={{ height: { base: 60, md: 70, lg: 80 } }}
          navbar={{
            width: { base: 200, md: 200, lg: 200 },
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          padding="md"
      >
        <AppShell.Header styles={{
          header:{
            background: "#386BF6",
          }
        }}>
          <div className="flex flex-row min-w-full min-h-full items-center">

            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <div className="flex flex-row min-w-full items-center justify-between md:justify-between pl-4 pr-4">
              <span className={cx([classes.logo, poppins_logo.className])}>VVIMS <span style={{color: "#17DBCC"}}>®</span></span>
              <p className={classes.abrev}>CNPS</p>
              {/* <UserTopButton /> */}
              <UserButton
                  name={`${userInfo?.employee?.firstname} ${userInfo?.employee?.lastname}`}
                  url={data?.employees_by_pk?.file?.file_url}
                  email={userInfo?.employee?.email}

              />
            </div>
          </div>

        </AppShell.Header>
        <AppShell.Navbar
            styles={{
              navbar:{
              }
            }}
        >
          <div className="flex flex-col gap-3 scroll-smooth overflow-y-auto ">
            {links.map((l , index) => (
                // <div className="flex flex-row">
                <NavLink
                    href={l?.sub_links.length > 0 ? "" : l?.link}
                    className={cx([poppins_light.className, isActive(l?.link) ? classes.active : classes.inactive] )}
                    childrenOffset={28}
                    styles={{
                      children:{
                        color: "#404040"
                      }
                    }}
                    label= {l?.label}
                    key={l?.label}
                    active= { l?.sub_links.length < 0 ? isActive(l?.link) : false}
                    variant="filled"
                    leftSection={<l.icon size={"1rem"} stroke={1} />}
                    component={Link}
                >
                  {
                    l?.sub_links.length > 0 ?
                        <span>
                    {
                      l?.sub_links.map((sub, _) => (
                          <NavLink
                              href={sub?.link}
                              key={sub?.label}
                              label={sub?.label}
                              variant="subtle"
                              active={isActive(sub?.link)}
                              defaultOpened={isActive(sub?.link)}
                              component={Link}
                          />
                      ))
                    }
                  </span>
                        : null
                  }
                </NavLink>

            ))}
          </div>

        </AppShell.Navbar>
        <AppShell.Main styles={{ main: {backfround: "#D9D9D9"} }} >{children}</AppShell.Main>
      </AppShell>
  );
}