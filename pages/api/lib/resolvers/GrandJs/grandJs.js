import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { transporter } from '../../../utils'
// import jsx from "jsx-template-engine";
import { Newsletter } from './views/Newsletter'
// const { View } = require("grandjs/lib");
// View.settings.set("views", "./views")
// const data = require("./data.json");
// const NewsLetter = View.importJsx("./views/Newsletter.jsx");

export const sendEmailTest = async (_, { email }, ctx) => {
    console.log(email, 'asjdgasjhdv')
    const mailer = transporter();
    return ({ message: email })
    try {
        // const htmlString = await jsx.render(<Newsletter />);
        // let template = View.renderToHtml(NewsLetter, { data })
        mailer.sendMail({
            from: email,
            to: email,
            text: 'Hello world?', // plain text body
            subject: 'Code recuperation.',
            html: `<Newsletter />`
        })

    } catch (e) {
        console.log(e)
        const error = new Error('Your request could not be processed')
        return error
    }
}

export default {
    TYPES: {
        User: {}
    },
    QUERIES: {},
    MUTATIONS: {
        sendEmailTest
    }
}
