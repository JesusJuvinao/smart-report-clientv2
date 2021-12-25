import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/en-au'
import { dateFormat } from '../../utils'

// Create styles
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
        width: '100%'
    },
    tableCell: {
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        overflow: 'hidden',
        borderColor: '#afafaf',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 11
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        alignSelf: 'flex-end',
    }
})

const InvoicePdfGenerate = ({ pdfDocumentData }) => {
    const { dataInvoice } = pdfDocumentData
    console.log(dataInvoice, 'AQUI ES')
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{moment().format('LL')} generated Document</Text>
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.headerText}> event Name {`${dataInvoice?.getOneCommissionInvoice.eventName || ''}`}</Text>
                    <Text style={styles.headerText}> # {`${dataInvoice?.getOneCommissionInvoice.eventRef || ''}`}</Text>
                    <Text style={styles.headerText}> Event Type {dataInvoice?.getOneCommissionInvoice.eventType}</Text>
                    <Text style={styles.headerText}> hasBeenReceived: {dataInvoice?.getOneCommissionInvoice.hasBeenReceived === true ? 'Yes' : 'No' }</Text>
                    <Text style={styles.headerText}> Invoice From: {dataInvoice?.getOneCommissionInvoice.invoiceFrom }</Text>
                    <Text style={styles.headerText}> Invoice To: {dataInvoice?.getOneCommissionInvoice.invoiceTo }</Text>
                    <Text style={styles.headerText}> {dataInvoice?.getOneCommissionInvoice.agentDetails.VATRegNo}</Text>
                    <Text style={styles.headerText}> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress1  }</Text>
                    <Text style={styles.headerText}> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress2  }</Text>
                    <Text style={styles.headerText}> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress3  }</Text>
                    <Text style={styles.headerText}> {dateFormat(dataInvoice?.getOneCommissionInvoice.eventCommences)}</Text>
                    <Text style={styles.headerText}> {dateFormat(dataInvoice?.getOneCommissionInvoice.uploaded)} DATA INVOICE</Text>
                </View>
                <View style={styles.viewParagraph}>
                    <Text style={styles.text}>Note</Text>
                </View>
                <View style={styles.tableSection}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>N° ITEM</Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>COMM SUBTOTAÑ</Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>VAT ONCOMM</Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>Sales Received</Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}> SUBTOTAL</Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}> SUBTOTAL TIKET TYPE LESSDISCOUNT </Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}> SUBTOTAL TIKETS SOLD </Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}> TIKETS CATEGORIE TOTAL DUE  </Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}>  TIKETS  TYPE  </Text>
                        <Text style={[styles.tableCell, { width: '10%', textAlign: 'center' }]}> TOTAL TIKETS  TYPE DISCOUNT  </Text>
                    </View>
                    {dataInvoice && dataInvoice?.getOneCommissionInvoice?.lineItemsArray?.map((x, i) => (
                        <View key={x._id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{i+1}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x?.lineCommSubtotal || ' '}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x?.lineItemVATOnComm || ' '}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.lineSalesReceived}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.lineCommSubtotal}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.subtotalTicketTypeLessDiscount}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.subtotalTicketsSold}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.ticketCategoryTotalDue}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.ticketPrice}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.ticketType}</Text>
                            <Text style={[styles.tableCell, { width: '10%', textAlign: 'left' }]}>{x.totalTicketTypeDiscount}</Text>
                        </View>

                    ))}
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={{ paddingBottom: 10 }}> Is Paid {dataInvoice?.getOneCommissionInvoice?.isPaid === true ? 'Yes' : 'No' }</Text>
                        <Text style={{ paddingBottom: 10 }}> IsRedo {dataInvoice?.getOneCommissionInvoice?.isRedo === true ? 'Yes' : 'No' }</Text>
                        <Text style={{ paddingBottom: 10 }}> Is VAT Registered {dataInvoice?.getOneCommissionInvoice?.isVATRegistered === true ? 'Yes' : 'No' }</Text>
                        <Text style={{ paddingBottom: 10 }}> Total Sales Received {dataInvoice?.getOneCommissionInvoice?.totalSalesReceived}</Text>
                        <Text style={{ paddingBottom: 10 }}> Invoice Total {dataInvoice?.getOneCommissionInvoice?.invoiceTotal}</Text>
                        <Text style={{ paddingBottom: 10 }}> Total CommDue {dataInvoice?.getOneCommissionInvoice?.totalCommDue}</Text>
                        <Text style={{ paddingBottom: 10 }}> Total Discounts{dataInvoice?.getOneCommissionInvoice?.totalDiscounts}</Text>
                        <Text style={{ paddingBottom: 10 }}> Total vat OnComms{dataInvoice?.getOneCommissionInvoice?.vatOnComms}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const generatePdfDocumentInvoice = async documentData => {
    const blob = await pdf((
        <InvoicePdfGenerate
            title='My PDF'
            pdfDocumentData={documentData}
        />
    )).toBlob()
    saveAs(blob, documentData?.fileName?.substring(0, documentData?.fileName?.lastIndexOf('.')) || 'MyDoc')
}

generatePdfDocumentInvoice.propTypes = {
    pdfDocumentData: PropTypes.object
}