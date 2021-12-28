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
export const GET_ALL_LICENCE = gql`
query GetLicences($_idUser: ID){
  GetLicences(_idUser: $_idUser){
    _id
    idUser
    LName
    LPrice
    Ref
    LDescuento
    Date
    EndDate
    Active
  }
}
`
export const GET_ONE_LICENCE = gql`
query GetOneLicences($id: ID){
  GetOneLicences(id: $id){
    _id
    idUser
    LName
    LPrice
    Ref
    LDescuento
    Date
    EndDate
    Active
  }
}
`
export const CREATE_ONE_LICENCE = gql`
    mutation registerGetLicences($input: ILicences) {
        registerGetLicences(input: $input) {
          _id
          idUser
          LName
          LPrice
          Ref
          LDescuento
          Date
          EndDate
          Active
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
export const GET_USER_INFO = gql`
query getAlUserLocation($country: String) {
  getAlUserLocation(country: $country) {
    id
    idRoles
    firstName
    lastName
    userName
    uEmail
    uAvatar
    lat
    long
    role {
      id
      name
    }
    
  }
}
`
