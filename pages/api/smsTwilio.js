// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const accountSid = process.env.ACCESS_SID_TWILIO
const authToken = process.env.ACCESS_TOKEN_AUTH_TWILIO
const client = require('twilio')(accountSid, authToken)

export default function handler(req, res) {
    client.messages.create({
        to: '+573207963756',
        from: '+12343513461',
        body: 'Parece que funciona'
    })
    res.status(200).json({ name: 'John Doe' })
  }