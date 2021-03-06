'use strict'
import { ApolloError } from 'apollo-server-errors'
import CommissionSchema from '../../../models/commisionInvoice/commisionInvoice'
import CompanySchema from '../../../models/Companies/CompanySchema'
import UserSchema from '../../../models/users/userLogin'
import { setFiles } from '../Upload/upload'
import { TemplateInvoicePaid } from '../../templates/InvoicePaid'
import { sendEmail, strToDate, transporter } from '../../../utils'
import moment from 'moment'
import { pick, sumBy, flatten, _ as lodashobj, merge } from 'lodash';

// const lodashmainobj=_
import ReactDOMServer from 'react-dom/server'
import { SpiceStatement } from '../../../../../container/SpiceStatement/spiceStatement'
export const createCommissionInvoiceMutation = async (_, { input, inputCommissionLineItems }, ctx) => {
    // const idComp = ctx.idComp
    const { setData } = inputCommissionLineItems || {}
    // Files Data
    const id = ctx.User.id
    try {
        const user = await UserSchema.findById({ _id: id })
        const data = await CompanySchema.find({ _id: { $in: user.idUser } })
        if (!data) { return { success: false, message: 'You do not have access to the company' } }
        const bill = new CommissionSchema({ ...input, idUser: id, currencyBill: input.currencyBill })
        await bill.save(bill)
        for (let i = 0; i < setData.length; i++) {
            const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
            await CommissionSchema.findOneAndUpdate(
                { _id: bill._id },
                {
                    $addToSet: {
                        lineItems: {
                            $each: [{ lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal, iva: [{ iPercentage: data.setDataIva[0].iPercentage }] }]
                        }
                    }
                }
            ).then(res => {
                if (res) { return { success: true } }
            }).catch(err => {
                return err
            })
        }
        return bill
    } catch (error) {
        throw new ApolloError(error)
    }
}
// 
export const getOneCommissionInvoice = async (_, { idInvoice }, ctx) => {

    // const idUser = ctx.User.id
    try {
        const oneInvoiceArray = await CommissionSchema.findOne({ _id: idInvoice })
        // console.log(idInvoice, 'THIS DATA')
        // console.log(oneInvoiceArray)

        const ticketsSold = []

        oneInvoiceArray.lineItemsArray.map(oneInvoice => {
            // console.log(oneInvoice.newArray, 'TESTING')
            ticketsSold.push(oneInvoice.newArray)

        })

        // console.log(ticketsSold, 'TICKETS SOLD')
        // const ticketsSold = ticketTypesSold.map(ticketSold => {
        //     console.log(ticketSold.newArray)
        // })

        // const ticketTypesSold = oneInvoiceArray.lineItemsArray
        // console.log(ticketTypesSold,'TICKET TYPES SOLD')

        // console.log(ticketsSold)



        // const ticketsSold = ticketTypesSold.newArray
        // console.log(ticketTypesSold,ticketsSold,'TICKET TYPES SOLD AND TICKET PURCHASES')
        // console.log(oneInvoiceArray.map(oneInvoice => oneInvoice.lineItemsArray.map(ticketType => ticketType.newArray )))
        // console.log(oneInvoiceArray.lineItemsArray.map(oneInvoice => oneInvoice ))
        console.log(oneInvoiceArray)
        return oneInvoiceArray
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed. FROM INSIDE GETONECOMMISSIONINVOICE', 500)
    }
}
export const newArray = async (_, { idInvoice }, ctx) => {




    try {




        const getTicketsSold = async () => {
            const ticketsSold = []
            const oneInvoiceArray = await CommissionSchema.findOne({ _id: idInvoice })
            oneInvoiceArray.lineItemsArray.map(oneInvoice => {
                oneInvoice.newArray.map(ticket => {
                    let eventCommences = ticket.eventCommences
                    let bookedOn = ticket.bookedOn
                    eventCommences = moment(eventCommences, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss")
                    bookedOn = moment(bookedOn, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss")
                    ticket.eventCommences = eventCommences
                    ticket.bookedOn = bookedOn
                })
                ticketsSold.push(oneInvoice.newArray)
            })
            return flatten(ticketsSold)
        }

        const ticketsSoldArray = await getTicketsSold()
        const ticketOptionsAndValues = ticketsSoldArray.map(ticket => {
            return pick(ticket, [
                'ticketoption',
                'totaldueCalc'
            ]);
        });
        const totalEventSalesByTicketType = await lodashobj(ticketOptionsAndValues).groupBy('ticketoption').map((ticketOption, id) => ({ ticketOption: id, totalSales: sumBy(ticketOption, 'totaldueCalc'), })).value()
        const finalViewTicketsData = [...ticketsSoldArray];
        finalViewTicketsData.push({ totalEventSalesByTicketType: JSON.stringify(totalEventSalesByTicketType) })
        // return [[finalViewTicketsData], totalEventSalesByTicketType]
        return finalViewTicketsData
    } catch (error) {
        throw new ApolloError('Your request could not be processed. FROM INSIDE GETONECOMMISSIONINVOICE', 500)
    }
}
export const DeleteOneBill = async (_, { id }, ctx) => {
    const idUser = ctx.User.id
    try {
        await CommissionSchema.deleteOne({ _id: id, idUser })
        return true
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }// Delete One
}
export const stacks = async () => {
    const data = await CommissionSchema.find()
    return data
}
export const updateBill = async (_, { input, inputCommissionLineItems, setTagsInput, setFilesInput }, ctx) => {
    const idUser = ctx.User.id
    const { _id, idComp, idSupplier, bInvoiceDate, bDueDate, billSubTotal, billTotal, billNo, bDescription, VatType, currencyBill } = input
    const { setData } = inputCommissionLineItems || {}
    const { setTags } = setTagsInput || {}
    const { filesData } = setFilesInput || {}
    try {
        const data = await CommissionSchema.findOneAndUpdate(_id, { idUser, idComp, VatType, idSupplier, bInvoiceDate, bDueDate, currencyBill, billSubTotal, billTotal, billNo, bDescription })
        // Edit Files
        setFiles(false, { bId: _id, input: filesData, idUser, idComp: input.idComp, bInvoiceRef: input.bInvoiceRef })
        // Edit Dynamic SubDocument
        for (let i = 0; i < setData.length; i++) {
            const mongoose = require('mongoose')
            const valid = mongoose.Types.ObjectId.isValid(data._id)
            if (valid === true) {
                const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
                await CommissionSchema.findOneAndUpdate({ _id, 'lineItems._id': data._id },
                    {
                        $set: { 'lineItems.$.lineItemsDescription': lineItemsDescription, 'lineItems.$.lineItemsQuantity': lineItemsQuantity, 'lineItems.$.lineItemsTotalVAT': lineItemsTotalVAT, 'lineItems.$.lineItemsIdVAT': lineItemsIdVAT, 'lineItems.$.lineItemsRate': lineItemsRate, 'lineItems.$.lineItemsIdClass': lineItemsIdClass, 'lineItems.$.lineItemsIdPro': lineItemsIdPro, 'lineItems.$.lineItemsIdAccount': lineItemsIdAccount, 'lineItems.$.lineItemsSubTotal': lineItemsSubTotal, 'lineItems.$.iva': [{ iPercentage: data.setDataIva[0].iPercentage }] }
                    })
            } else {
                const { lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal } = setData[i]
                await CommissionSchema.findOneAndUpdate(
                    { _id },
                    {
                        $addToSet: {
                            lineItems: {
                                $each: [{ lineItemsQuantity, lineItemsDescription, lineItemsRate, lineItemsTotalVAT, lineItemsIdVAT, lineItemsIdClass, lineItemsIdPro, lineItemsIdAccount, lineItemsSubTotal, iva: [{ iPercentage: data.setDataIva[0].iPercentage }] }]
                            }
                        }
                    }
                )
            }
        }
        // TAGS
        for (let i = 0; i < setTags.length; i++) {
            const mongoose = require('mongoose')
            const valid = mongoose.Types.ObjectId.isValid(data._id)
            if (valid === true) {
                await CommissionSchema.findOneAndUpdate({ _id, 'tags._id': data._id },
                    {
                        $set: { 'tags.$.TName': data.TName }
                    })
            } else {
                await CommissionSchema.findOneAndUpdate(
                    { _id },
                    {
                        $addToSet: {
                            tags: {
                                $each: [{ TName: data.TName }]
                            }
                        }
                    }
                )
            }
        }
        return data
    } catch (error) {
        throw new ApolloError(error)
    }
}
export const deleteOneLineItem = async (_, { id, idLine }) => {
    try {
        await CommissionSchema.update({
            _id: id
        }, {
            $pull: {
                lineItems: {
                    _id: idLine
                }
            }
        })
        return true
    } catch (error) {
        return false
    }
}
export const deleteOneTagLineItem = async (_, { id, idLine }) => {
    try {
        await CommissionSchema.update({
            _id: id
        }, {
            $pull: {
                tags: {
                    _id: idLine
                }
            }
        })
        return true
    } catch (error) {
        return false
    }
}
export const isPaidStateInvoice = async (_, { idInvoice, ToEmail, uEmail }, ctx) => {
    const InvoiceData = await CommissionSchema.findOne({ _id: idInvoice })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionSchema.findOneAndUpdate(
            { _id: idInvoice },
            {
                $set: {
                    isPaid: InvoiceData.isPaid !== true
                }
            }
        )
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (InvoiceData) {
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData.invoiceRef,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isPaid !== true ? 'paid' : 'No paid',
                    invoiceTo: InvoiceData.invoiceTo,
                    invoiceFrom: InvoiceData.invoiceFrom
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }

}
export const isApprovedByInvoiceSenderMutation = async (_, { idInvoice, ToEmail, uEmail }) => {
    const InvoiceData = await CommissionSchema.findOne({ _id: idInvoice })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionSchema.findOneAndUpdate(
            { _id: idInvoice },
            {
                $set: {
                    isApprovedByInvoiceSender: InvoiceData.isApprovedByInvoiceSender !== true,
                }
            }
        )
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()

        if (InvoiceData) {
            // sendEmail({
            //     from: uEmail,
            //     to: ToEmail,
            //     text: 'Hello world?',
            //     subject: 'Notification De Invoice Change.',
            //     html: renderHtml
            // }).then(res => console.log(res, 'the res')).catch(err => console.log(err, 'the err')) 
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData.invoiceRef,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'Not approved' : 'approved',
                    invoiceTo: InvoiceData.invoiceTo,
                    invoiceFrom: InvoiceData.invoiceFrom
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Not approved' : 'approved'}` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const hasBeenReceived = async (_, { idInvoice, ToEmail, uEmail }) => {
    const InvoiceData = await CommissionSchema.findOne({ _id: idInvoice })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionSchema.findOneAndUpdate(
            { _id: idInvoice },
            {
                $set: {
                    hasBeenReceived: true,
                }
            }
        )
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (InvoiceData) {
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData.invoiceRef,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'paid' : 'No paid',
                    invoiceTo: InvoiceData.invoiceTo,
                    invoiceFrom: InvoiceData.invoiceFrom
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Redo inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const hasBeenSent = async (_, { idInvoice, ToEmail, uEmail }) => {
    const InvoiceData = await CommissionSchema.findOne({ _id: idInvoice })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionSchema.findOneAndUpdate(
            { _id: idInvoice },
            {
                $set: {
                    hasBeenReceived: true,
                }
            }
        )
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (InvoiceData) {
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData.invoiceRef,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'paid' : 'No paid',
                    invoiceTo: InvoiceData.invoiceTo,
                    invoiceFrom: InvoiceData.invoiceFrom
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Redo inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const isRedoStateInvoice = async (_, { idInvoice, ToEmail, uEmail }) => {
    console.log(idInvoice, ToEmail, uEmail)
    const InvoiceData = await CommissionSchema.findOne({ _id: idInvoice })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionSchema.findOneAndUpdate(
            { _id: idInvoice },
            {
                $set: {
                    isRedo: InvoiceData.isRedo !== true,
                    isPaid: false,
                    isApprovedByInvoiceSender: false
                }
            }
        )
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (InvoiceData) {
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: InvoiceData.invoiceRef,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'Redo' : 'No Redo',
                    invoiceTo: InvoiceData.invoiceTo,
                    invoiceFrom: InvoiceData.invoiceFrom
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Redo inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }

}
export const getAllCommissionInvoiceReceived = async (_, { search, idComp, CompName, max }, ctx) => {
    const idUser = ctx.User.id
    try {
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionSchema.find({ invoiceTo: dataCompany.companyName }).sort({ age: -1 }).limit(max || 10)
            return data
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getEstimateCountInvoice = async (_, { idComp }, ctx) => {
    const idUser = ctx.User.id
    try {
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionSchema.find({ invoiceTo: dataCompany.companyName })
            return data
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllCommissionInvoiceSent = async (_, { search, idComp, CompName, min, max, datePaid, updatedAt, invoiceTo, invoiceFrom }, ctx) => {
    const idUser = ctx.User.id
    // const idUser = '61c38a904516c431d8c22e08'
    const time = new Date(datePaid)
    const invoiceToDate = new Date(invoiceTo)
    const invoiceFromDate = new Date(invoiceFrom)
    try {
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            // var today = moment().startOf('day');
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionSchema.find({
                invoiceFrom: dataCompany.companyName,
                // updatedAt: { $regex: { $gte: invoiceToDate, $lt: invoiceFromDate, $options: 'i'  } },
                // eventName: { $regex: search, $options: 'i' },
                // updatedAt: { $regex: time.toISOString(), $options: 'i' }
            }).sort({ age: -1 }).limit(max || 200)
            return data
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getEstimateCountInvoiceSend = async (_, { search, idComp, CompName, min, max }, ctx) => {
    const idUser = ctx.User.id
    try {
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionSchema.find({ invoiceFrom: dataCompany.companyName })
            return data
        }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getAllCommissionInvoiceReceived,
        getEstimateCountInvoice,
        getAllCommissionInvoiceSent,
        getEstimateCountInvoiceSend,
        newArray,
        getOneCommissionInvoice
    },
    MUTATIONS: {
        isPaidStateInvoice,
        hasBeenReceived,
        isApprovedByInvoiceSenderMutation,
        isRedoStateInvoice
    }
}
