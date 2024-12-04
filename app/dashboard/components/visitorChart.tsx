"use client"
import { useQuery } from '@apollo/client';
import { BarChart } from '@mantine/charts';
import {useEffect} from 'react';
import { VISITI_GB_DAY } from '../query/get_percent';


export default function VisitorChart() {

    const {data, error, loading} = useQuery(VISITI_GB_DAY);

    useEffect(() => {
        console.log("Visitor data", data)
    }, [data])

    if (error) return <div> {`${error}`} </div>
  return (
    <BarChart
      h={500}
      withLegend
      styles={{
        legend:{
            color: "#404040"
        }
    }}
      data={ data ? data?.getVisitsByDay : []}
      dataKey="visitDay"
      series={[{ name: 'visitorCount', color: 'blue' }]}
      xAxisLabel="Day"
      yAxisLabel="Amout"
      barProps={{radius: 10, width: 20}}
    />
  );
}