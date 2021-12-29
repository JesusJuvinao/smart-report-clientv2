import React from 'react'
import withSession from '../../apollo/session'
import { useRouter } from 'next/router'
import UserSchema from '../../pages/api/models/users/userLogin'
import Roles from '../../pages/api/models/admin/admin'
import { DashboardComp } from '../../container/dashboard/dashboardComp'
import { decodeToken } from '../../utils'

export default function Company() {
  const router = useRouter()
  const idComp = router.query.idComp
  return (<DashboardComp idComp={idComp} />)
}
export const getServerSideProps = withSession(async function ({ req }) {
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login' } }

  try {
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
    console.log(error)
  }

  return {
    props: {}
  }
})
