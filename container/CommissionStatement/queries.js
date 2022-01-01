import { gql } from '@apollo/client'

export const SEND_COMMISSION_STATEMENT = gql`
  mutation sendOneCommissionStatements($idComp: ID, $company: String, $uEmail: String, $statementToEmail: String, $IdStatements: String) {
    sendOneCommissionStatements(idComp: $idComp, company: $company, uEmail: $uEmail, statementToEmail: $statementToEmail, IdStatements: $IdStatements) {
    success
    message
    }
}
`
export const CANCELLED_COMMISSION_STATEMENT = gql`
  mutation isPaidOutCommissionStatements($IdStatements: String, $statementToEmail: String $uEmail: String, $company: String, $idComp: ID) {
    isPaidOutCommissionStatements(IdStatements: $IdStatements, statementToEmail: $statementToEmail, uEmail: $uEmail,  company: $company, idComp: $idComp) {
    success
    message
  }
  }	
`
export const VIEW_COMMISSION_STATEMENT = gql`
  mutation ViewCommissionStatements($IdStatements: String, $statementToEmail: String $uEmail: String, $company: String, $idComp: ID) {
    ViewCommissionStatements(IdStatements: $IdStatements, statementToEmail: $statementToEmail, uEmail: $uEmail,  company: $company, idComp: $idComp) {
    success
    message
  }
  }	
`
export const ALL_COMMISSION_STATEMENT = gql`
query getAllCommissionStatementsFrom($idUser: ID, $idComp: ID, $company: String, $search: String, $min: Int, $max: Int){
  getAllCommissionStatementsFrom(idUser: $idUser, search: $search, min: $min, max: $max, idComp: $idComp, company: $company ) {
    statementId
    _id
    statementFromDetails {
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
        id      
    }
    statementFromEmail
    statementFrom
    statementToDetails {
      id
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
      __typename
    }
    statementToEmail
    statementTo
    statementTo
    statementDate
    invoiceType
    invoiceType
    eventsMonth
    emailedDate
    totalAmountToPay
    totalAmountToPay
    totalCommissionPayableToYou
    totalGrossSalesReceivedByYou
    totalDiscounts
    invoicesIncOnStatement {
        _id
        statementId
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
            id   
        }
        invoiceDate
        invoiceRef
        invoiceTo
        invoiceFrom
        eventType
        eventRef
        eventName
        eventCommences
        invoiceTotal
        totalCommDue
        totalSalesReceived
        totalDiscounts
        vatOnComms
        isVATRegistered
        lineItemsArray{ 
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
            newArray {
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
        currency
        eventsMonth
        hasInvoiceBeenOpenedByRecipient
        hasInvoiceBeenSent
        isOnStatement
    }
    totalVATOnComms
    currency
    isRedo
    isPaid
    isApprovedByInvoiceSender
    isViewByInvoiceSender
    isShareInvoiceBySender
  }
}
`
export const GET_ONE_COMMISSION_STATEMENT = gql`
query getOneCommissionStatement($idUser: ID, $idComp: ID, $company: String, $IdStatement: ID){
  getOneCommissionStatement(idUser: $idUser, idComp: $idComp, company: $company, IdStatement: $IdStatement ) {
    statementId
    _id
    statementFromDetails {
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
        id      
    }
    statementFromEmail
    statementFrom
    statementToDetails {
      id
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
      __typename
    }
    statementToEmail
    statementTo
    statementTo
    statementDate
    invoiceType
    invoiceType
    eventsMonth
    emailedDate
    totalAmountToPay
    totalAmountToPay
    totalCommissionPayableToYou
    totalGrossSalesReceivedByYou
    totalDiscounts
    invoicesIncOnStatement {
        _id
        statementId
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
            id   
        }
        invoiceDate
        invoiceRef
        invoiceTo
        invoiceFrom
        eventType
        eventRef
        eventName
        eventCommences
        invoiceTotal
        totalCommDue
        totalSalesReceived
        totalDiscounts
        vatOnComms
        isVATRegistered
        lineItemsArray{ 
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
            newArray {
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
        currency
        eventsMonth
        hasInvoiceBeenOpenedByRecipient
        hasInvoiceBeenSent
        isOnStatement
    }
    totalVATOnComms
    currency
    isRedo
    isPaid
    isApprovedByInvoiceSender
    isViewByInvoiceSender
    isShareInvoiceBySender
  }
}
`
export const ALL_COMMISSION_STATEMENT_TO = gql`
query getAllCommissionStatementsTo($idUser: ID, $idComp: ID, $company: String, $search: String, $min: Int, $max: Int){
  getAllCommissionStatementsTo(idUser: $idUser, search: $search, min: $min, max: $max, idComp: $idComp, company: $company ) {
    statementId
    _id
    statementFromDetails {
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
        id      
    }
    statementFromEmail
    statementFrom
    statementToDetails {
      id
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
      __typename
    }
    statementToEmail
    statementTo
    statementTo
    statementDate
    invoiceType
    invoiceType
    eventsMonth
    emailedDate
    totalAmountToPay
    totalAmountToPay
    totalCommissionPayableToYou
    totalGrossSalesReceivedByYou
    totalDiscounts
    invoicesIncOnStatement {
        _id
        statementId
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
            id   
        }
        invoiceDate
        invoiceRef
        invoiceTo
        invoiceFrom
        eventType
        eventRef
        eventName
        eventCommences
        invoiceTotal
        totalCommDue
        totalSalesReceived
        totalDiscounts
        vatOnComms
        isVATRegistered
        lineItemsArray{ 
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
            newArray {
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
        currency
        eventsMonth
        hasInvoiceBeenOpenedByRecipient
        hasInvoiceBeenSent
        isOnStatement
    }
    totalVATOnComms
    currency
    isRedo
    isPaid
    isApprovedByInvoiceSender
    isViewByInvoiceSender
    isShareInvoiceBySender
  }
}
`
export const IS_REDO_COMMISSION_STATEMENTS_INVOICE = gql`
mutation isRedoStateInvoiceStatement($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
  isRedoStateInvoiceStatement(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}		
`
export const IS_PAY_STATEMENT_INVOICE = gql`
  mutation isPaidStatementInvoice($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
    isPaidStatementInvoice(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}	
`
export const IS_APPROVED_STATEMENT_SENDER = gql`
mutation isApprovedByInvoiceSenderStatement($idInvoice: ID, $ToEmail: String! $uEmail: String!) {
  isApprovedByInvoiceSenderStatement(idInvoice: $idInvoice, ToEmail: $ToEmail, uEmail: $uEmail ) {
    success
    message
  }
}		
`
