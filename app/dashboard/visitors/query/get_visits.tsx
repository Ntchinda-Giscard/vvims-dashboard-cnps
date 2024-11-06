import { gql } from "@apollo/client";

export const GET_VISITS = gql`
subscription GetVisits($search: String = "%%", $date: timestamptz = "2100-01-01", $limit: Int!, $offset: Int!) {
  visits(limit: $limit, offset: $offset, 
    where: {
    _or: [
      {visitorByVisitor: {lastname: {_ilike: $search}}},
      {visitorByVisitor: {firstname: {_ilike: $search}}}
      {visitorByVisitor: {phone_number: {_ilike: $search}}}
    ],
    created_at: {_lte: $date}
    },  order_by: {created_at: desc}) {
    check_in_at
    check_out_at
    date
    reason
    reg_no
    id
    department {
      id
      text_content {
        content
      }
    }
    employee {
      id
      firstname
      lastname
    }
    service {
      id
      text_content {
        content
      }
    }
    visitorByVisitor {
      id
      lastname
      phone_number
      id_number
      file {
        file_url
        id
      }
      firstname
      company {
        abbrev
        address
        city
        email
      }
      fileByBackId {
        file_url
        id
      }
      fileByFrontId {
        file_url
        id
      }
    }
    visit_status {
      status
    }
    vehicleByVehicle {
      id
      license
    }
  }
}`


export const GET_VISITS_AGG = gql`
subscription MyQuery($search: String = "%%", $date: date = "2100-01-01") {
    visits_aggregate(
      where: {
    _or: [
      {visitorByVisitor: {lastname: {_ilike: $search}}},
      {visitorByVisitor: {firstname: {_ilike: $search}}}
      {visitorByVisitor: {phone_number: {_ilike: $search}}}
    ],
    created_at: {_lte: $date}
    }
      ) {
      aggregate {
        count
      }
    }
  }`;