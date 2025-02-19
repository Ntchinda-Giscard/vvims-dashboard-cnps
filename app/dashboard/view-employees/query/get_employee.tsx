import { gql } from "@apollo/client";

export const GET_EMPLOYEE_SUB = gql`
subscription GetEmployee($limit: Int! , $offset: Int!, $search: String = "%%", $company_id: uuid!) {
  employees(limit: $limit, offset: $offset, 
    where: {
      company_id:{_eq: $company_id},
      _or:[ {firstname:{_ilike: $search}}, {lastname:{_ilike: $search}}, {phone_number: {_ilike: $search}}, {function: {_ilike: $search}} ]
    }) {
    id
    firstname
    function
    lastname
    status
    phone_number
    position {
      text_content {
        content
      }
      id
    }
    service {
      text_content {
        content
      }
      id
    }
    agency_id
    company_id
    service_id
    status
    department {
      id
      text_content {
        content
      }
    }
  }
}`;




export const GET_EMPL_PK = gql`
query GetEmployeeInfo($id: uuid!) @cached {
  employees_by_pk(id: $id) {
    id
    id_card_number
    lastname
    license
    phone_number
    position_id
    region
    status
    supervisor_id
    updated_at
    email
    department_id
    service_id
    function
    firstname
    address
  }
}`;