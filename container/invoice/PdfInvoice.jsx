import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/en-au'
import { dateFormat } from '../../utils'

// Create 
const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        
    },
    row: {
        padding: 5,
        marginLeft: 20,
        marginRight: 20,

    },
    rowItem:{
        borderBottom:1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10
    },
    subtitle: {
        fontSize: 7,
        color: '#000',
        textDecoration: 'underline',
        textAlign: 'right'
    },
    title1: {
        fontSize: 25,
        color: '#F88425',
        fontWeight: 'ultrabold',
        textTransform: 'uppercase',
        textAlign: 'left'
    },
    titleData: {
        fontSize: 10,
        color: '#F88425',
        textTransform: 'uppercase',
        textAlign: 'left',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        paddingLeft: 20
    },
    textData: {
        fontSize: 10,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    // page: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     justifyContent: 'flex-end'
    // },
    // section: {
    //     paddingBottom: 20
    // },
    // sectionHeader: {
    //     flexDirection: 'column',
    //     lineHeight: 1,
    //     paddingVertical: 20,
    //     borderWidth: 1,
    //     textAlign: 'center'
    // },
    // headerText: {
    //     fontSize: 10,
    //     float:'left',
    //     margin: 2,
    // },
    // viewParagraph: {
    //     paddingTop: 15,
    //     paddingBottom: 10
    // },
    // tableSection: {
    //     flexDirection: 'column',
    //     paddingVertical: 20,
    // },
    // tableRow: {
    //     flexDirection: 'row',
    //     overflow: 'hidden',
    //     width: '100%'
    // },
    // tableCell: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    //     overflow: 'hidden',
    //     borderColor: '#afafaf',
    //     paddingHorizontal: 6,
    //     paddingVertical: 4,
    //     fontSize: 10
    // },
    // footer: {
    //     position: 'absolute',
    //     bottom: 40,
    //     right: 40,
    //     alignSelf: 'flex-end',
    // },
    // text: {
    //     fontSize:10,
    // }
})

const InvoicePdfGenerate = ({ pdfDocumentData }) => {
    const { dataInvoice } = pdfDocumentData
    return (
        <Document>
            <Page size="A4">
                <View style={ style.container }>
                    <View style={ style.row }>
                        <Text style={ style.subtitle }>{moment().format('LL')} Generated document</Text>
                    </View>
                    <View style={ style.row }>
                        <Text style={ style.title1 }>COMMISSION PAYMENT</Text>
                    </View>
                    <View style={ style.row, style.rowItem }>
                        <Text style={ style.titleData }> Event Name: </Text>
                        <Text style={ style.textData }> {`${dataInvoice?.getOneCommissionInvoice.eventName || ''}`}</Text>
                    
                        <Text style={ style.titleData }> Reference: </Text>
                        <Text style={ style.textData }> {`${dataInvoice?.getOneCommissionInvoice.eventRef || ''}`}</Text>
                    
                        <Text style={ style.titleData }> Event Type: </Text>
                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.eventType}</Text>
                    
                        <Text style={ style.titleData }> Has Been Received: </Text>
                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.hasBeenReceived === true ? 'Yes' : 'No' }</Text>
                
                        <Text style={ style.titleData }> Invoice From: </Text>
                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.invoiceFrom }</Text>
                    </View>

                    <View style={ style.row, style.rowItem }>
                        <Text style={ style.titleData }> Invoice To: </Text>
                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.invoiceTo }</Text>
                        
                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.agentDetails.VATRegNo}</Text>

                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress1  }</Text>

                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress2  }</Text>

                        <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice.agentDetails.agentAddress3  }</Text>

                        <Text style={ style.textData }> {dateFormat(dataInvoice?.getOneCommissionInvoice.eventCommences)}</Text>

                        <Text style={ style.titleData }> DATE INVOICE: </Text>
                        <Text style={ style.textData }> {dateFormat(dataInvoice?.getOneCommissionInvoice.uploaded)}</Text>
                        
                    </View>
                    
                    <View style={ style.row, style.rowItem }>
                        <Text style={ style.titleData }>Note:</Text>
                        <Text style={ style.textData }>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</Text>
                    </View>
                    <View style={ style.row, style.rowItem } >
                        {dataInvoice && dataInvoice?.getOneCommissionInvoice?.lineItemsArray?.map((x, i) => (
                            <View key={x._id} >

                                <Text style={ style.titleData }>N° ITEM</Text>
                                <Text style={ style.textData }>{i+1}</Text>

                                <Text style={ style.titleData }>COMM SUBTOTAÑ</Text>
                                <Text style={ style.textData }>{x?.lineCommSubtotal || ' '}</Text>

                                <Text style={ style.titleData }>VAT ONCOMM</Text>
                                <Text style={ style.textData }>{x?.lineItemVATOnComm || ' '}</Text>

                                <Text style={ style.titleData }>Sales Received</Text>
                                <Text style={ style.textData }>{x.lineSalesReceived}</Text>

                                <Text style={ style.titleData }> SUBTOTAL</Text>
                                <Text style={ style.textData }>{x.lineCommSubtotal}</Text>

                                <Text style={ style.titleData }> SUBTOTAL TIKET TYPE LESSDISCOUNT </Text>
                                <Text style={ style.textData }>{x.subtotalTicketTypeLessDiscount}</Text>

                                <Text style={ style.titleData }> SUBTOTAL TIKETS SOLD </Text>
                                <Text style={ style.textData }>{x.subtotalTicketsSold}</Text>

                                <Text style={ style.titleData }> TIKETS CATEGORIE TOTAL DUE  </Text>
                                <Text style={ style.textData }>{x.ticketCategoryTotalDue}</Text>

                                <Text style={ style.titleData }>  TIKETS  PRICE  </Text>
                                <Text style={ style.textData }>{x.ticketPrice}</Text>

                                <Text style={ style.titleData }> TIKETS TYPE  </Text>
                                <Text style={ style.textData }>{x.ticketType}</Text>

                                <Text style={ style.titleData }> TOTAL TIKETS  TYPE DISCOUNT  </Text>
                                <Text style={ style.textData }>{x.totalTicketTypeDiscount}</Text>
                            </View>

                        ))}
                    </View>
                    <View style={ style.row, style.rowItem }>
                        <View >
                            <Text style={ style.titleData }> Is Paid: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.isPaid === true ? 'Yes' : 'No' }</Text>
                            <Text style={ style.titleData }> IsRedo: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.isRedo === true ? 'Yes' : 'No' }</Text>
                            <Text style={ style.titleData }> Is VAT Registered: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.isVATRegistered === true ? 'Yes' : 'No' }</Text>
                            <Text style={ style.titleData }> Total Sales Received: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.totalSalesReceived}</Text>
                            <Text style={ style.titleData }> Invoice Total: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.invoiceTotal}</Text>
                            <Text style={ style.titleData }> Total CommDue: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.totalCommDue}</Text>
                            <Text style={ style.titleData }> Total Discounts: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.totalDiscounts}</Text>
                            <Text style={ style.titleData }> Total vat OnComms: </Text>
                            <Text style={ style.textData }> {dataInvoice?.getOneCommissionInvoice?.vatOnComms}</Text>
                        </View>
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