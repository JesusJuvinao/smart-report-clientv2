import { withIronSession } from 'next-iron-session'

export default function withSession (handler) {
    return withIronSession(handler, {
        password: process.env.SESSION_KEY,
        // Session Name
        cookieName: process.env.SESSION_NAME,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production' ? true : false
        }
    })

}
