import {gql} from '@apollo/client'

export const CREATE_USER = gql`
mutation Registry($body: CreateUserRequestDto!) {
    registry( body: $body ) {
        _id
        username
    }
}
`
export const SIGN_IN = gql`
mutation SignIn($body: SingInRequestDto!) {
    signIn( body: $body ) {
        accessToken
    }
}
`
export const GET_SHORT_LINK = gql`
mutation GetShortLink($body: GetShortLinkRequestDto!) {
    getShortLink( body: $body ) {
        shortLink
    }
}
`
export const CHANGE_PROFILE = gql`
mutation ChangeUser($body: ChangeUserRequestDto!) {
    changeUser( body: $body ) {
        username
        password
    }
}
`
export const GET_USERLINKS = gql`
query GetUserLinks {
    getUserLinks {
        shortLink
        link
    }
}
`
export const GET_PROFILE = gql`
query GetProfile {
    getProfile {
        username
    }
}
`