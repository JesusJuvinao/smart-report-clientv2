'use strict'
import SalesInvoicePayments from '../../../models/SalesInvoicePayments/SalesInvoicePayments'
import { ApolloError } from 'apollo-server-errors'
import UserSchema from '../../../models/users/userLogin'


export const getInvoicePay = async (_root, _, ctx) => {
    try {
        console.log('Hola mundo')
        const data  =  await SalesInvoicePayments.find({})
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const createInvoicePaymentMutation = async (_, { input, inputLineItems }, ctx) => {
    console.log(inputLineItems)
    try {
        const { setDataPay } = inputLineItems || {}
        const user = await UserSchema.findById({ _id: '61adeb3c2256283be0cb5c2d' })
        const data = await SalesInvoicePayments.create({ ...input })
        for (let i = 0; i < setDataPay.length; i++) {
            const { idUser } = setDataPay[i]
            await SalesInvoicePayments.findOneAndUpdate(
                { _id: data._id },
                {
                    $addToSet: {
                        lineItemsInvoiceIsPay: {
                            $each: [{ idUser }]
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
