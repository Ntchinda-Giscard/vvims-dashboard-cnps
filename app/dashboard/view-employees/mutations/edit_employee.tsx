import { gql } from "@apollo/client";


export const UPDATE_EPLY = gql`
mutation UpdateEmployeeById($id: uuid!, $address: String, $email: String, $firstname: String, $function: String, $lastname: String, $license: String, $phone_number: String, $position_id: uuid, $region: String, $service_id: uuid, $supervisor_id: uuid, $department_id: uuid) {
  update_employees_by_pk(pk_columns: {id: $id}, _set: {address: $address, email: $email, firstname: $firstname, function: $function, lastname: $lastname, license: $license, phone_number: $phone_number, position_id: $position_id, region: $region, service_id: $service_id, supervisor_id: $supervisor_id, department_id: $department_id}) {
    id
  }
}`;