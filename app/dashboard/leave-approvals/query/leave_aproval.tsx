import { gql } from "@apollo/client";


export const GET_LEAVE_APPROVALS = gql`
subscription MyQuery($offset: Int, $limit: Int) {
  leave_approval(order_by: {created_at: desc}, offset: $offset, limit: $limit) {
    approval_status
    comments
    id
    employee {
      id
      firstname
      lastname
      file {
        id
        file_url
      }
    }
    leave {
      employee {
        id
        firstname
        lastname
        file {
          file_url
          id
        }
      }
      leave_type
      other_description
      start_date
      end_date
      employee_id
    }
  }
}

`;


export const LEAVE_APPROVAL_AGG = gql`
subscription MyQuery {
  leave_approval_aggregate {
    aggregate {
      count
    }
  }
}`;