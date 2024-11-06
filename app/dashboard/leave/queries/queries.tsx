import { gql } from "@apollo/client";

export const GET_LEAVE_TYPE = gql`
query GetType @cached {
  leave_type {
    type
  }
}`;

export const GET_LEAVE_AGG = gql`
subscription MyQuery {
  leaves_aggregate {
    aggregate {
      count
    }
  }
}`;

export const GET_LEAVES = gql`
subscription GetLeaves($limit: Int!, $offset: Int!) {
  leaves(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    id
    status
    start_date
    leave_type
    end_date
    comment
    employee {
      id
      lastname
      firstname
      function
      file {
        id
        file_url
      }
    }
  }
}`;

export const GET_LEAVES_APPROVAL_STATUS = gql`
query MyQuery($leave_id: uuid!) {
  leave_approval(where: {leave_id: {_eq: $leave_id}}) {
    id
    comments
    approval_status
  }
}`


export const GET_PENDING_LEAVES_AGG = gql`
subscription MyQuery {
  leaves_aggregate(where: {status: {_eq: PENDING}}) {
    aggregate {
      count
    }
  }
}`;


export const GET_EMPLOYEE_ON_LEAVE = gql`
query MyQuery {
  employees {
    leaves_aggregate(where: {status: {_eq: ACCEPTED}}) {
      aggregate {
        count
      }
    }
  }
}`;




export const GET_MONTH_LEAVE = gql`
subscription GetLeaveMonth{
  get_monthly_leaves {
    accepted_leaves_count
  }
}`;