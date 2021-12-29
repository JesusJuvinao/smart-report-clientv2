/* eslint-disable no-shadow */
'use strict'
import { ApolloError } from 'apollo-server-errors'
import LicenceSchema from '../../../models/Licences/LicencesSchema'
import UserSchema from '../../../models/users/userLogin'
import Roles from '../../../models/admin/admin'

export const GetLicences = async (_, { input }, ctx) => {
    try {
        const idUser = ctx.User.id
        const data = await LicenceSchema.find({}).sort({ age: -1 }).limit(3)
        return data

    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const GetOneLicences = async (_, { id }, ctx) => {
    try {
        // const data = await LicenceSchema.findOne({ _id: id })
        const data = await LicenceSchema.findOne({})
        return data
    } catch (error) {
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export const registerGetLicences = async (_, { input, inputLineItems }, ctx) => {
    try {
        console.log(inputLineItems)
        const { LPrice, Ref, LDescuento, Date, EndDate, Active, LName, lineItemsLicences } = input || {}
        const { lineItemsDescription } = lineItemsLicences || {}
        const { setDataLicence } = inputLineItems || {}

        // const idUser = ctx.User.id
        const idUser = '61c38a904516c431d8c22e05'
        // Can only register the administrator
        const user = await UserSchema.findById({ _id: idUser })
        // const roles = await Roles.find({ _id: { $in: user.roles } })
        // for (let i = 0; i < roles.length; i++) {
        //     if (roles[i].name === '') {
        // const data = await LicenceSchema.create({ ...input })
        const data = await LicenceSchema.create({ LPrice, Ref, LDescuento, Date, EndDate, Active, LName, idUser })
        for (let i = 0; i < setDataLicence?.length; i++) {
            const { lineItemsDescription } = setDataLicence[i]
            await LicenceSchema.findOneAndUpdate(
                { _id: data._id },
                {
                    $addToSet: {
                        lineItemsLicences: {
                            $each: [{ lineItemsDescription }]
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
        // }
        // }
    } catch (error) {
        console.log(error)
        throw new ApolloError('Your request could not be processed.', 500)
    }
}
export default {
    TYPES: {},
    QUERIES: {
        GetLicences,
        GetOneLicences
    },
    MUTATIONS: {
        registerGetLicences
    }
}
