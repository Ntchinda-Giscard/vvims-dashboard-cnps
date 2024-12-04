import { gql } from "@apollo/client";

export const GET_NOTIF = gql`
subscription MySubscription {
  employee_notifications_stream(batch_size: 10, cursor: {initial_value: {is_read: false}}) {
    message
    title
  }
}`;

export const GET_EMP = gql`
subscription MyQuery($id: uuid!) {
  employees_by_pk(id: $id) {
    id
    password_change_at
    file {
      file_url
      id
    }
  }
}`;