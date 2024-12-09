import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
    subscription GetServices($limit: Int!, $offset: Int!, $company_id: uuid!) {
        services(limit: $limit, offset: $offset, where: {company_id: {_eq: $company_id}}, order_by: {created_at: desc}) {
            id
            text_content {
                content
            }
            company_id
            agency_id
            employees_aggregate {
                aggregate {
                    count
                }
            }
            department {
                text_content {
                    content
                }
            }
        }
    }`

export const GET_AGG_SERV = gql`
    subscription GetServicesAgg($company_id: uuid!) {
        services_aggregate(where: {company_id: {_eq: $company_id}}) {
            aggregate {
            count
            }
        }
    }`