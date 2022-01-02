import UserResolvers from './users'
import BillsResolvers from './Bill'
import adminResolver from './admin'
import SupplierResolvers from './Supplier'
import CompanyResolvers from './Company'
import SalesInvoicePaymetResolver from './SalesInvoicePayments'
import dateTimeScalar from './CustomScalar'
import CurrencyResolvers from './Currency'
import CountriesResolvers from './Countries'
import DashboardResolvers from './Dashboard'
import SaleResolvers from './Saleinvoice'
import productsResolvers from './Products'
import CategoriesResolvers from './Categories'
import IvaResolvers from './Iva'
import accountResolver from './Account'
import uploadFileResolver from './Upload'
import detailResolver from './DetailSales'
import LicenceModules from './Licences'
import CommissionStatements from './CommissionStatements'
import CommentsResolver from './Commets'
import CommissionInvoice from './CommissionInvoice'
import grandJs from './GrandJs'
import taxedResolver from './Taxes'
import reportsResolver from './Reports'
import ClassResolver from './class'
import modulesResolver from './Modules'
import registerEmailsTemplateResolver from './TemplatesEmails'
import GraphQLUpload from 'graphql-upload'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const NEW_USER = "NEW_USER"
export default {
    ...UserResolvers.TYPES,
    ...SupplierResolvers.TYPES,
    ...CommissionStatements.TYPES,
    ...BillsResolvers.TYPES,
    ...modulesResolver.TYPES,
    ...CompanyResolvers.TYPES,
    ...CurrencyResolvers.TYPES,
    ...CountriesResolvers.TYPES,
    ...SalesInvoicePaymetResolver.TYPES,
    ...uploadFileResolver.TYPES,
    ...LicenceModules.TYPES,
    ...ClassResolver.TYPES,
    DateTime: dateTimeScalar,
    Upload: GraphQLUpload,
    Query: {
        ...reportsResolver.QUERIES,
        ...CommissionInvoice.QUERIES,
        ...SalesInvoicePaymetResolver.QUERIES,
        ...taxedResolver.QUERIES,
        ...ClassResolver.QUERIES,
        ...CommentsResolver.QUERIES,
        ...registerEmailsTemplateResolver.QUERIES,
        ...modulesResolver.QUERIES,
        ...detailResolver.QUERIES,
        ...accountResolver.QUERIES,
        ...uploadFileResolver.QUERIES,
        ...CommissionStatements.QUERIES,
        ...IvaResolvers.QUERIES,
        ...CategoriesResolvers.QUERIES,
        ...productsResolvers.QUERIES,
        ...UserResolvers.QUERIES,
        ...adminResolver.QUERIES,
        ...BillsResolvers.QUERIES,
        ...SupplierResolvers.QUERIES,
        ...CurrencyResolvers.QUERIES,
        ...CountriesResolvers.QUERIES,
        ...CompanyResolvers.QUERIES,
        ...LicenceModules.QUERIES,
        ...DashboardResolvers.QUERIES,
        ...SaleResolvers.QUERIES
    },
    Subscription: {
        testEmit: {
            subscribe: () => pubsub.asyncIterator('testEmit')
        },
        newUser: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER),
        },
    },
    Mutation: {
        ...registerEmailsTemplateResolver.MUTATIONS,
        ...modulesResolver.MUTATIONS,
        ...CommissionStatements.MUTATIONS,
        ...CommissionInvoice.MUTATIONS,
        ...grandJs.MUTATIONS,
        ...taxedResolver.MUTATIONS,
        ...uploadFileResolver.MUTATIONS,
        ...SalesInvoicePaymetResolver.MUTATIONS,
        ...accountResolver.MUTATIONS,
        ...IvaResolvers.MUTATIONS,
        ...reportsResolver.MUTATIONS,
        ...CategoriesResolvers.MUTATIONS,
        ...LicenceModules.MUTATIONS,
        ...ClassResolver.MUTATIONS,
        ...productsResolvers.MUTATIONS,
        ...CurrencyResolvers.MUTATIONS,
        ...CountriesResolvers.MUTATIONS,
        ...adminResolver.MUTATIONS,
        ...UserResolvers.MUTATIONS,
        ...SupplierResolvers.MUTATIONS,
        ...BillsResolvers.MUTATIONS,
        ...CompanyResolvers.MUTATIONS,
        ...SaleResolvers.MUTATIONS
    }
}
