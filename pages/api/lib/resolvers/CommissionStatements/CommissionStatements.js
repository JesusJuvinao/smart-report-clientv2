import { ApolloError } from 'apollo-server-errors'
import CommissionInvoiceStatement from '../../../models/CommissionStatements/CStatementsSchema'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'
import { TemplateLeaveComp } from '../../templates/TemplateConfirm'
import { transporter } from '../../../utils'
import { TemplateCommissionStatement } from '../../templates/CommissionStatement'
import moment from 'moment'
import { TemplateInvoicePaid } from '../../templates/InvoicePaid'

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
    const InvoiceData = await CommissionInvoiceStatement.findOne({ _id: IdStatements })
    try {
        if (!InvoiceData) {
            return { success: false, message: 'The Invoice no exist' }
        }
        await CommissionInvoiceStatement.findOneAndUpdate(
            { _id: IdStatements },
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
    console.log(idComp, uEmail, IdStatements, company, statementToEmail)
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
    try {
        const idUser = ctx.User.id
        const dataUser = await UserSchema.findById({ _id: idUser })
        const mailer = transporter()
        mailer.sendMail({
            from: uEmail,
            to: statementToEmail,
            subject: `New Commission Statement `,
            html: TemplateCommissionStatement({
                username: dataUser?.userName,
                id: IdStatements
            })
        })
        return { success: true, message: `commission statement has been sent ${statementToEmail} successfully.` }

    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getAllCommissionStatementsFrom,
        getAllCommissionStatementsTo
    },
    MUTATIONS: {
        sendOneCommissionStatements,
        ViewCommissionStatements,
        isPaidOutCommissionStatements
    }
}
