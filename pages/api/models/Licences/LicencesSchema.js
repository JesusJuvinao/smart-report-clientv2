import { DataExchange } from 'aws-sdk'
import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const LicenceSchema = new mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    LName: {
        type: String,
        required: true,
        trim: true
    },
    LPrice: {
        type: Number,
        required: false,
        trim: true
    },
    Ref: {
        type: String,
        required: true,
        trim: true
    },
    LDescuento: {
        type: Number,
        required: false,
    },
    Date: {
        type: Date,
        required: false
    },
    EndDate: {
        type: Date,
        required: false
    },
    Active: {
        type: Boolean,
        required: false,
        default: true
    },
    lineItemsLicences: [{
        lineItemsDescription: String,
    }]
}, {
    timestamps: true
})

module.exports =
    mongoose.models.Licences || mongoose.model('Licences', LicenceSchema)
