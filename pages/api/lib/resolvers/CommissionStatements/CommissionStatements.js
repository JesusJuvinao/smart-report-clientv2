import { ApolloError } from 'apollo-server-errors'
import CommissionInvoiceStatement from '../../../models/CommissionStatements/CStatementsSchema'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'
import { TemplateLeaveComp } from '../../templates/TemplateConfirm'
import { sendEmail, transporter } from '../../../utils'
import { TemplateCommissionStatement } from '../../templates/CommissionStatement'
import ReactDOMServer from 'react-dom/server'
import moment from 'moment'
import { isApprovedInvoiceSenderStatement, TemplateInvoicePaid } from '../../templates/InvoicePaid'
import { SpiceStatement } from '../../../../../container/SpiceStatement/spiceStatement'

export const getOneCommissionStatement = async (_, { idComp, CompName, IdStatement }, ctx) => {
    try {

        const data = await CommissionInvoiceStatement.findOne({ _id: IdStatement })
        return data

    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllCommissionStatementsFrom = async (_, { search, idComp, CompName, min, max, datePaid, updatedAt, invoiceTo, invoiceFrom }, ctx) => {
    try {
        const idUser = ctx.User.id
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionInvoiceStatement.find({ statementFrom: dataCompany.companyName })
            return data
        }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const getAllCommissionStatementsTo = async (_, { search, idComp, CompName, min, max, datePaid, updatedAt, invoiceTo, invoiceFrom }, ctx) => {
    try {
        const idUser = ctx.User.id
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp && dataComp.length) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await CommissionInvoiceStatement.find({ statementTo: dataCompany.companyName })
            return data
        }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const isPaidOutCommissionStatements = async (_, { idComp, uEmail, IdStatements, company, statementToEmail }, ctx) => {
    // console.log(idComp, uEmail, IdStatements, company, statementToEmail)
    const InvoiceData = await CommissionInvoiceStatement.findOne({ _id: IdStatements })
    try {
        if (!InvoiceData) { return { success: false, message: 'The Invoice no exist' } }
        await CommissionInvoiceStatement.findOneAndUpdate(
            { _id: IdStatements },
            {
                $set: {
                    isPaid: InvoiceData.isPaid !== true
                }
            }
        )
        // await BillSchema.findOneAndUpdate({ 'lineItems._id': idArray },
        //     {
        //         $set: { 'lineItems.$.lineItemsDescription': lineItemsDescription, 'lineItems.$.lineItemsQuantity': lineItemsQuantity, 'lineItems.$.lineItemsTotalVAT': lineItemsTotalVAT, 'lineItems.$.lineItemsIdVAT': lineItemsIdVAT, 'lineItems.$.lineItemsRate': lineItemsRate, 'lineItems.$.lineItemsIdClass': lineItemsIdClass, 'lineItems.$.lineItemsIdPro': lineItemsIdPro, 'lineItems.$.lineItemsIdAccount': lineItemsIdAccount, 'lineItems.$.lineItemsSubTotal': lineItemsSubTotal, 'lineItems.$.lineItemsBillIva': lineItemsBillIva }
        //     })
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        if (InvoiceData) {
            mailer.sendMail({
                from: uEmail,
                to: statementToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: TemplateInvoicePaid({
                    invoiceRef: 'ref',
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isPaid !== true ? 'paid' : 'No paid',
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Inactive' : 'Active'} status` }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
// hasInvoiceBeenOpenedByRecipient
export const ViewCommissionStatements = async (_, { idComp, uEmail, IdStatements, company, statementToEmail }, ctx) => {
    // console.log(idComp, uEmail, IdStatements, company, statementToEmail)
    // const InvoiceData = await CommissionInvoiceStatement.findOne({ _id: IdStatements })
    try {
        await CommissionInvoiceStatement.findOneAndUpdate({ 'invoicesIncOnStatement._id': IdStatements },
            {
                $set: { 'invoicesIncOnStatement.$.hasInvoiceBeenOpenedByRecipient': true }
            })
        const today = moment().format('DD/MM/YYYY HH:mm');
        const hour = moment().format('HH:mm');
        const mailer = transporter()
        mailer.sendMail({
            from: uEmail,
            to: statementToEmail,
            text: 'Hello world?',
            subject: 'Notification De Invoice Change.',
            html: TemplateInvoicePaid({
                invoiceRef: 'ref',
                uEmail,
                date: today,
                hour,
                statusInvoice: 'paid',
            })
        })
        return { success: true, message: `the invoice changed to ` }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const sendOneCommissionStatements = async (_, { idComp, company, uEmail, statementToEmail, IdStatements }, ctx) => {
    console.log(idComp, company, uEmail, statementToEmail, IdStatements)
    try {
        const idUser = ctx.User.id
        const dataUser = await UserSchema.findById({ _id: idUser })
        const dataStatement = await CommissionInvoiceStatement.findById({ _id: IdStatements })
        console.log(dataStatement)
        const mailer = transporter()
        // HERE JESUS
        const renderHtml = ReactDOMServer.renderToString(<SpiceStatement data={dataStatement} />);
        sendEmail({
            from: uEmail,
            to: statementToEmail,
            subject: `New Commission Statement `,
            html: renderHtml
        }).then(res => console.log('the res')).catch(err => console.log(err, 'the err')) 
        return { success: true, message: `commission statement has been sent ${statementToEmail} successfully.` }

    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}


// NEW FUNCIONS
export const isRedoStateInvoiceStatement = async (_, { idInvoice, ToEmail, uEmail }) => {
    const InvoiceData = await CommissionInvoiceStatement.findOne({ _id: idInvoice })
   // console.log(InvoiceData)
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionInvoiceStatement.findOneAndUpdate(
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
                    invoiceRef: InvoiceData && InvoiceData.eventName,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'Redo' : 'No Redo',
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Redo inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }

}
export const isApprovedByInvoiceSenderStatement = async (_, { idInvoice, ToEmail, uEmail }) => {
    const InvoiceData = await CommissionInvoiceStatement.findOne({ _id: idInvoice })
    // console.log(InvoiceData)
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionInvoiceStatement.findOneAndUpdate(
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
            mailer.sendMail({
                from: uEmail,
                to: ToEmail,
                text: 'Hello world?',
                subject: 'Notification De Invoice Change.',
                html: isApprovedInvoiceSenderStatement({
                    invoiceRef: InvoiceData && InvoiceData.eventName,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isRedo !== true ? 'Redo' : 'No Redo',
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Redo inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }

}
export const isPaidStatementInvoice = async (_, { idInvoice, ToEmail, uEmail }, ctx) => {
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
                    invoiceRef: InvoiceData && InvoiceData.eventName,
                    uEmail,
                    date: today,
                    hour,
                    statusInvoice: InvoiceData.isPaid !== true ? 'paid' : 'No paid',
                })
            })
        }
        return { success: true, message: `the invoice changed to ${InvoiceData.isPaid === true ? 'Inactive' : 'Active'} status` }
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }

}
export default {
    TYPES: {
    },
    QUERIES: {
        getOneCommissionStatement,
        getAllCommissionStatementsFrom,
        getAllCommissionStatementsTo
    },
    MUTATIONS: {
        sendOneCommissionStatements,
        isApprovedByInvoiceSenderStatement,
        isRedoStateInvoiceStatement,
        ViewCommissionStatements,
        isPaidOutCommissionStatements
    }
}
