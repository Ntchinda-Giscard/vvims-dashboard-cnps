"use client"
import {useEffect, useState} from "react";
import { useNextCalendarApp, ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css';
import { GET_EVENTS_CALENDAR} from "@/app/dashboard/calendar/query/query";
import { useQuery } from "@apollo/client";
import {useSelector} from "react-redux";
import {convertToEventArray} from "@/app/dashboard/calendar/utils/convertToArray";

export default function MyCalendar(){
    const [events, setEvents] = useState();
    const userInfo = useSelector((state: any) => state.auth.userInfo)
    const {data: dataEvent, loading: loadEvent, error: errEvents} = useQuery(GET_EVENTS_CALENDAR, {
        variables:{
            employee_id: userInfo?.employee?.id
        }
    })

    const plugins = [createEventsServicePlugin()]
    const calendar = useNextCalendarApp({
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [
          {id: '1', title: 'Board meeting', start: '2024-11-29 08:00', end: '2024-11-29 09:00'},
          {id: '2', title: 'Reunion des Directeur', start: '2024-11-29 11:00', end: '2024-11-29 12:00'}
      ],
      selectedDate: new Date().toISOString().split('T')[0]
    }, plugins)
        // [
        // {id: '1', title: 'Reunion des Directeur', start: "2024-11-29 11:00", end: "2024-11-29 12:00"}
        // ]

    useEffect(() => {

      // fetching data
        const events = convertToEventArray(dataEvent)
        setEvents(events)
      // calendar.eventsService.getAll()

      console.log('Events converted :', events)
    }, [dataEvent]);

    
    return(
        <>
        <div className='relative w-full h-[500px]'>
          <ScheduleXCalendar
              calendarApp={calendar}
          />
            {/* <FullCalendar
                // plugins={[dayGridPlugin]}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                headerToolbar={{
                        start: "taday, prev,next", 
                        end: "dayGridMonth,timeGridWeek,timeGridDay", 
                        center: "title",
                    }
                }
            /> */}
        </div>
        </>
    )
}



function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }