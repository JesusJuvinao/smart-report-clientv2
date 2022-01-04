import { gql } from '@apollo/client'

export const GET_ONE_EVENT_TICKET = gql`
query getOneEventsalesdata($idUser: ID, $idComp: ID, $company: String, $IdSales: ID){
  getOneEventsalesdata(idUser: $idUser, IdSales: $IdSales, idComp: $idComp, company: $company) {
		_id
    eventType
    eventRef
    eventName
    eventCommencesDate
    eventCommencesTime
    eventFinishesDate
    eventFinishesTime
    eventStatus
    eventOwner
    eventAddress1
    eventAddress2
    eventAddress3
    eventTown
    eventCounty
    eventCountry
    eventPostCode
    eventMaxQuantity
    eventCurrentAvailQuantity
    eventCurrentSold
    eventLastUpdatedDate
    eventLastUpdatedTime
    eventCancelledPolicy
    NumTixSold
    totalSalesForEvent
    currency
    isRedo
    isPaid
    isApprovedByInvoiceSender
    isViewByInvoiceSender
    isShareInvoiceBySender
        enrichedTicketsDataArray {
      _id
      id,
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
`
