'use strict'
import SalesInvoicePayments from '../../../models/SalesInvoicePayments/SalesInvoicePayments'
import { ApolloError } from 'apollo-server-errors'
import UserSchema from '../../../models/users/userLogin'
import CommissionSchema from '../../../models/commisionInvoice/commisionInvoice'
import { InvoicePaidTemplate, TemplateInvoicePaid } from '../../templates/InvoicePaid'
import { transporter } from '../../../utils'
import moment from 'moment'
import { nanoid } from 'nanoid'
// const NewsLetter = View.importJsx("../templates/");
// const { View } = require("grandjs");
// const InvoiceTemplate = View.importJsx("./views/spicePayment.   jsx");
// C:\Users\jesus\Documents\proyectos\smartreport\smart-report-clientv2\pages\api\lib\templates\spiceStatement.jsx
export const getInvoicePay = async (_root, { idComp, search, max }, ctx) => {
    try {
        const idUser = ctx.User.id
        const data = await SalesInvoicePayments.find({ idComp: idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getOneInvoicePay = async (_root, { idInvoice, idComp }, ctx) => {
    try {
        // const idUser = ctx.User.id
        const data = await SalesInvoicePayments.findOne({ _id: idInvoice, idComp: idComp })
        console.log(data)
        return data

    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const createInvoicePaymentMutation = async (_, { input, inputLineItems }, ctx) => {
    try {
        const { setDataPay } = inputLineItems || {}
        // const InvoiceData = await CommissionSchema.findOne({ _id: '61bea751746e9fa4a79ffca7' })
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        // if (!InvoiceData) return;
        const idUser = ctx.User.id
        const user = await UserSchema.findById({ _id: idUser })
        for (let i = 0; i < setDataPay.length; i++) {
            const { agentDetails, idInvoice } = setDataPay[i] || {}
            const { agentEmail } = agentDetails || {}
            await CommissionSchema.findOneAndUpdate({ _id: idInvoice }, { $set: { isPaid: true } })
            // let template = View.renderToHtml(InvoiceTemplate, { })
        }

        // InvoicePaidTemplate
        const data = await SalesInvoicePayments.create({ ...input, IdRef: nanoid() })
        for (let i = 0; i < setDataPay.length; i++) {
            const { idUser, idComp, agentDetails, lineItemsArray, idInvoice, currency } = setDataPay[i]
            console.log(setDataPay[i])
            await SalesInvoicePayments.findOneAndUpdate(
                { _id: data._id },
                {
                    $addToSet: {
                        lineItemsInvoiceIsPay: {
                            $each: [{ idUser, idComp, idInvoice, currency, agentDetails: { ...agentDetails }, lineItemsArray: [{ ...lineItemsArray }] }]
                        }
                    }
                }
            ).then(res => {
                if (res) { return { success: true } }
            }).catch(err => {
                return err
            })
        }
        // console.log(data._id)
        mailer.sendMail({
            from: 'odavalencia002@gmail.com',
            // to: 'agentEmail',
            to: 'odavalencia002@gmail.com',
            text: 'Hello world?',
            subject: 'Notification De Invoice Change.',
            html: InvoicePaidTemplate({
                idComp: data._id,
                today,
                hour,
                uEmail: user.uEmail || ''
            })
        })
        return data
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

// export const getEstimateCountInvoice = async (_, { idComp }, ctx) => {
//     try {
//     // Count Documents
//         const count = await SalesInvoicePayments.count({ idComp: '' })
//        console.log(count)
//        return count
//     } catch (error) {
//         return error
//     }
// }

export default {
    TYPES: {},
    QUERIES: {
        getInvoicePay,
        getOneInvoicePay,
        // getEstimateCountInvoice
    },
    MUTATIONS: {
        createInvoicePaymentMutation
    }
}
