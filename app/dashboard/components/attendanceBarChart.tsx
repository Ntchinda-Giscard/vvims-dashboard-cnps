import { useQuery } from "@apollo/client";
import {BarChart} from "@mantine/charts";
import { GET_ATTENDANE_WEEK } from "../query/get_percent";
import {useEffect} from "react"



export default function AttendanceOverviewBarChart(){
    const {data, error, loading} = useQuery(GET_ATTENDANE_WEEK);

    useEffect(() =>{
        console.log("Attendace group", data)
    }, [data])

    return(
        <BarChart
            h={500}
            styles={{
                legend:{
                    color: "#404040"
                }
            }}
            data={data ? data?.getAttendanceByDay : []} 
            series={[
                
                {name: 'onTimeEmployees', label: 'Ontime employees', color: 'blue.6'},
                {name: 'presentEmployees', label: 'Present employees', color: '#DCFAF8'},
                {name: 'lateEmployees', label: 'Late employees', color: '#C9B7EC'},
            ]} 
            dataKey={"day"}
            withLegend
            xAxisLabel="Days"
            yAxisLabel="Amout"
            barProps={{radius: 10, width: 20}}
            type="stacked"
        />
    )
}