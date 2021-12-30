import { ApolloError } from 'apollo-server-errors'
import CommissionInvoiceStatement from '../../../models/CommissionStatements/CStatementsSchema'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'
import { TemplateLeaveComp } from '../../templates/TemplateConfirm'
import { transporter } from '../../../utils'
import { TemplateCommissionStatement } from '../../templates/CommissionStatement'

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
            // return data
        }
        // const data = await CommissionInvoiceStatement.find({})
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
        return { success: true, message: `commission statement has been sent ${ statementToEmail } successfully.` }

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
        sendOneCommissionStatements
    }
}
