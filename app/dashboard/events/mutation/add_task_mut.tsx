import { gql } from "@apollo/client";


export const ADD_TASK = gql`
    mutation MyMutation($assigned_by: uuid!, $assigned_to: uuid!, $event_id: uuid!, $title: String! , $description: String! ) {
        insert_tasks_one(object: {assigned_by: $assigned_by, assigned_to: $assigned_to, event_id: $event_id, title: $title, description: $description}) {
            id
        }
    }
`;