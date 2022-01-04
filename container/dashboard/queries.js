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
export const GET_STIMATE_COUNT = gql`
query getEstimateCountInvoice($idComp: ID) {
  getEstimateCountInvoice(idComp: $idComp) {
          _id
          idUser
          idComp
          uploaded
          invoiceDate
          invoiceRef
          invoiceTo
          invoiceFrom
          eventRef
          isApprovedByInvoiceSender
          currency
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
            subtotalTicketsSold
            ticketType
            lineSalesReceived
            lineSubtotal
            lineCommSubtotal
            ticketCategoryTotalDue
            totalTicketTypeDiscount
            subtotalTicketTypeLessDiscount
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
export const GET_STIMATE_COUNT_SEND = gql`
  query getEstimateCountInvoiceSend($idComp: ID) {
    getEstimateCountInvoiceSend(idComp: $idComp) {
          _id
          idUser
          idComp
          uploaded
          invoiceDate
          invoiceRef
          invoiceTo
          invoiceFrom
          eventRef
          isApprovedByInvoiceSender
          currency
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
            subtotalTicketsSold
            ticketType
            lineSalesReceived
            lineSubtotal
            lineCommSubtotal
            ticketCategoryTotalDue
            totalTicketTypeDiscount
            subtotalTicketTypeLessDiscount
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
export const GET_ALL_INVOICES_SENT = gql`
query getAllCommissionInvoiceSent($idUser: ID, $search: String, $min: Int, $max: Int, $idComp: ID, $CompName: String, $updatedAt: String, $datePaid: String, $invoiceTo: String, $invoiceFrom: String) {
  getAllCommissionInvoiceSent(idUser: $idUser, search: $search, min: $min, max: $max, idComp: $idComp, CompName: $CompName,  updatedAt: $updatedAt, datePaid: $datePaid, invoiceTo: $invoiceTo, invoiceFrom: $invoiceFrom  ) {
          _id
          idUser
          idComp
          uploaded
          invoiceDate
          invoiceRef
          invoiceTo
          invoiceFrom
          eventRef
          isApprovedByInvoiceSender
          currency
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
            subtotalTicketsSold
            ticketType
            lineSalesReceived
            lineSubtotal
            lineCommSubtotal
            ticketCategoryTotalDue
            totalTicketTypeDiscount
            subtotalTicketTypeLessDiscount
            ticketPrice
            newArray {
              id
              bookingRef
              _id
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
          currency
          invoiceFrom
          eventRef
          eventName
          eventCommences
          eventType
          invoiceTotal
          totalCommDue
          isApprovedByInvoiceSender
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
            subtotalTicketsSold
            ticketType
            lineSalesReceived
            lineSubtotal
            lineCommSubtotal
            ticketCategoryTotalDue
            totalTicketTypeDiscount
            subtotalTicketTypeLessDiscount
            ticketPrice
            newArray {
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

export const CREATE_COMMISSION_PAY = gql`
mutation createInvoicePaymentMutation($input: ISalesInvoicePay, $inputLineItems: ILineItemsFinal!) {
createInvoicePaymentMutation(input: $input, inputLineItems: $inputLineItems) {
      _id
      idUser
      idComp  
  		Date
  		Idescription
  		totalInvoicePayment
  		isPaymentConfirm
  		lineItemsInvoiceIsPay {
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
export const GET_ALL_TIKETS_ARRAY = gql`
    query newArray($idInvoice: ID) {
      	newArray(idInvoice: $idInvoice) {
          _id
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
`
export const GET_COMMISSION_PAY = gql`
query getInvoicePay($idComp: ID, $idUser: ID,$search: String, $min: Int, $max: Int){
  	getInvoicePay(idComp: $idComp,  idUser: $idUser, search: $search, min: $min, max: $max){
      _id
      idUser
      idComp  
  		Date
  		Idescription
  		totalInvoicePayment
  		isPaymentConfirm
  		lineItemsInvoiceIsPay {
        _id
        subtotalTicketsSold
        ticketType
        lineSalesReceived
        lineSubtotal
        hasBeenSent
        lineCommSubtotal
        lineItemVATOnComm
        ticketCategoryTotalDue
         totalTicketTypeDiscount
        subtotalTicketTypeLessDiscount
        ticketPrice
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
