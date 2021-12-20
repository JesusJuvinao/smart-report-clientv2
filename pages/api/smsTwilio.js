// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const accountSid = process.env.ACCESS_SID_TWILIO
const authToken = process.env.ACCESS_TOKEN_AUTH_TWILIO
const client = require('twilio')(accountSid, authToken)

export default async function  handler (req, res) {
    try {
        const message = await client.messages.create({
            to: '+573014548087',
            from: '+12343513461',
            body: 'Parece que funciona'
        });
        console.log(message)
        return message;
        
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({ name: 'John Doe' })
  }