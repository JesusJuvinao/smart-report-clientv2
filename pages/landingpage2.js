import { gql, useQuery } from '@apollo/client';
import withSession from '../apollo/session';
import { Landing2 } from '../container/Landing2';
export default function Home() {
  return (
    <Landing2 />
  )
}
export const getServerSideProps = withSession(async function ({ req }) {
  if (req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/dashboard', permanent: false } }
  return {
      props: { }
  }
})
