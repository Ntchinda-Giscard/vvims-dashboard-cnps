import { gql } from "@apollo/client";

export const GET_REPORT = gql`
subscription GetReports($limit: Int = 10, $offset: Int = 0) {
  reports(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    report_link
    types
    to_date
    from_date
    id
    name
  }
}`;


export const REPORT_AGG = gql`
subscription MyQuery {
  reports_aggregate {
    aggregate {
      count
    }
  }
}`;


export const GET_EMPLOYEES_QUERY = gql`
query GetAllEmployee($company_id: uuid! ) {
  employees(where: {company_id: {_eq: $company_id}}) {
    id
    firstname
    lastname
    # department{
    #   id
    #   text_content{
    #     content
    #   }
    # }
    # service{
    #   id
    #   text_content{
    #     content
    #   }
    # }
  }
}`