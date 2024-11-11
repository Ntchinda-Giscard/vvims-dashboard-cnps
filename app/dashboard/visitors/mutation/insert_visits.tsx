import { gql } from "@apollo/client";

export const INSERT_VISITS = gql`
mutation InsertVisits($host_employee: uuid = null, $host_service: uuid = null, $host_department: uuid = null, $reason: String!, $vehicle: uuid = null, $visitor: uuid!) {
  insert_visits_one(object: {status: PENDING, host_employee: $host_employee, host_service: $host_service, host_department: $host_department, reason: $reason, vehicle: $vehicle, visitor: $visitor}) {
    id
  }
}`


export const INSERT_VISITS_VISITOR = gql`
mutation MyMutation2($firstname: String!, $id_number: String!, $lastname: String!, $phone_number: String!, $reason: String!, $host_department: uuid = null, $host_employee: uuid = null, $host_service: uuid = null, $vehicle: uuid = null, $company_id: uuid!) {
  insert_visitors_one(object: {visits: {data: {reason: $reason, host_department: $host_department, host_employee: $host_employee, host_service: $host_service, vehicle: $vehicle, status: PENDING}}, id_number: $id_number, lastname: $lastname, phone_number: $phone_number, firstname: $firstname, company_id: $company_id}) {
    id
  }
}`


export const ACCEPT_VISITS = gql`
mutation AcceptVisit($id: uuid!) {
  update_visits_by_pk(pk_columns: {id: $id}, _set: {status: ACCEPTED, check_in_at: now, date: now}) {
    id
  }
}`;


export const REJECT_VISITS = gql`
mutation RejectVisit($id: uuid!) {
  update_visits_by_pk(pk_columns: {id: $id}, _set: {status: REJECTED}) {
    id
  }
}`

export const CHECK_OUT_VISIT = gql`
mutation CheckOutVisitor($id: uuid!) {
  update_visits_by_pk(pk_columns: {id: $id}, _set: {check_out_at: now}) {
    id
  }
}`;

export const UPDATE_VISITS = gql`
mutation MyMutation($id: uuid!, $reason: String, $vehicle: uuid, $visitor: uuid, $host_department: uuid, $host_employee: uuid, $host_service: uuid) {
  update_visits_by_pk(pk_columns: {id: $id}, _set: {reason: $reason, vehicle: $vehicle, visitor: $visitor, host_department: $host_department, host_employee: $host_employee, host_service: $host_service}) {
    id
  }
}`;

export const UPDATE_VISITOR = gql`
mutation MyMutation($id: uuid!, $phone_number: String, $lastname: String, $id_number: String, $firstname: String) {
  update_visitors_by_pk(pk_columns: {id: $id}, _set: {phone_number: $phone_number, lastname: $lastname, id_number: $id_number, firstname: $firstname}) {
    id
  }
}
`