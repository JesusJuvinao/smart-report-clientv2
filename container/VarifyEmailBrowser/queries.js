import { gql } from '@apollo/client'

export const DELETE_ONE_CATEGORIES = gql`
mutation DeleteOneCategories($id: ID) {
  DeleteOneCategories(id: $id)
}
`
export const SEND_EMAIL_CONFIRMATION_NEW_BROWSER = gql`
mutation sendEmailConfirmationBrowser($uEmail: String!, $userName: String ) {
    sendEmailConfirmationBrowser(uEmail: $uEmail, userName: $userName){
    success
    message
  } 
} 
`