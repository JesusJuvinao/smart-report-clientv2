import { gql } from '@apollo/client'

export const GET_MODULES = gql`
query getAllModules {
  getAllModules {
    _id
    mPath
    mName
    mPriority
    mIcon
    lineItemsModules {
      _id
      smName
      smPath
      smState
    }
  }
}
`
export const CREATE_ONE_MODULE = gql`
mutation registerModule($input: IModules, $inputLineItemsMod: InputLineItemsSubModules) {
  registerModule(input: $input, inputLineItemsMod: $inputLineItemsMod ){
    _id
    mPath
    mName
    mPriority
    mIcon
  }
}
`
export const CREATE_ONE_USER_ADMIN = gql`
mutation RegisterUserAdmin( $userName: String! $uEmail: String! $uPassword: String! ) {
  RegisterUserAdmin(userName: $userName, uEmail: $uEmail, uPassword: $uPassword) {
    token
    refreshToken
    userId
    success
    message
  }
}
`
export const CREATE_ONE_ROLE = gql`
mutation createRoleMutation($input: IRole!) {
  createRoleMutation(input: $input){
    id
    name
  }
}
`
export const GET_ALL_ROLES = gql`
query getAllRoles {
  getAllRoles {
    id
    name
  }
}
`
export const DELETE_ONE_ROLE = gql`
mutation removeOneRole($id: ID) {
  removeOneRole(id: $id)
}
`
