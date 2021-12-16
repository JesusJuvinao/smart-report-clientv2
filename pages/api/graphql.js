import connectDb from './lib/db'
import typeDefs from '../api/lib/typeDefs'
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'
import resolvers from '../api/lib/resolvers/index'
import { PubSub } from 'graphql-subscriptions'
import jwt from 'jsonwebtoken'
import withSession from '../../apollo/session'
import Cors from 'micro-cors'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql  } from 'apollo-server-micro'
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

// const typeDefs = gql`
//   type Query {
//     sayHello: String
//   }
// `

const server = new ApolloServer({
  resolvers,
  typeDefs,
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
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  // const handler = connectDb(apolloServer.createHandler({ path: '/api/graphql' }))
  await connectDb(server.createHandler({ path: "/api/graphql" })(req, res));
});
