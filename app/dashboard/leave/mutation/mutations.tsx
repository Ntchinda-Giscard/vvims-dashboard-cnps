import { gql } from "@apollo/client";

export const INSERT_LEAVE = gql`
  mutation InsertLeave($comment: String!, $employee_id: uuid!, $end_date: date!, $start_date: date!, $leave_type: leave_type_enum!, $other_description: String = null, $file: String = null, $end_time: time = null, $start_time: time = null) {
  insert_leaves_one(object: {comment: $comment, employee_id: $employee_id, end_date: $end_date, status: PENDING, start_date: $start_date, leave_type: $leave_type, other_description: $other_description, file: $file, end_time: $end_time, start_time: $start_time}) {
    id
  }
}`;


export const DELETE_LEAVE = gql`
mutation DeleteLeave($id: uuid! ) {
  delete_leaves_by_pk(id: $id) {
    id
  }
}`;


export const ACCEPT_LEAVE = gql`
mutation AcceptLeave($id: uuid!, $approver_id: uuid! ) {
  update_leaves_by_pk(pk_columns: {id: $id}, _set: {status: ACCEPTED}) {
    id
  }
  insert_leave_approval_one(object: {approval_status: ACCEPTED, approver_id: $approver_id, leave_id: $id}) {
    id
  }
}`;

export const REJECT_LEAVE = gql`
mutation RejectLeave($id: uuid!, $approver_id: uuid!, $comments: String!) {
  update_leaves_by_pk(pk_columns: {id: $id}, _set: {status: REJECTED}) {
    id
  }
  insert_leave_approval_one(object: {approval_status: REJECTED, approver_id: $approver_id, leave_id: $id, comments: $comments}) {
    id
  }
}`;