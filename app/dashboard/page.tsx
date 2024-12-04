"use client"
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";
import CardDashboard from "./components/cardDashboard";
import GraphSection from "./components/graphSection";
import LoogedCars from "./components/loogedCars";
import { useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { GET_ALL_VISITS, GET_PERCENTAGE_DIFF } from "./queries/get_all_visits";
import { useSelector } from "react-redux";
import NewEvents from "./components/newEvents";
import { Paper } from "@mantine/core";
import RecentAppointment from "./components/recentAppointment";
import LeaDashOverview from "./components/leaveDashOverview";





const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
  const user = useSelector((state: any) => state.auth.userInfo);

  const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_ALL_VISITS,{
    variables:{
      company_id: user?.employee?.company_id
    }
  })
  const {data: dataPercent} = useSubscription(GET_PERCENTAGE_DIFF)


  useEffect(() =>{
    console.log(user)
    const askNotificationPermission = async () => {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
        return;
      }

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Optionally, you can show an initial notification here
        new Notification("You will receive notifications!");
      } else {
        console.log('Notification permission denied.');
      }
    };

    // Call the function to request permission
    askNotificationPermission();
    console.log(dataPercent)
  },[dataAgg, dataPercent])
  return (
      <main className="flex min-h-full flex-col gap-3">
        <p className={cx([classes.heading, font_heading.className])}> Dashboard </p>
        {/* <div className="flex flex-row justify-center gap-3"> */}
        <CardDashboard/>
        {/* </div> */}

        <div className="flex w-full justify-center flex-col lg:flex-row gap-3">
          <div className="flex w-full lg:w-3/4">
            <GraphSection/>
          </div>
          <div className="flex w-full lg:w-2/4">
            <Paper withBorder p={18} radius={"lg"} w="100%">
              <NewEvents/>
            </Paper>
          </div>
        </div>

        <div className="flex w-full gap-3 flex-col lg:flex-row">
          <div className="lg:w-4/12 w-full">
            <LoogedCars/>
          </div>

          <div className="lg:w-6/12 w-full">
            <RecentAppointment/>
          </div>
          <div className="lg:w-2/12 w-full">
            <LeaDashOverview/>
          </div>
        </div>
      </main>
  );
}
