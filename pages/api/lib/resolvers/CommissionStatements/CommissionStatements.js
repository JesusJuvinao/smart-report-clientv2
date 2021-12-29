import { ApolloError } from 'apollo-server-errors'
import CommissionInvoiceStatement from '../../../models/CommissionStatements/CStatementsSchema'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'

export const getAllCommissionStatements = async (_, { search, idComp, CompName, min, max, datePaid, updatedAt, invoiceTo, invoiceFrom }, ctx) => {
    try {
        const idUser = ctx.User.id
            const data = await CommissionInvoiceStatement.find({ })
            return data
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getAllCommissionStatements
    }
}
