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
export const GET_ALL_INVOICES = gql`
    query getAllCommissionInvoice($idUser: ID, $search: String, $min: Int, $max: Int) {
      	getAllCommissionInvoice(idUser: $idUser, search: $search, min: $min, max: $max) {
          _id
          idUser
          isRedo
          isPaid
          idComp
          uploaded
          eventCommences
          invoiceTo
          invoice_total
          total_sales_received
          total_comm_due
          totalDiscounts
          invoiceFrom
          eventName
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
      }
}
`
