import { gql } from '@apollo/client'

export const CREATE_CURRENT_SESSION = gql`
mutation loginUser($uEmail: String!, $uPassword: String!) {
  loginUser(uEmail: $uEmail, uPassword: $uPassword){
    user{
      id
      firstName
      lastName
      userName
      uEmail
      uAvatar
    }
    token
    admin
    success
    message
  }
}
`
export const HAS_BEEN_RECEIVED = gql`
mutation hasBeenReceived($idInvoice: ID, $uEmail: String!, $ToEmail: String!) {
  hasBeenReceived(idInvoice: $idInvoice, uEmail: $uEmail,  ToEmail: $ToEmail){
    success
    message
  }
}
`
export const GET_ONE_COMPANY_BY_ID = gql`
query getOneCompanyById($idC: ID){
  getOneCompanyById(idC: $idC){
    _id
    companyName
    registeredOfficeAddress
    companyLegalStatus
    companyType
    accounts
    natureOfBusiness
    dissolvedOn
    incorporatedOn
    idUser
    lineItemsTeam {
      _id
      description
      uEmail
      Username
      authorization
      idUser
      dateAdded
      status
      
    }
  }
}
`

// Just Spice
export const GET_ALL_INVOICES_SENT = gql`
query getAllCommissionInvoiceSent($idUser: ID, $search: String, $min: Int, $max: Int, $idComp: ID, $CompName: String) {
  getAllCommissionInvoiceSent(idUser: $idUser, search: $search, min: $min, max: $max, idComp: $idComp, CompName: $CompName ) {
          _id
          idUser
          idComp
          uploaded
          invoiceDate
          invoiceRef
          invoiceTo
          invoiceFrom
          eventRef
          eventName
          eventCommences
          eventType
          invoiceTotal
          totalCommDue
          totalSalesReceived
          totalDiscounts
          vatOnComms
          isVATRegistered
          isPaid
          isRedo
    
          datePaid
          hasBeenReceived
          isOnStatement
          statementId
          __typename
        lineItemsArray {
            _id
            subtotal_tickets_sold
            tickettype
            subtotal_sales_received
            subinvoice_total
            subtotal_comm_due
            ticketcategorytotaldue
            totalcategorydiscount
            subtotalforticketypelessDiscount
            ticketPrice
        }
        agentDetails {
          legalName
          agentContact
          agentTradingName
          agentEmail
          agentAddress1
          agentAddress2
          agentAddress3
          agentCity
          agentCounty
          agentCountry
          agentPostCode
          VATRegNo
          agentVATRegistered
          agentCompanyNumber
        }
      }
}
`
// Just Spice
export const GET_ALL_INVOICES_RECEIVED = gql`
query getAllCommissionInvoiceReceived($idUser: ID, $search: String, $min: Int, $max: Int, $idComp: ID, $CompName: String) {
  getAllCommissionInvoiceReceived(idUser: $idUser, search: $search, min: $min, max: $max, idComp: $idComp, CompName: $CompName ) {
          _id
          idUser
          idComp
          uploaded
          invoiceDate
          invoiceRef
          invoiceTo
          invoiceFrom
          eventRef
          eventName
          eventCommences
          eventType
          invoiceTotal
          totalCommDue
          totalSalesReceived
          totalDiscounts
          vatOnComms
          isVATRegistered
          isPaid
          isRedo
    
          datePaid
          hasBeenReceived
          isOnStatement
          statementId
          __typename
        lineItemsArray {
            _id
            subtotal_tickets_sold
            tickettype
            subtotal_sales_received
            subinvoice_total
            subtotal_comm_due
            ticketcategorytotaldue
            totalcategorydiscount
            subtotalforticketypelessDiscount
            ticketPrice
        }
        agentDetails {
          legalName
          agentContact
          agentTradingName
          agentEmail
          agentAddress1
          agentAddress2
          agentAddress3
          agentCity
          agentCounty
          agentCountry
          agentPostCode
          VATRegNo
          agentVATRegistered
          agentCompanyNumber
        }
      }
}
`
