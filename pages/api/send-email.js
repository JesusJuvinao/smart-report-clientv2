require("dotenv").config();
const { View } = require("grandjs");
const NodeMailer = require("nodemailer");
// const data = require("./data.json");
const NewsLetter = View.importJsx('./email-templates/Newsletter.jsx');

View.settings.set("views", "./email-templates")


export default async (req, res) => {
    console.log(req)

    console.log('REACHED THE API ENDPOINT')
    // const { name, description, image, quantity, price, licenceId } = req.body;
    // Mailer.sendNewsLetter();
    res.send(200)
  
}

manana

// class Mailer{
//     // USER_EMAIL_POST=novella.gottlieb54@ethereal.email
// // USER_PASS_POST=PGvMCGqupSQCtYk8WH
//     constructor() {
//         this.config = {
//             host: 'smtp.ethereal.email',
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: process.env.USER_EMAIL_POST, // generated ethereal user
//                 pass: process.env.USER_PASS_POST // generated ethereal password
//             }
//         }
//     }
//     async sendNewsLetter() {
//         try {
//             console.log(data.users, this.config)
//             const transporter = NodeMailer.createTransport(this.config);
//             let template = View.renderToHtml(NewsLetter, {data})
//             const mailOptions = {
//                 from: this.config.auth.user,
//                 to: 'novella.gottlieb54@ethereal.email',
//                 subject: "Daily News",
//                 html: template,
//             };
//             await transporter.sendMail(mailOptions);
//             console.log("mail sent successfully");
//         } catch(err) {
//             console.log(err);
//         }
//     }
// }


// module.exports = new Mailer();


