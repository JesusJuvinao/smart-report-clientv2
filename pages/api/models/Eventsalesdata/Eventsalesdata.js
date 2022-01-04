import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const EventSalesData = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    idComp: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Companies'
    },
    enrichedTicketsDataArray: [{
        bookingRef: String,
        bookedOn: String,
        client: String,
        ticketoption: String,
        ticketquantity: Number,
        ticketprice: Number,
        totaldue: Number,
        totaldueCalc: Number,
        totalpaid: Number,
        balancedue: Number,
        commissionRatePercent: Number,
        commissionpayable: Number,
        agentCode: String,
        clientOwnerAtPurchaseDate: String,
        bookingStatus: String,
        eventName: String,
        eventOwner: String,
        eventCommences: String,
        discountRate: Number,
        discountTotal: Number,
        discountedTotalDue: Number,
        eventRef: String,
        eventType: String
    }],
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    eventRef: {
        type: String,
        required: false
    },
    eventName: {
        type: String,
        required: false
    },
    eventCommencesDate: {
        type: String,
        required: false
    },
    eventCommencesTime: {
        type: String,
        required: true
    },
    eventFinishesDate: {
        type: String,
        required: true
    },
    eventFinishesTime: {
        type: String,
        required: true
    },
    eventStatus: {
        type: String,
        required: true
    },
    eventOwner: {
        type: String,
        required: true
    },
    eventAddress1: {
        type: String,
        required: true
    },
    eventAddress2: {
        type: String,
        required: true
    },
    eventAddress3: {
        type: String,
        required: true
    },
    eventTown: {
        type: String,
        required: false
    },
    eventCounty: {
        type: String,
        required: true
    },
    eventCountry: {
        type: String,
        required: true
    },
    eventPostCode: {
        type: String,
        required: true
    },
    eventMaxQuantity: {
        type: String,
        required: true
    },
    eventCurrentAvailQuantity: {
        type: String,
        required: true
    },
    eventCurrentSold: {
        type: String,
        required: true
    },
    eventLastUpdatedDate: {
        type: String,
        required: true
    },
    eventLastUpdatedTime: {
        type: String,
        required: true
    },
    eventCancelledPolicy: {
        type: String,
        required: true
    },
    NumTixSold: {
        type: Number,
        required: true
    },
    isRedo: {
        type: Boolean,
        required: false,
        default: false
    },
    totalSalesForEvent: {
        type: Number,
        required: false
    },
    // Array Commission invoices
    CommissionInvoices: [{
        agentDetails: {
            legalName: String,
            legalName: String,
            agentContact: String,
            agentTradingName: String,
            agentEmail: String,
            agentAddress1: String,
            agentAddress2: String,
            agentAddress3: String,
            agentCity: String,
            agentCounty: String,
            agentCountry: String,
            agentPostCode: String,
            VATRegNo: String,
            agentVATRegistered: Boolean,
            agentCompanyNumber: String,
            id: Number
        },
        invoiceDate: String,
        invoiceRef: String,
        invoiceTo: String,
        invoiceFrom: String,
        eventType: String,
        eventRef: String,
        eventName: String,
        eventCommences: String,
        invoiceTotal: Number,
        totalCommDue: Number,
        totalSalesReceived: Number,
        totalDiscounts: Number,
        vatOnComms: Number,
        isVATRegistered: Boolean,
        lineItemsArray: [{
            subtotalTicketsSold: String,
            ticketType: String,
            lineSalesReceived: String,
            lineSubtotal: String,
            lineCommSubtotal: String,
            lineItemVATOnComm: String,
            ticketCategoryTotalDue: String,
            totalTicketTypeDiscount: String,
            subtotalTicketTypeLessDiscount: String,
            ticketPrice: String,
            newArray: [{
                id: String,
                bookingRef: String,
                bookedOn: String,
                client: String,
                ticketoption: String,
                ticketquantity: String,
                ticketprice: String,
                totaldue: String,
                totaldueCalc: String,
                totalpaid: String,
                balancedue: String,
                commissionRatePercent: String,
                commissionpayable: String,
                agentCode: String,
                clientOwnerAtPurchaseDate: String,
                bookingStatus: String,
                eventName: String,
                eventOwner: String,
                eventCommences: String,
                discountRate: String,
                discountTotal: String,
                discountedTotalDue: String,
                eventRef: String,
                eventType: String
            }]
        }],
    }],
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    isApprovedByInvoiceSender: {
        type: Boolean,
        required: true,
        default: false
    },
    isViewByInvoiceSender: {
        type: Boolean,
        required: true,
        default: false
    },
    isShareInvoiceBySender: {
        type: Boolean,
        required: true,
        default: false
    },
    totalVATOnComms: {
        type: Number,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
})

module.exports = mongoose.models.eventsales || mongoose.model('eventsales', EventSalesData)
