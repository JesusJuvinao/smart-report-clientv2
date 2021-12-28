import { gql, useQuery } from '@apollo/client';
import withSession from '../apollo/session';
import { IndexC } from '../container/Home';
export default function Home() {
  const GET_BEASTS = gql`
  query sayHello {
    sayHello
}`;
  // const { loading, error, data } = useQuery(GET_BEASTS);
  return (
    <IndexC />
  )
}
export const getServerSideProps = withSession(async function ({ req }) {
  if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/dashborad', permanent: false } }
  return {
      props: { }
  }
})
