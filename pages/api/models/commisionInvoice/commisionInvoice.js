import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const CommissionInvoice = new mongoose.Schema({
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
    lineItemsArray: [{
        subtotal_tickets_sold: Number,
        tickettype: String,
        subtotal_sales_received: Number,
        subinvoice_total: Number,
        subtotal_comm_due: Number,
        ticketcategorytotaldue: Number,
        totalcategorydiscount: Number,
        subtotalforticketypelessDiscount: Number,
        ticketPrice: Number
    }],
    uploaded: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    isRedo: {
        type: Boolean,
        required: true,
        default: false
    },
    eventCommences: {
        type: Date,
        required: true,
        default: Date.now()
    },
    invoiceTo: {
        type: String,
        required: true
    },
    invoice_total: {
        type: Number,
        required: true
    },
    total_sales_received: {
        type: Number,
        required: true
    },
    total_comm_due: {
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
}, {
    timestamps: true
})

module.exports =
    mongoose.models.spicecommissioninvoices || mongoose.model('spicecommissioninvoices', CommissionInvoice)
