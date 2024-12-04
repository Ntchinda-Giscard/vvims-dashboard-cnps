import { gql } from "@apollo/client";

export const GET_EMPLOYEE_EVENTS = gql`
query GetAllEmployee {
  employees{
    id
    firstname
    lastname
  }
}`;