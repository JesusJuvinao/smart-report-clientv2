import { useContext } from 'react'
import PropTypes from 'prop-types'
import UserSchema from '../../pages/api/models/users/userLogin'
import Roles from '../../pages/api/models/admin/admin'
import { ListCompanyC } from '../../container/ListCompany'
import { Context } from '../../context'
import withSession from '../../apollo/session'
import { decodeToken } from '../../utils'
export default function ListCompany(token, props) {
  const { setCompanyLink, isCompany, useCompany } = useContext(Context)
  return <><ListCompanyC setCompanyLink={setCompanyLink} isCompany={isCompany} useCompany={useCompany} /></>
}
export const getServerSideProps = withSession(async function ({ req }) {
  try {
    if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }
    const user = req?.session?.get('user')
    const { token } = user
    const data = decodeToken(token)
    const dataUser = await UserSchema.findById({ _id: token && data.id })
    const roles = await Roles.find({ _id: { $in: dataUser.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return { redirect: { destination: '/dashboard/admin' } }
      }
    }
  } catch (error) {
    console.log('')
  }

  return {
    props: {}
  }
})

ListCompany.propTypes = {
  setCompanyLink: PropTypes.func,
  isCompany: PropTypes.string
}
