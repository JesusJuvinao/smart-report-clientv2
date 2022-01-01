const { ApolloError } = require('apollo-server-errors')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { View } = require("grandjs");
const NewsLetter = View.importJsx("./GrandJs.jsx");
const { transporter } = require ('../../../utils');

const data = require("./data.json");

export const getOneAllCompany = async (_, parent) => {
    const mailer = transporter();
    try {
        mailer.sendMail({
            from: 'Account recovery <no-reply@smartaccountingonline.com/>',
            to: uEmail,
            text: 'Hello world?', // plain text body
            subject: 'Code recuperation.',
            html: RecoverAccountTemplate({
                code: uToken,
                username: existEmail.firstName
            })
        })

    } catch (e) {
        const error = new Error('Your request could not be processed')
        return error
    }
}

export default {
    TYPES: {
        User: {}
    },
    QUERIES: {},
    MUTATIONS: { }
}
