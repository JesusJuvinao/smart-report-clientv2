import { ApolloError } from 'apollo-server-errors'
import EventSalesData from '../../../models/Eventsalesdata/Eventsalesdata'
import UserSchema from '../../../models/users/userLogin'
import CompanySchema from '../../../models/Companies/CompanySchema'

export const getOneEventsalesdata = async (_, { idUser, idComp, eventName, company }, ctx) => {
    try {
        console.log(idUser, idComp, eventName, company)
        const data = await EventSalesData.findOne({ eventName: eventName })
        return data
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const geAllEventsalesdata = async (_, { idUser, idComp, company, max, search, min }, ctx) => {
    console.log( idUser, idComp, company, max, search, min)
    try {
        const idUser = ctx.User.id
        const Array = await UserSchema.findOne({ _id: idUser })
        const dataComp = await CompanySchema.find({ '_id': { $in: Array.idComp } });
        if (dataComp) {
            const dataCompany = await CompanySchema.findOne({ _id: idComp });
            const data = await EventSalesData.find({ eventOwner: dataCompany.companyName })
            return data
        }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}

export default {
    TYPES: {
    },
    QUERIES: {
        getOneEventsalesdata,
        geAllEventsalesdata,
    },
    MUTATIONS: {
    }
}
