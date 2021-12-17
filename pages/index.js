import { gql, useQuery } from '@apollo/client';
import withSession from '../apollo/session';
import { IndexC } from '../container/Home';
export default function Home() {
  const GET_BEASTS = gql`
  query sayHello {
    sayHello
}`;
  const { loading, error, data } = useQuery(GET_BEASTS);
  return (
     <IndexC />
     )
}
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req?.session?.get('user')
  if (!user) {
  // res.next()
      return { props: {} }
  }
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

  return {
      props: {}
  }
}
)
