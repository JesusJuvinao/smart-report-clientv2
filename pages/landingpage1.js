import { gql, useQuery } from '@apollo/client';
import withSession from '../apollo/session';
import { Landing1 } from '../container/Landing1';
export default function Landing1View() {
  return (
    <Landing1 />
  )
}