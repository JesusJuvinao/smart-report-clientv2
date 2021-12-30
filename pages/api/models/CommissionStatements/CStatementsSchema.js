import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommissionInvoiceStatement = new mongoose.Schema({
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
    statementFromDetails: [{
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
    }],

    statementFromEmail: String,
    statementFrom: String,
    statementToDetails: [{
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
    }],

    statementToEmail: String,
    statementTo: String,
    statementDate: String,
    invoiceType: String,
    eventsMonth: String,
    emailedDate: String,
    totalAmountToPay: String,
    totalCommissionPayableToYou: String,
    totalGrossSalesReceivedByYou: String,
    totalDiscounts: String,

    invoicesIncOnStatement: [{
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
        invoiceTotal: String,
        totalCommDue: String,
        totalSalesReceived: String,
        totalDiscounts: String,
        vatOnComms: String,
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
        currency: {
            type: String,
            required: false
        },
        eventsMonth: {
            type: String,
            required: false
        },
        hasInvoiceBeenOpenedByRecipient: {
            type: Boolean,
            required: false
        },
        hasInvoiceBeenSent: {
            type: Boolean,
            required: false,
            default: false
        },
        isOnStatement: {
            type: Boolean,
            required: false,
            default: false
        },
        statementId: {
            type: String,
            required: false
        },
    }],
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    totalVATOnComms: {
        type: Number,
        required: false
    },
}, {
    timestamps: true
})

module.exports =
    mongoose.models.spicecommissionstatements || mongoose.model('spicecommissionstatements', CommissionInvoiceStatement)
