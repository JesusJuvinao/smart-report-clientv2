import { gql } from '@apollo/client'

export const GET_ONE_INVOICE = gql`
    query getOneCommissionInvoice($idInvoice: ID, $idUser: ID) {
      	getOneCommissionInvoice(idInvoice: $idInvoice, idUser: $idUser ) {
        _id
        idUser
        idComp
        uploaded
        invoiceDate
        invoiceRef
        isOnStatement
        invoiceTo
        invoiceFrom
        statementId
        eventRef
        eventName
        hasBeenReceived
        datePaid
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
        __typename
    
        agentDetails{
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
        lineItemsArray {
            _id
            subtotalTicketsSold
            ticketType
            lineSalesReceived
            lineSubtotal
            lineCommSubtotal
            lineItemVATOnComm
            ticketCategoryTotalDue
            totalTicketTypeDiscount
            subtotalTicketTypeLessDiscount
            ticketPrice
              newArray{
          		id
              bookingRef
              bookedOn
              client
              ticketoption
              ticketquantity
              ticketprice
              totaldue
              totaldueCalc
              totalpaid
              balancedue
              commissionRatePercent
              commissionpayable
              agentCode
              clientOwnerAtPurchaseDate
              bookingStatus
              eventName
              eventOwner
              eventCommences
              discountRate
              discountTotal
              discountedTotalDue
              eventRef
              eventType
       	 		}	
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
export const GET_ONE_PAY_INVOICE = gql`
query getOneInvoicePay($idComp: ID,$idInvoice: ID) {
  getOneInvoicePay(idComp: $idComp, idInvoice: $idInvoice) {
    _id
    idUser
    idComp
    Date
    currency
    Idescription
    IdRef
    totalInvoicePayment
    isPaymentConfirm
	lineItemsInvoiceIsPay {
    _id
    idUser
    idComp
    Date
    hasBeenReceived	
    isRedo
    currency
    idInvoice
    totalInvoicePayment
    isPaymentConfirm
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
export const IS_APPROVED_INVOICE_SENDER = gql`
mutation isApprovedByInvoiceSenderMutation($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
  isApprovedByInvoiceSenderMutation(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}		
`
