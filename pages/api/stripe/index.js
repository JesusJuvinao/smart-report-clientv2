const stripe = require('stripe')('sk_test_519SnodASP58pVzlolZnehxM4f7xJqLGE8o9SejEF9cVHp7zPepzzrz2InM5eVjriVw6b1ncDnEuV8pMGqlLO1qMw008jUjnCGg');
import mongoose from 'mongoose';
import User from '../models/users/userLogin'

try {
    const uri = "mongodb+srv://doadmin:3UAzS8db4ci65701@db-mongodb-nyc3-07265-dd6a67db.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-nyc3-07265&tls=true&tlsCAFile=ca-certificate.crt";        
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
    db.once('open', () => {
        console.log('connected'); // si esta todo ok, imprime esto
    });

} catch (error) {
    console.log(error)
}


export default async (req, res) => {
        const {idUser} = req.query
        const userProfile = await findUserInDatabase(idUser)
        const stripeAccountMetaData = await connectUserToStripe(userProfile)
        await saveStripeAccountToUserProfile(stripeAccountMetaData,idUser)
        return res.json({ stripeAccountMetaData })
      }

      const connectUserToStripe =async (userProfile) => {
        // console.log(userProfile)
        const userEmail = userProfile[0].uEmail
        const country = 'GB'
        const stripeAccountTypeSetup = 'express'
        console.log(userEmail , country,stripeAccountTypeSetup,'IM HERE INSIDE THE CONNECT USER TO STRIPE FUNCTION')
        const account = await stripe.accounts.create({type: stripeAccountTypeSetup,email:userEmail,country});
        return account; //return me back to where you called me from!  returning the account object we got from stripe back to 
    }


    const findUserInDatabase = async (idUser) => {
        let userProfile;
        try {
            userProfile = await User.find({_id:idUser}).then(result => {
                if(result) {
                  console.log(`Successfully found document: ${result}.`);
                } else {
                  console.log("No document matches the provided query.");
                }
                return result;
              })
              .catch(err => console.error(`Failed to find document: ${err}`));
            return userProfile
        } catch (error) {
            throw new Error('Your request could not be processed - FIND USER IN DATABASE FUNCTION.', 500)
        }


    }

const saveStripeAccountToUserProfile = async (stripeAccountMetaData,idUser)=>{
    console.log(idUser)
    //   console.log(stripeAccountMetaData,idUser)
    const filter = { _id: idUser };
    const update = { stripeAccountMetaData };
            try {
                const data = await User.findOneAndUpdate(filter, update, {
                    new: true
                  });
                //   console.log(data,'IM DATA')
                return data
            } catch (error) {
                throw new Error('COULD NOT SAVE STRPIE DATA TO THE USER PROFILE.', 500)
            }
    }