import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE_PASSWORD = gql`
    mutation MyMutation($currentPassword: String!, $newPassword: String!, $phoneNumber: String!) {
        updateEmployeePassword(
            employeeInfo: {phoneNumber: $phoneNumber, currentPassword: $currentPassword, newPassword: $newPassword}
        ) {
            success
        }
    }`;

export const VISITS_OF_EMPLOYEE = gql`
    query MyQuery($host_employee: uuid!) {
        visits_aggregate(where: {host_employee: {_eq: $host_employee}}) {
            aggregate {
                count
            }
        }
    }`;

export const EMPLOYEES_LEAVES = gql`
    query MyQuery($employee_id: uuid!) {
        leaves_aggregate(where: {status: {_eq: ACCEPTED}, employee_id: {_eq: $employee_id}}) {
            aggregate {
                count
            }
        }
    }`;

export const ATTENDANCE_OF_EMPLOYEE = gql`
    query MyQuery($employee_id: uuid!) {
        attendance_aggregate(where: {employee_id: {_eq: $employee_id}}) {
            aggregate {
                count
            }
        }
    }
`;