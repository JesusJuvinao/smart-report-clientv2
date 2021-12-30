import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import React from 'react'
import currencyFormatter from 'currency-formatter'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/en-au'
import { dateFormat } from '../../utils'

// Create 
const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        paddingBottom: 20
    },
    sectionInfo: {
        paddingBottom: 20,
        paddingTop: 20,
        width: '100%',
        flexDirection: 'row'
        // flexWrap: 'wrap'
    },
    sectionHeader: {
        flexDirection: 'column',
        lineHeight: 1,
        paddingVertical: 20,
    },
    viewParagraph: {
        paddingTop: 15,
        paddingBottom: 10
    },
    tableSection: {
        flexDirection: 'column',
        paddingVertical: 20,
    },
    tableRow: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#cb1d6c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableRowItems: {
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
    },
    tableCell: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        overflow: 'hidden',
        borderColor: '#afafaf',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 7
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 7
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        alignSelf: 'flex-end',
    },
    subtitle: {
        fontSize: 7,
        color: '#000',
        textDecoration: 'underline',
        textAlign: 'right'
    },
    row: {
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    header: {
        padding: 1,
        justifyContent: 'center',
        backgroundColor: '#cb1d6c'
    },
    textHeader: {
        color: '#fff',
        fontSize: 10,

    },
    image: {
        objectFit: 'contain',
    },
})

const InvoicePdfGenerate = ({ pdfDocumentData }) => {
    const { dataInvoice } = pdfDocumentData
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>{moment().format('LL')} Generated document</Text>
                </View>
                <View style={{ width: 250, height: 100, marginBottom: 8 }}>
                    <Image style={[styles.image, { width: '100%', height: '100%' }]} src="/images/Spice-Logo.jpg" />
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#ccc' }]}>#  {dataInvoice?.getOneCommissionInvoice.invoiceRef}</Text>
                    <Text style={[styles.headerText, { fontSize: 30, fontWeight: 400, color: '#000' }]}>{`${dataInvoice?.legalName || ''}`}</Text>
                    <Text style={[styles.headerText, { fontSize: 13, fontWeight: 100, color: '#000' }]}> {dataInvoice?.getOneCommissionInvoice.invoiceTo}</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>{(dataInvoice?.getOneCommissionInvoice.invoiceDate)} Data created</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}> EventCommences: {(dataInvoice?.getOneCommissionInvoice.eventCommences)} </Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>{dataInvoice?.getOneCommissionInvoice.eventName}</Text>
                </View>
                <View style={styles.tableSection}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>N° ITEM</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal Tickets Sold</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Type </Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Sales Received</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Comm Subtotal</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>VAT On Comm</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Cat TotalDue</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Type Discount</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Subtotal Ticket TypeLess Discount</Text>
                        <Text style={[styles.tableCell, { width: '9%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Ticket Price</Text>
                    </View>
                    {dataInvoice && dataInvoice?.getOneCommissionInvoice?.lineItemsArray?.map((x, i) => (
                        <View key={x._id} style={styles.tableRowItems}>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{i + 1}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.subtotalTicketsSold, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{x.ticketType}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.lineSalesReceived, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.lineSubtotal, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.lineCommSubtotal, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.lineItemVATOnComm, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.ticketCategoryTotalDue, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.totalTicketTypeDiscount, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.subtotalTicketTypeLessDiscount, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                            <Text style={[styles.tableCell, { width: '9%', textAlign: 'center' }]}>{currencyFormatter.format(x.ticketPrice, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })}</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.sectionInfo]}>
                    <View>
                        <View style={{ width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}>Total Due</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.getOneCommissionInvoice.totalCommDue, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Sales Received</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.getOneCommissionInvoice.totalSalesReceived, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Discounts</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.getOneCommissionInvoice.totalDiscounts, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Vat On Comms</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.getOneCommissionInvoice.vatOnComms, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={{ paddingBottom: 10 }}>{currencyFormatter.format(dataInvoice?.getOneCommissionInvoice.totalCommDue, { code: dataInvoice?.getOneCommissionInvoice.currency ? dataInvoice?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const generatePdfDocumentInvoice = async documentData => {
    const blob = await pdf((
        <InvoicePdfGenerate
            title={`doc ${documentData?.dataInvoice?.getOneCommissionInvoice?.agentDetails?.legalName || ''}`}
            pdfDocumentData={documentData}
        />
    )).toBlob()
    saveAs(blob, documentData?.dataInvoice?.getOneCommissionInvoice?.agentDetails?.legalName || 'Doc')
}

generatePdfDocumentInvoice.propTypes = {
    pdfDocumentData: PropTypes.object
}