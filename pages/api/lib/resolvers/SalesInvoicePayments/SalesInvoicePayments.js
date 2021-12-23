'use strict'
import SalesInvoicePayments from '../../../models/SalesInvoicePayments/SalesInvoicePayments'
import { ApolloError } from 'apollo-server-errors'
import UserSchema from '../../../models/users/userLogin'
import CommissionSchema from '../../../models/commisionInvoice/commisionInvoice'
import { TemplateInvoicePaid } from '../../templates/InvoicePaid'
import { transporter } from '../../../utils'
import moment from 'moment'


export const getInvoicePay = async (_root, { idComp, search, max }, ctx) => {
    try {
        const idUser = ctx.User.id
        const data = await SalesInvoicePayments.find({ idComp: idComp })
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const createInvoicePaymentMutation = async (_, { input, inputLineItems }, ctx) => {
    try {
        const { setDataPay } = inputLineItems || {}
        const InvoiceData = await CommissionSchema.findOne({ _id: '61bea751746e9fa4a79ffca7' })
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (!InvoiceData) return;
        const idUser = ctx.User.id
        // const user = await UserSchema.findById({ _id: idUser })
        for (let i = 0; i < setDataPay.length; i++) {
            console.log(setDataPay[i])
            const { agentDetails, idInvoice } = setDataPay[i] || {}
            const { agentEmail } = agentDetails || {}
            await CommissionSchema.findOneAndUpdate({ _id: idInvoice }, { $set: { isPaid: true } })
            mailer.sendMail({
                from: 'odavalencia002@gmail.com',
                // to: 'agentEmail',
                to: 'odavalencia002@gmail.com',
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData && InvoiceData.eventName,
                    uEmail: 'odavalencia002@gmail.com',
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isPaid !== true ? 'paid' : 'No paid',
                })
            })
        }

        const data = await SalesInvoicePayments.create({ ...input })
        for (let i = 0; i < setDataPay.length; i++) {
            const { idUser, idComp, agentDetails, lineItemsArray } = setDataPay[i]
            // console.log(setDataPay[i])
            await SalesInvoicePayments.findOneAndUpdate(
                { _id: data._id },
                {
                    $addToSet: {
                        lineItemsInvoiceIsPay: {
                            $each: [{ idUser, idComp, agentDetails: { ...agentDetails }, lineItemsArray: [{ ...lineItemsArray }] }]
                        }
                    }
                }
            ).then(res => {
                if (res) { return { success: true } }
            }).catch(err => {
                return err
            })
        }
        return data
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {},
    QUERIES: {
        getInvoicePay
    },
    MUTATIONS: {
        createInvoicePaymentMutation
    }
}
