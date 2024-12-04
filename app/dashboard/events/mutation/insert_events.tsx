import { gql } from "@apollo/client";


export const INSERT_EVENTS  = gql`
mutation MyMutation($start_date: date!, $title: String!, $description: String, $end_time: time!, $start_time: time!, $participants: [event_participants_insert_input!]!, $orgenizer_id: uuid!) {
  insert_events_one(object: {start_date: $start_date, title: $title, description: $description, end_time: $end_time, start_time: $start_time, event_participants: {data: $participants}, orgenizer_id: $orgenizer_id}) {
    id
  }
}`;


export const ACCEPT_EVENT = gql`
mutation MyMutation($id: UUID!) {
  acceptParticipateEvents(participant: {id: $id}) {
    id
  }
}`;


export const DECLINE_EVENTS = gql`
mutation MyMutation($id: UUID!) {
  declineParticipateEvents(participant: {id: $id}) {
    id
  }
}`;