import { gql } from '@apollo/client'

export const CREATE_CURRENT_SESSION = gql`
mutation loginUser($uEmail: String!, $uPassword: String!, $idBrowser: String ) {
  loginUser(uEmail: $uEmail, uPassword: $uPassword, idBrowser: $idBrowser){
    user{
      id
      firstName
      lastName
      uPhone
      userName
      uEmail
      lastCompany
      uAddress
      uAvatar
      lastName
      role{
        id
        name
      }
    }
    token
    refreshToken
    admin
    success
    isVerifyEmail
    userId
    message
  }
}
`
