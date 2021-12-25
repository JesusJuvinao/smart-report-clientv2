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
        fontSize: 14
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        alignSelf: 'flex-end',
    }
})

const InvoicePdfGeneratePay = ({ pdfDocumentData }) => {
    const { dataInvoice, dataForm } = pdfDocumentData
    const data = dataForm?.clientOne?.thirdParties || dataForm?.thirdParties
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{moment().format('LL')} generated Document</Text>
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.headerText}>{`${data?.tpName || ''} ${data?.tpLasNam || ''}`}</Text>
                    <Text style={styles.headerText}># {dataInvoice?.getOneInvoicePay.IdRef}</Text>
                    <Text style={styles.headerText}>{dateFormat(dataInvoice?.getOneInvoicePay.Date)} Data created</Text>
                    <Text style={styles.headerText}>Description </Text>
                    <Text style={styles.headerText}>{dataInvoice?.getOneInvoicePay.Idescription} </Text>
                </View>
                <View style={styles.viewParagraph}>
                    <Text style={styles.text}>Note</Text>
                </View>
                <View style={styles.tableSection}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>N° ITEM</Text>
                        <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>CURRENCY</Text>
                        <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>EMAIL</Text>
                        <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>NUMBER</Text>
                        <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>POST CODE</Text>
                    </View>
                    {dataInvoice && dataInvoice?.getOneInvoicePay?.lineItemsInvoiceIsPay?.map((x, i) => (
                        <View key={x._id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '20%', textAlign: 'left' }]}>{i+1}</Text>
                            <Text style={[styles.tableCell, { width: '20%', textAlign: 'left' }]}>{x?.currency || ' '}</Text>
                            <Text style={[styles.tableCell, { width: '20%', textAlign: 'left' }]}>{x?.agentDetails.agentEmail || ' '}</Text>
                            <Text style={[styles.tableCell, { width: '20%', textAlign: 'left' }]}>{x.agentDetails.agentCompanyNumber}</Text>
                            <Text style={[styles.tableCell, { width: '20%', textAlign: 'left' }]}>{x.agentDetails.agentPostCode}</Text>
                        </View>

                    ))}
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={{ paddingBottom: 10 }}>{dataInvoice?.getOneInvoicePay?.totalInvoicePayment}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const generatePdfDocument = async documentData => {
    const blob = await pdf((
        <InvoicePdfGeneratePay
            title='My PDF'
            pdfDocumentData={documentData}
        />
    )).toBlob()
    saveAs(blob, documentData?.fileName?.substring(0, documentData?.fileName?.lastIndexOf('.')) || 'MyDoc')
}

generatePdfDocument.propTypes = {
    pdfDocumentData: PropTypes.object
}