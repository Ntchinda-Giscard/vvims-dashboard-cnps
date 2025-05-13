import { gql } from "@apollo/client";

export const GET_LEAVE_TYPE = gql`
query GetType @cached {
  leave_type {
    type
  }
}`;

export const GET_LEAVE_AGG = gql`
query MyQuery {
  leaves_aggregate {
    aggregate {
      count
    }
  }
}`;

export const GET_LEAVES = gql`
query GetLeaves($limit: Int!, $offset: Int!) {
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
        department{
          text_content{
            content
          }
        }
        service{
          text_content{
            content
          }
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
query MyQuery {
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
  query MyQuery {
    leaves_aggregate {
      aggregate {
        count
      }
    }
  }`;


export const GET_LEAVE_ACCEPTED = gql`
  query MyQuery {
    leaves_aggregate(where: {status: {_eq: ACCEPTED}}) {
      aggregate {
        count
      }
    }
  }`;


export const GET_AGG_BERIEVED = gql`
    query MyQuery($employee_id: uuid!) {
        leaves_aggregate(where: {leave_type: {_eq: BEREAVE}, employee_id: {_eq: $employee_id}}) {
            aggregate {
                count
            }
        }
    }`;

export const GET_AGG_MAT = gql`
  query MyQuery($employee_id: uuid!) {
    leaves_aggregate(where: {leave_type: {_eq: MATERNITY}, employee_id: {_eq: $employee_id}}) {
      aggregate {
        count
      }
    }
  }`;

export const GET_AGG_SICK = gql`
  query MyQuery($employee_id: uuid! ) {
    leaves_aggregate(where: {leave_type: {_eq: SICK}, employee_id: {_eq: $employee_id}}) {
      aggregate {
        count
      }
    }
  }`;

export const GET_AGG_OTH = gql`
  query MyQuery($employee_id: uuid = "") {
    leaves_aggregate(where: {leave_type: {_eq: OTHER}, employee_id: {_eq: $employee_id}}) {
      aggregate {
        count
      }
    }
  }`;