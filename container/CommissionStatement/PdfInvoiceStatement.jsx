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
    sectionRow: {
        flexDirection: 'row',
        width: '100%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#000',

    },
    innerSectionHeader: {
        flexDirection: 'column',
        lineHeight: 1,
        // border
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: 'space-between',
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
        paddingHorizontal: 11,
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
    HeaderSubTitle: {
        // marginBottom: 20,
        // marginTo: 20,
    },
})

const InvoicePdfGenerateStatement = ({ pdfDocumentData }) => {
    const { dataInvoice } = pdfDocumentData
    // console.log(dataInvoice, 'data pdf download')
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
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Invoice type: {(dataInvoice?.invoiceType)}</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Statement Date: {(dataInvoice?.statementDate)} </Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Statement From: {dataInvoice?.statementFrom }</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Statement To: {dataInvoice?.statementTo}</Text>
                    <Text style={[styles.headerText, { fontSize: 12, fontWeight: 100, color: '#000' }]}>Events Month: {dataInvoice?.eventsMonth}</Text>
                </View>
                <View style={styles.tableSection}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>N° ITEM</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Event</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Type</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Currency</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Date</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>On Statement</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>On VAT Registered</Text>
                        <Text style={[styles.tableCell, { width: '12%', textAlign: 'center', color: '#fff', borderBottom: 'none' }]}>Total</Text>
                    </View>
                    {dataInvoice && dataInvoice?.invoicesIncOnStatement?.map((x, i) => (
                        <View key={x._id} style={styles.tableRowItems}>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{i + 1}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.eventName}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.eventType}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.currency}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.invoiceDate}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.isOnStatement ? 'YES' : 'NO'}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.isVATRegistered ? 'YES' : 'NO'}</Text>
                            <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{x.invoiceTotal}</Text>
                        </View>
                    ))}
                </View>
                <View style={[styles.sectionInfo]}>
                    <View>
                        <View style={{ width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 15, fontWeight: 100, color: '#000' }]}></Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}></Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Amount To Pay</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.totalAmountToPay, { code: dataInvoice?.currency ? dataInvoice?.currency : 'USD' })} </Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Commission PayableToYou</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.totalCommissionPayableToYou, { code: dataInvoice?.currency ? dataInvoice?.currency : 'USD' })} </Text>
                        </View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, width: 300, marginBottom: 8 }}>
                            <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000' }]}>Total Discounts</Text>
                            <Text style={[styles.headerText, { fontSize: 9, fontWeight: 100, color: '#000' }]}> {currencyFormatter.format(dataInvoice?.totalDiscounts, { code: dataInvoice?.currency ? dataInvoice?.currency : 'USD' })} </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={{ paddingBottom: 10 }}>{currencyFormatter.format(dataInvoice?.totalAmountToPay, { code: dataInvoice?.currency ? dataInvoice?.currency : 'USD' })} </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const generatePdfDocumentInvoiceStatement = async documentData => {
    // console.log(documentData, 'ESTE ES EL DOCUMENTO A  PAGAR ')
    const blob = await pdf((
        <InvoicePdfGenerateStatement
            title={`doc ${documentData?.dataInvoice?.agentDetails?.legalName || ''}`}
            pdfDocumentData={documentData}
        />
    )).toBlob()
    saveAs(blob, documentData?.dataInvoice?.agentDetails?.legalName || 'Doc')
}

generatePdfDocumentInvoiceStatement.propTypes = {
    pdfDocumentData: PropTypes.object
}

/**
 *             <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <Text style={styles.subtitle}>{moment().format('LL')} Generated document</Text>
                </View>
                <View style={styles.sectionHeader}>
                    <View style={styles.innerSectionHeader} >
                        <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}>
                            Statement From
                        </Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}>{dataInvoice.statementTo}</Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                    </View>
                    <View style={styles.innerSectionHeader} >
                        <View style={styles.sectionRow} >
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                Date:
                            </Text>
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                {dataInvoice.statementDate}
                            </Text>
                        </View >
                        <View style={styles.sectionRow} >
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                Events Month
                            </Text>
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                {dataInvoice.eventsMonth}
                            </Text>
                        </View >
                        <View style={styles.sectionRow} >
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                Vat No:
                            </Text>
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                To
                            </Text>
                        </View >
                        <View style={styles.sectionRow} >
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                Vat Type
                            </Text>
                            <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', width: '50%' }]}>
                                {dataInvoice.invoiceType}
                            </Text>
                        </View >
                    </View>
                    <View style={styles.innerSectionHeader} >
                        <Text style={[styles.HeaderSubTitle, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}>
                            Statement From
                        </Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}>{dataInvoice.statementFrom}</Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                        <Text style={[styles.headerText, { fontSize: 10, fontWeight: 100, color: '#000', margin: 5 }]}></Text>
                    </View>
                    <View style={[styles.innerSectionHeader, { padding: '2%', justify: 'center' }]} >
                        <Image style={[styles.image, { width: '100%' }]} src="/images/Spice-Logo.jpg" />
                    </View>
                </View>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>{dataInvoice?.eventName}</Text>
                </View>
 */