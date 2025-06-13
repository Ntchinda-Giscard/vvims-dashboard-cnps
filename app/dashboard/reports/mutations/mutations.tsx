import { gql } from "@apollo/client";


export const INSERT_REPORT = gql`
mutation MyMutation(
  $categoryId: UUID!, 
  $fromDate: Date, 
  $toDate: Date, 
  $category1: CategoryTypeEnum!, 
  $reportType: ReportTypeEnum!
  ) 
  {
  generateCsvReport(input: {category: $category1, categoryId: $categoryId, reportType: $reportType, fromDate: $fromDate, toDate: $toDate}) {
    type
    attendanceData {
      arrival
      date
      departure
      employee
      late
      reason
      status
    }
    visitData {
      checkIn
      checkOut
      date
      reason
      status
      visitorName
    }
    leaveData {
      duration
      employee
      endDate
      reason
      startDate
    }
  }
}`;
