import {gql, useSubscription} from "@apollo/client";


export const GET_EVENT_PARTICIPANTS = gql`
  query MyQuery($event_id: uuid!) {
    event_participants(where: {event_id: {_eq: $event_id}}) {
      status
      id
      employee {
        email
        firstname
        lastname
        id
        phone_number
      }
    }
  }
`;

export const GET_EVENT_AGG = gql`
  subscription MyQuery {
    events_aggregate {
      aggregate {
        count
      }
    }
  }`;

export const GET_PENDING_EVENTS = gql`
  subscription MyQuery($limit: Int, $offset: Int) {
    events(limit: $limit, offset: $offset, where: {
      _and:[
        {end_date:{_eq: now}},
        {start_time: {_lt: now} },
        {end_time: {_lt: now} }
      ]
    }) {
      id
      title
      start_date
      start_time
      end_time
      event_participants {
        employee {
          firstname
          lastname
          id
          file {
            file_url
            id
          }
        }
      }
      event_participants_aggregate {
        aggregate {
          count
        }
      }
      tasks_aggregate {
        aggregate {
          count
        }
      }
      employee {
        id
        firstname
        lastname
        file {
          id
          file_url
        }
      }
    }
  }
`;

export const GET_COMPLETED_EVENTS = gql`
  subscription MyQuery($limit: Int, $offset: Int, $_gt: time = now, $_gt1: date = now) {
    events(limit: $limit, offset: $offset, where: {end_time: {_gt: $_gt}, end_date: {_gt: $_gt1}}) {
      id
      title
      start_date
      start_time
      end_time
      event_participants {
        employee {
          firstname
          lastname
          id
          file {
            file_url
            id
          }
        }
      }
      event_participants_aggregate {
        aggregate {
          count
        }
      }
      tasks_aggregate {
        aggregate {
          count
        }
      }
      employee {
        id
        firstname
        lastname
        file {
          id
          file_url
        }
      }
    }
  }`;

export const GET_EVENTS = gql`
  subscription MyQuery($limit: Int, $offset: Int) {
    events(limit: $limit, offset: $offset) {
      id
      title
      start_date
      start_time
      end_time
      event_participants {
        employee {
          firstname
          lastname
          id
          file {
            file_url
            id
          }
        }
      }
      event_participants_aggregate {
        aggregate {
          count
        }
      }
      tasks_aggregate {
        aggregate {
          count
        }
      }
      employee {
        id
        firstname
        lastname
        file {
          id
          file_url
        }
      }
    }
  }
`;


export const GET_TASK = gql`
  subscription MyQuery($event_id: uuid!) {
  tasks(where: {event_id: {_eq: $event_id}}) {
    id
    title
    event_id
    description
    employee {
      id
      firstname
      lastname
    }
    employeeByAssignedTo {
      id
      lastname
      firstname
    }
  }
}`;

export const GET_AGG_TASK = gql`
  subscription MyQuery1 {
    tasks_aggregate {
      aggregate {
        count
      }
    }
  }`;