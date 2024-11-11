import { gql } from "@apollo/client";


export const INSERT_APPOINTMENT = gql`
mutation InsertAppintment($employee_id: uuid!, $end_time: time!, $start_time: time!, $visitor_id: uuid!, $description: String, $date: date) {
  insert_appointments_one(object: {employee_id: $employee_id, end_time: $end_time, start_time: $start_time, status: PENDING, visitor_id: $visitor_id, description: $description, date: $date}) {
    id
  }
}`;

export const INSERT_APPOINTMENT_WITH_VISITOR = gql`
mutation InsertAppintmentWithVisits($employee_id: uuid!, $end_time: time!, $start_time: time!, $id_number: String, $lastname: String, $phone_number: String, $firstname: String, $description: String) {
  insert_appointments_one(object: {employee_id: $employee_id, end_time: $end_time, start_time: $start_time, status: PENDING, visitor: {data: {id_number: $id_number, lastname: $lastname, phone_number: $phone_number, firstname: $firstname}}, description: $description}) {
    id
  }
}`

export const UPDATE_APP_COM = gql`
mutation CompletedAppointment($id: uuid!) {
  update_appointments_by_pk(pk_columns: {id: $id}, _set: {status: COMPLETED}) {
    id
  }
}`

export const CANCEL_APP = gql`
mutation CanceledAppointment($id: uuid!) {
  update_appointments_by_pk(pk_columns: {id: $id}, _set: {status: CANCELED}) {
    id
  }
}
`