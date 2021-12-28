/* eslint-disable no-void */
import Cors from 'micro-cors'
import micro from 'micro';
import { ApolloServer } from 'apollo-server-micro'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import typeDefs from '../api/lib/typeDefs'
import resolvers from '../api/lib/resolvers/index'
import connectDb from './lib/db'
import withSession from '../../apollo/session'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'
import { CountriesAPI } from './lib/resolvers/Countries/countries'

const cors = Cors()

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            countriesAPI: new CountriesAPI()
        }
    },
    
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground(), httpHeadersPlugin],
    context: withSession(async ({ req, next }) => {
    //  Initialize as empty arrays - resolvers will add items if required
        const setCookies = []
        const setHeaders = []
        //  Initialize PubSub
        const pubsub = new PubSub()
        const { token } = req.session.get('user') || {}
        const idComp = req.headers.authorization?.split(' ')[1]
        const excluded = ['/login', '/forgotpassword', '/register', '/teams/invite/[id]', '/teams/manage/[id]']
        if (excluded.indexOf(req.session) > -1) return next()
        if (token) {
            const User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
            return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, pubsub, idComp }
        }
        return { req, setCookies: [], setHeaders: [], User: null || {}, pubsub, idComp: null || {} }
    }),
    subscriptions: {
        path: '/api/graphqlSubscriptions',
        keepAlive: 9000,
        // eslint-disable-next-line no-unused-vars
        // onConnect: (connectionParams, webSocket, context) => console.log('connected'),
        // onDisconnect: (webSocket, context) => console.log('disconnected')
    },
    playground: {
        subscriptionEndpoint: '/api/graphqlSubscriptions',
        settings: {
            'request.credentials': 'same-origin'
        }
    }
})
const startServer = apolloServer.start();

export default cors(async (req, res) => {
    cors()
    if (req.method === 'OPTIONS') {
        res.end()
        return
    }    
    await startServer;
    const handler = connectDb(apolloServer.createHandler({ path: '/api/graphql' }))
    return handler(req, res)
})
export const config = {
        api: {
            bodyParser: false,
            playground: true,
        }
}
