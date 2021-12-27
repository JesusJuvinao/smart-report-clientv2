import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommissionStatement = new mongoose.Schema({
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
    agentDetails: {
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
        agentCompanyNumber: String
    },
    lineItemsArray: [{
        subtotalTicketsSold: Number,
        ticketType: String,
        lineSalesReceived: Number,
        lineSubtotal: Number,
        lineCommSubtotal: Number,
        lineItemVATOnComm: Number,
        ticketCategoryTotalDue: Number,
        totalTicketTypeDiscount: Number,
        subtotalTicketTypeLessDiscount: Number,
        ticketPrice: Number,
        newArray: [{
            id: String,
            bookingRef: String,
            bookedOn: Date,
            client: String,
            ticketoption: String,
            ticketquantity: Number,
            ticketprice: Number,
            totaldue: Number,
            totaldueCalc: Number,
            totalpaid: Number,
            balancedue: Number,
            commissionRatePercent: String,
            commissionpayable: String,
            agentCode: String,
            clientOwnerAtPurchaseDate: String,
            bookingStatus: String,
            eventName: String,
            eventOwner: String,
            eventCommences: Date,
            discountRate: Number,
            discountTotal: String,
            discountedTotalDue: String,
            eventRef: String,
            eventType: String
        }]
    }],
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    invoiceDate: {
        type: Date
    },
    datePaid: {
        type: Date
    },
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    isApprovedByInvoiceSender: {
        type: Boolean,
        required: false,
        default: false
    },
    hasBeenReceived: {
        type: Boolean,
        required: false,
        default: false
    },
    isOnStatement: {
        type: Boolean
    },
    statementId: {
        type: Boolean
    },
    isRedo: {
        type: Boolean,
        required: true,
        default: false
    },
    isVATRegistered: {
        type: Boolean,
        required: false
    },
    eventCommences: {
        type: Date,
        required: true
    },
    invoiceRef: {
        type: String,
        required: false
    },
    eventType: {
        type: String,
        required: false
    },
    eventRef: {
        type: String,
        required: false
    },
    invoiceTo: {
        type: String,
        required: true
    },
    invoiceTotal: {
        type: Number,
        required: true
    },
    totalSalesReceived: {
        type: Number,
        required: true
    },
    totalCommDue: {
        type: Number,
        required: true
    },
    vatOnComms: {
        type: Number,
        required: true
    },
    totalDiscounts: {
        type: Number,
        required: true
    },
    invoiceFrom: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})

module.exports =
    mongoose.models.commissionstatements || mongoose.model('commissionstatements', CommissionStatement)
