import withSession from '../../../apollo/session'
import PropTypes from 'prop-types'
import { InviteEmployeeC } from '../../../container/Bills/Invite'

const InviteEmployee = () => {
    return ( <InviteEmployeeC /> )
}

InviteEmployee.propTypes = {

}

export default InviteEmployee

export const getServerSideProps = withSession(async function ({ req, res }) {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
    return {
      props: { }
    }
  })
  