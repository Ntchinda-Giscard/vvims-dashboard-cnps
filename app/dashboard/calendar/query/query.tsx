import { gql } from "@apollo/client";

export const GET_EVENTS_CALENDAR = gql`
    query MyQuery($employee_id: uuid!) {
        events(where: {event_participants: {employee_id: {_eq: $employee_id}}}) {
            start_date
            start_time
            end_time
            title
            id
        }
    }`;