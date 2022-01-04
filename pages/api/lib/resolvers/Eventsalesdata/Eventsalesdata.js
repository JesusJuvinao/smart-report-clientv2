import { ApolloError } from 'apollo-server-errors'
import EventSalesData from '../../../models/Eventsalesdata/Eventsalesdata'

export const getOneEventsalesdata = async (_, { idUser, idComp, IdSales, company }, ctx) => {
    try {
        console.log(idUser, idComp, IdSales, company)
        const data = await EventSalesData.findOne({ _id: IdSales })
        return data
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const geAllEventsalesdata = async (_, { idUser, idComp, company, max, search, min }, ctx) => {
    console.log( idUser, idComp, company, max, search, min)
    try {
        const data = await  EventSalesData.find({})
        console.log(data)
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
        getOneEventsalesdata,
        geAllEventsalesdata,
    },
    MUTATIONS: {
    }
}
