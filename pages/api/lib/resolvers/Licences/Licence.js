/* eslint-disable no-shadow */
'use strict'
import { ApolloError } from 'apollo-server-errors'
import LicenceSchema from '../../../models/Licences/LicencesSchema'
import UserSchema from '../../../models/users/userLogin'
import Roles from '../../../models/admin/admin'

export const GetLicences = async (_, { input }, ctx) => {
    try {
        const idUser = ctx.User.id
        const data = await LicenceSchema.find({ idUser })
        return data
        
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const registerGetLicences = async (_, { input }, ctx) => {
    try {
        const { LPrice, Ref, LDescuento, Date, EndDate, Active, LName } = input || {}
        const idUser = ctx.User.id
    // Can only register the administrator
        const user = await UserSchema.findById({ _id: idUser })
        const roles = await Roles.find({ _id: { $in: user.roles } })
        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].name === '') {
            const data = await LicenceSchema.create({ LPrice, Ref, LDescuento, Date, EndDate, Active, LName, idUser })
            return data
            // }
            // }
        } catch (error) {
            throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {},
    QUERIES: {
        GetLicences
    },
    MUTATIONS: {
        registerGetLicences
    }
}
