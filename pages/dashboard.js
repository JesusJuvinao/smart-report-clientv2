import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CompanyC } from '../container/dashboard'
import withSession from '../apollo/session'
import { Context } from '../context'
import { useUser } from '../container/Profile'
import UserSchema from '../pages/api/models/users/userLogin'
import Roles from '../pages/api/models/admin/admin'
import { decodeToken } from '../utils'
export default function Company() {
  const { setAlertBox, setCompanyLink, isCompany } = useContext(Context)
  const [dataUser] = useUser()
  return (<CompanyC setAlertBox={setAlertBox} setCompanyLink={setCompanyLink} isCompany={isCompany} dataUser={dataUser} />)
  // return (<h1 style={{ fontFamily: 'PFont-Regular', color: '#000', fontSize: '2em'  }} >We are in maintenance</h1>)
}

export const getServerSideProps = withSession(async function ({ req }) {
  try {
    const user = req?.session?.get('user')
    const { token } = user
    const data = decodeToken(token)
    const dataUser = await UserSchema.findById({ _id: token && data.id })
    const roles = await Roles.find({ _id: { $in: dataUser.roles } })
    // for (let i = 0; i < roles.length; i++) {
    //   if (roles[i].name === 'admin') {
    //     return { redirect: { destination: '/dashboard/admin' } }
    //   }
    // }
  } catch (error) {
    console.log('')
  }
  if (!req.cookies[process.env.SESSION_NAME]) return { redirect: { destination: '/login', permanent: false } }
  return {
    props: {}
  }
})


Company.propTypes = {
  id: PropTypes.string,
  setCompanyLink: PropTypes.func,
  isCompany: PropTypes.string
}
