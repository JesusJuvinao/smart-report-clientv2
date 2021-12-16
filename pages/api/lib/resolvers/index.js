import accountResolver from './accounts'

export default {
    Query: {
    ...accountResolver.QUERIES,
    }
}  