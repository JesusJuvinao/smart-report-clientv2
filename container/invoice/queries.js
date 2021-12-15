import { gql } from '@apollo/client'

export const GET_ONE_INVOICE = gql`
    query getOneCommissionInvoice($idInvoice: ID, $idUser: ID) {
      	getOneCommissionInvoice(idInvoice: $idInvoice, idUser: $idUser ) {
         _id
        idUser
        idComp
        uploaded
        eventCommences
        invoiceTo
        isPaid
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
export const IS_PAY_INVOICE = gql`
  mutation isPaidStateInvoice($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
    isPaidStateInvoice(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}	
`
export const IS_REDO_INVOICE = gql`
mutation isRedoStateInvoice($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
  isRedoStateInvoice(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}		
`
