import { ApolloError } from 'apollo-server-errors'
import CommissionSchema from '../../../models/commisionInvoice/commisionInvoice'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'

export const getAllCommissionStatements = async (_, { idComp, CompName }, ctx) => {
    const idUser = ctx.User.id
    try {
        // const Array = await UserSchema.findOne({ _id: idUser })
        // const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        // if (dataComp && dataComp.length) {
        //     const dataCompany = await CompanySchema.findOne({ _id: idComp });
        //     const data = await CommissionSchema.find({ invoiceTo: dataCompany.companyName })
        //     return data
        // }

    } catch (error) {
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
