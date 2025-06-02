import { gql } from "@apollo/client";

export const CLOCK_IN = gql`
mutation ClockIn($employee_id: uuid!, $location: geometry = null, $building_id: uuid="d94085cf-286a-4895-b346-14401c69736d") {
  insert_attendance_one(object: {employee_id: $employee_id, location: $location, clock_in_date: now, building_id: $building_id}){
    id
  }
}`;



export const CLOCK_OUT = gql`
mutation ClockOut($employee_id: uuid!) {
  update_attendance(where: {clock_in_date: {_eq: now}, employee_id: {_eq: $employee_id}}, _set: {clock_out_time: now}) {
    affected_rows
  }
}`