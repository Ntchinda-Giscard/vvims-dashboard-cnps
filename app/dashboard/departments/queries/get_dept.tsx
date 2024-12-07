import { gql } from "@apollo/client";

export const GET_DEPT = gql`
  subscription GetDeparment($company_id: uuid!, $limit: Int!, $offset: Int!) {
    departments(where: {company_id: {_eq: $company_id}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
      abrev_code
      agency_id
      chief_department
      company_id
      status
      created_at
      id
      name
      parent_department_id
      department {
        id
        text_content {
          id
          content
        }
      }
      text_content {
        id
        content
      }
      services_aggregate {
        aggregate {
          count
        }
      }
      employees_aggregate {
        aggregate {
          count
        }
      }
    }
  }`;


export const GET_DEPT_AGG = gql`
subscription MyQuery($company_id: uuid! ) {
  departments_aggregate(where: {company_id: {_eq: $company_id}}) {
    aggregate {
      count
    }
  }
}`


export const GET_ALL_DEPT = gql`
query GetAllDept($company_id: uuid!) {
  departments(where: {company_id: {_eq: $company_id}}) {
    id
    text_content {
      content
    }
  }
}`