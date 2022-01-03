import { dateFormat } from "../../utils";
import { ToastContainer, toast } from 'react-toastify';
const Styles = {
    body: {
        backgroundColor: '#fff',
        margin: '0px',
        padding: '0px'
    },
    section_one: {
        margin: 0
    },
    container: {
        maxWidth: '30cm',
        margin: '0 auto',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        backgroundColor: 'white',
        fontSize: '0px',
        padding: '40px',
        fontFamily: '\'Roboto\',sans-serif',
    },
    text: {
        fontSize: '14px',
        display: 'inline-block',
        fontWeight: '300',
        color: '#000000',
        lineHeight: 1.4,
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif',
        justifyContent: 'flex-end',
        display: 'flex',
        textAlign: 'right',
        justifyContent: 'end'
    },
    InitText: {
        fontSize: '14px',
        display: 'inline-block',
        fontWeight: '300',
        color: '#000000',
        lineHeight: 1.4,
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif'
    },
    textBlock: {
        fontSize: '16px',
        display: 'inline-block',
        fontWeight: '300',
        color: '#000000',
        lineHeight: 1.4,
        margin: '15px 0',
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif',
    },
    textBold: {
        fontSize: '12px',
        display: 'inline-block',
        fontWeight: '600',
        color: '#000000',
        lineHeight: 1.4,
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif',
    },
    header: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#1a0303',
        display: '-webkit-box',
        lineHeight: '40px',
        flexWrap: 'wrap',
        fontWeight: '400px',
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        margin: '0px',
        justifyContent: 'space-between',
    },
    lineitembox: {
        fontSize: '10px',
        color: ' #000',
        lineHeight: '20px',
        border: '1px dotted #c7c7c7',
        fontWeight: '400px',
        margin: '0px',
        width: '100%',
        textOverflow: 'ellipsis',
        minWidth: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'start',
    },
    wrapperInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '50%',
        minWidth: '50%',
        alignContent: 'center',
        maxWidth: '50%',
        flexDirection: 'column'

    },
    Column: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        alignContent: 'center',
        flexDirection: 'column'
    },
    wrapperFooter: {
        display: 'flex',
        margin: '0px',
        flexWrap: 'wrap',
        alignContent: 'center',
        width: '50%',
        minWidth: '50%',
        maxWidth: '50%',
        height: '250px',
        flexFlow: 'wrap-reverse',
        alignItems: 'end',
        alignItems: 'flex-end'
    },
    subheader: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#1a0303',
        display: 'flex',
        justifyContent: 'space-between',
        wordBreak: 'break-word',
        lineHeight: '40px',
        fontWeight: '400px',
        margin: '0px',
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
    },
    headerline: {
        fontSize: '16px',
        marginBottom: '16px',
        backgroundColor: '#cb1d6c',
        color: '#fff',
        margin: '0px',
        padding: '5px',
        verticalAlign: 'middle',
    },
    img: {
        display: 'inline',
        wordBreak: 'break-word',
        width: '25%',
        minWidth: '25%',
        maxWidth: '25%',
        verticalAlign: 'middle',
    },
    paragraph: {
        display: 'inline-block',
        fontSize: '14px',
        fontWeight: '300',
        color: '#000000',
        wordBreak: 'break-word',
        width: 'calc(75% - 40px)',
        minWidth: 'calc(75% - 40px)',
        maxWidth: 'calc(75% - 40px)',
        overflow: 'hidden',
        margin: '0',
        lineHeight: 1.4,
        verticalAlign: 'middle',
    },
    title: {
        display: 'inline-block',
        overflow: 'hidden',
        fontSize: '40px',
        fontFamily: '\'Roboto\',sans-serif',
        fontWeight: '300',
        color: '#000000',
        wordBreak: 'break-word',
        lineHeight: 1.4,
        verticalAlign: 'middle',
    },
    LateralInfo: {
        display: 'inline-block',
        overflow: 'hidden',
        fontSize: '20px',
        fontFamily: '\'Roboto\',sans-serif',
        fontWeight: '300',
        color: '#000000',
        wordBreak: 'break-word',
        lineHeight: 1.4,
        verticalAlign: 'middle',
    },
    Subparagraph: {
        display: 'inline-block',
        fontSize: '17px',
        overflow: 'hidden',
        fontWeight: '400',
        wordBreak: 'break-word',
        color: '#000000',
        lineHeight: 1.4,
        verticalAlign: 'middle',
    },
    Card: {
        borderLeft: '1px dotted #c7c7c7',
        padding: '5px',
        maxWidth: '12%',
        wordBreak: 'break-word',
        minWidth: '12%',
        overflow: 'hidden',
        width: '12%'
    },
    logo: {
        overflow: 'hidden',
        wordBreak: 'break-word',
        height: '150px',
        objectFit: 'contain',
        display: 'flex',
        justifyContent: ' top space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '50%',
        minWidth: '50%',
        alignContent: 'center',
        maxWidth: '50%'
    },
    ctnContent: {
        overflow: 'hidden',
        wordBreak: 'break-word',
        objectFit: 'contain',
        display: 'block',
        justifyContent: 'top space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '50%',
        minWidth: '50%',
        alignContent: 'center',
        maxWidth: '50%',
        flexDirection: 'column !important',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'initial',
        flexDirection: 'column',
        display: 'grid',
    },
    linkInvoice: {
        width: '300px',
        height: '150px',
        objectFit: 'contain',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '300px',
        minWidth: '300px',
        alignContent: 'center',
        maxWidth: '300px',
        minHeight: '36px',
        fontWeight: '300',
        backgroundColor: '#ce081f',
        overflow: 'hidden',
        border: 'none',
        padding: '10px',
        wordBreak: 'break-word',
        display: 'inline-flex',
        flexFlow: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 'auto',
        maxWidth: 'auto',
        margin: '20px 0',
        lineHeight: '20px',
        cursor: 'pointer',
        borderRadius: '18px',
        fontSize: '15px',
        color: '#fff',
        height: '40px',
        width: 'auto',
        textAlign: 'center',
        marginTop: '200px',
        width: '200px'
    },
    subtext: {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        wordBreak: 'break-word',
        overflow: 'hidden'
    },
    TextCard: {
        fontSize: '12px',
        display: 'inline-block',
        fontWeight: '300',
        overflow: 'hidden',
        color: '#000000',
        wordBreak: 'break-word',
        lineHeight: 1.4,
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif',
    },
    TextCardBold: {
        overflow: 'hidden',
        fontSize: '12px',
        display: 'inline-block',
        fontWeight: '400',
        color: '#000000',
        lineHeight: 1.4,
        wordBreak: 'break-word',
        verticalAlign: 'middle',
        fontFamily: '\'Roboto\',sans-serif',
    },
    block: {
        width: '33.33%',
        minWidth: '33.33%',
        maxWidth: '33.33%',
        height: '100px',
        display: 'inline-grid',
        justifyContent: 'flex-start',
        textAlign: 'start',
    },
    ctnFooter: {
        width: '50%',
        minWidth: '50%',
        maxWidth: '50%',
        height: '100px',
        display: 'inline-grid',
        justifyContent: 'flex-end',
        textAlign: 'start',
    },
    ctnFooter2: {
        width: '50%',
        minWidth: '50%',
        maxWidth: '50%',
        height: '100px',
        display: 'inline-grid',
        justifyContent: 'flex-end',
        textAlign: 'end',
    },
    btn: {

    },
    Link: {
        color: '#fff',
        margin: 'auto',
        textAlign: 'center',
        textDecoration: 'none'
    },
    Wrap: {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: 'auto',
        display: 'inline-grid',
        justifyContent: 'flex-start',
        textAlign: 'start',
        display: 'flex',
        border: '3px dashed rgba(0,0,0,.05)',
    },
    textWraper: {
        fontSize: '14px',
        lineheight: '1px',
        margin: 0,
    },
    CardWrapper: {
        width: '50%',
        height: 'auto',
        display: 'inline-grid',
        justifyContent: 'flex-start',
        lineHeight: 1.15,
        boxSizing: 'border-box',
        margin: 0,
        textAlign: 'start',
        padding: '1%',
        borderRadius: 3,
        cursor: 'pointer'
    },
}
const data = [
    /* 1 */
    {
        "_id": "61cfa2336c91f9212626a871",
        "statementId": "o0Vx1ZFBVOEBVCrSi0xN_",
        "statementFromDetails": [
            {
                "legalName": "SPICE MANCHESTER LIMITED",
                "agentContact": "Lauren Fawkes",
                "agentTradingName": "Spice Manchester",
                "agentEmail": "lauren@spicemcr.com",
                "agentAddress1": "11 Claremont Avenue",
                "agentAddress2": "",
                "agentAddress3": "",
                "agentCity": "West Timperley",
                "agentCounty": "Altrincham",
                "agentCountry": "England",
                "agentPostCode": "WA14 5NF",
                "VATRegNo": "926 7426 03",
                "agentVATRegistered": true,
                "agentCompanyNumber": "06505643",
                "id": 5
            }
        ],
        "statementFromEmail": "lauren@spicemcr.com",
        "statementFrom": "Spice Manchester",
        "statementToDetails": [
            {
                "legalName": "SPICE (SCOTLAND) LIMITED",
                "agentTradingName": "Spice Scotland",
                "agentContact": "Jamie Morris",
                "agentEmail": "jamie@spicescotland.com",
                "agentAddress1": "7 Glenlee Gardens",
                "agentAddress2": "",
                "agentAddress3": "",
                "agentCity": "Edinburgh",
                "agentCounty": "",
                "agentCountry": "Scotland",
                "agentPostCode": "EH8 7HG",
                "VATRegNo": "",
                "agentVATRegistered": false,
                "agentCompanyNumber": "SC375093",
                "id": 6
            }
        ],
        "statementToEmail": "jamie@spicescotland.com",
        "statementTo": "Spice Scotland",
        "statementDate": "01/01/2022",
        "invoiceType": "TOMS",
        "eventsMonth": "12/2021",
        "emailedDate": "01/01/2022",
        "totalAmountToPay": 119.69,
        "totalCommissionPayableToYou": 6.31,
        "totalGrossSalesReceivedByYou": 126,
        "totalDiscounts": 0,
        "invoicesIncOnStatement": [
            {
                "_id": "61bed705195e83fb4989609a",
                "agentDetails": {
                    "legalName": "SPICE (SCOTLAND) LIMITED",
                    "agentTradingName": "Spice Scotland",
                    "agentContact": "Jamie Morris",
                    "agentEmail": "jamie@spicescotland.com",
                    "agentAddress1": "7 Glenlee Gardens",
                    "agentAddress2": "",
                    "agentAddress3": "",
                    "agentCity": "Edinburgh",
                    "agentCounty": "",
                    "agentCountry": "Scotland",
                    "agentPostCode": "EH8 7HG",
                    "VATRegNo": "",
                    "agentVATRegistered": false,
                    "agentCompanyNumber": "SC375093",
                    "id": 6
                },
                "invoiceDate": "03/12/2021",
                "invoiceRef": "nnedJTloQSz0qu7gNzbZk",
                "invoiceTo": "Spice Scotland",
                "invoiceFrom": "Spice Manchester",
                "eventType": "TOMS",
                "eventRef": "SH0000156",
                "eventName": "Conway Hostel Festive Social & Chillout Weekend",
                "eventCommences": "03/12/2021 16:00",
                "invoiceTotal": 113.52,
                "totalCommDue": 5.98,
                "totalSalesReceived": 119.5,
                "totalDiscounts": 0,
                "vatOnComms": 0,
                "isVATRegistered": false,
                "lineItemsArray": [
                    {
                        "subtotalTicketsSold": 1,
                        "ticketType": "Member Ensuite Dormitory Share",
                        "lineSalesReceived": 119.5,
                        "lineSubtotal": 113.52,
                        "lineCommSubtotal": 5.98,
                        "lineItemVATOnComm": 0,
                        "ticketCategoryTotalDue": 119.5,
                        "totalTicketTypeDiscount": 0,
                        "subtotalTicketTypeLessDiscount": 119.5,
                        "ticketPrice": 119.5,
                        "newArray": [
                            {
                                "id": "ShXfTOWXCyQZPBRlxKaYE",
                                "bookingRef": "SCO0134626",
                                "bookedOn": "19/10/2021 09:26",
                                "client": "Kirsty Dillingham",
                                "ticketoption": "Member Ensuite Dormitory Share",
                                "ticketquantity": 1,
                                "ticketprice": 119.5,
                                "totaldue": 119.5,
                                "totaldueCalc": 119.5,
                                "totalpaid": 119.5,
                                "balancedue": 0,
                                "commissionRatePercent": 5,
                                "commissionpayable": 5.98,
                                "agentCode": "Spice Scotland",
                                "clientOwnerAtPurchaseDate": "Spice Scotland",
                                "bookingStatus": "Booked",
                                "eventName": "Conway Hostel Festive Social & Chillout Weekend",
                                "eventOwner": "Spice Manchester",
                                "eventCommences": "03/12/2021 16:00",
                                "discountRate": 0,
                                "discountTotal": 0,
                                "discountedTotalDue": 119.5,
                                "eventRef": "SH0000156",
                                "eventType": "TOMS",
                                "_id": "61bed705195e83fb498960ac"
                            }
                        ]
                    }
                ],
                "currency": "GBP",
                "eventsMonth": "12/2021",
                "hasInvoiceBeenOpenedByRecipient": false,
                "hasInvoiceBeenSent": false,
                "isOnStatement": true,
                "statementId": "o0Vx1ZFBVOEBVCrSi0xN_"
            },
            {
                "_id": "61bed70f195e83fb498960e4",
                "agentDetails": {
                    "legalName": "SPICE (SCOTLAND) LIMITED",
                    "agentTradingName": "Spice Scotland",
                    "agentContact": "Jamie Morris",
                    "agentEmail": "jamie@spicescotland.com",
                    "agentAddress1": "7 Glenlee Gardens",
                    "agentAddress2": "",
                    "agentAddress3": "",
                    "agentCity": "Edinburgh",
                    "agentCounty": "",
                    "agentCountry": "Scotland",
                    "agentPostCode": "EH8 7HG",
                    "VATRegNo": "",
                    "agentVATRegistered": false,
                    "agentCompanyNumber": "SC375093",
                    "id": 6
                },
                "invoiceDate": "04/12/2021",
                "invoiceRef": "BMvQDtkGU5L3Ob13rIxBj",
                "invoiceTo": "Spice Scotland",
                "invoiceFrom": "Spice Manchester",
                "eventType": "TOMS",
                "eventRef": "MCR0036294",
                "eventName": "Conway Crafting: Make a set of wine glass charms",
                "eventCommences": "04/12/2021 15:00",
                "invoiceTotal": 0,
                "totalCommDue": 0,
                "totalSalesReceived": 0,
                "totalDiscounts": 0,
                "vatOnComms": 0,
                "isVATRegistered": false,
                "lineItemsArray": [
                    {
                        "subtotalTicketsSold": 1,
                        "ticketType": "Member",
                        "lineSalesReceived": 0,
                        "lineSubtotal": 0,
                        "lineCommSubtotal": 0,
                        "lineItemVATOnComm": 0,
                        "ticketCategoryTotalDue": 0,
                        "totalTicketTypeDiscount": 0,
                        "subtotalTicketTypeLessDiscount": 0,
                        "ticketPrice": 0,
                        "newArray": [
                            {
                                "id": "C43FhXJ6liYpyTlZE4hJf",
                                "bookingRef": "SCO0134802",
                                "bookedOn": "24/11/2021 19:16",
                                "client": "Kirsty Dillingham",
                                "ticketoption": "Member",
                                "ticketquantity": 1,
                                "ticketprice": 0,
                                "totaldue": 0,
                                "totaldueCalc": 0,
                                "totalpaid": 0,
                                "balancedue": 0,
                                "commissionRatePercent": 5,
                                "commissionpayable": 0,
                                "agentCode": "Spice Scotland",
                                "clientOwnerAtPurchaseDate": "Spice Scotland",
                                "bookingStatus": "Booked",
                                "eventName": "Conway Crafting: Make a set of wine glass charms",
                                "eventOwner": "Spice Manchester",
                                "eventCommences": "04/12/2021 15:00",
                                "discountRate": 0,
                                "discountTotal": 0,
                                "discountedTotalDue": 0,
                                "eventRef": "MCR0036294",
                                "eventType": "TOMS",
                                "_id": "61bed70f195e83fb498960ed"
                            }
                        ]
                    }
                ],
                "currency": "GBP",
                "eventsMonth": "12/2021",
                "hasInvoiceBeenOpenedByRecipient": false,
                "hasInvoiceBeenSent": false,
                "isOnStatement": true,
                "statementId": "o0Vx1ZFBVOEBVCrSi0xN_"
            },
            {
                "_id": "61bed71b195e83fb49896102",
                "agentDetails": {
                    "legalName": "SPICE (SCOTLAND) LIMITED",
                    "agentTradingName": "Spice Scotland",
                    "agentContact": "Jamie Morris",
                    "agentEmail": "jamie@spicescotland.com",
                    "agentAddress1": "7 Glenlee Gardens",
                    "agentAddress2": "",
                    "agentAddress3": "",
                    "agentCity": "Edinburgh",
                    "agentCounty": "",
                    "agentCountry": "Scotland",
                    "agentPostCode": "EH8 7HG",
                    "VATRegNo": "",
                    "agentVATRegistered": false,
                    "agentCompanyNumber": "SC375093",
                    "id": 6
                },
                "invoiceDate": "04/12/2021",
                "invoiceRef": "u6l_gfMaNQ17Ad7dkPWNS",
                "invoiceTo": "Spice Scotland",
                "invoiceFrom": "Spice Manchester",
                "eventType": "TOMS",
                "eventRef": "MCR0036293",
                "eventName": "Conway Crafting: Glass Painting Session",
                "eventCommences": "04/12/2021 13:30",
                "invoiceTotal": 0,
                "totalCommDue": 0,
                "totalSalesReceived": 0,
                "totalDiscounts": 0,
                "vatOnComms": 0,
                "isVATRegistered": false,
                "lineItemsArray": [
                    {
                        "subtotalTicketsSold": 1,
                        "ticketType": "Member",
                        "lineSalesReceived": 0,
                        "lineSubtotal": 0,
                        "lineCommSubtotal": 0,
                        "lineItemVATOnComm": 0,
                        "ticketCategoryTotalDue": 0,
                        "totalTicketTypeDiscount": 0,
                        "subtotalTicketTypeLessDiscount": 0,
                        "ticketPrice": 0,
                        "newArray": [
                            {
                                "id": "3uFLFd7X3RVulbJLEjgDh",
                                "bookingRef": "SCO0134803",
                                "bookedOn": "24/11/2021 19:19",
                                "client": "Kirsty Dillingham",
                                "ticketoption": "Member",
                                "ticketquantity": 1,
                                "ticketprice": 0,
                                "totaldue": 0,
                                "totaldueCalc": 0,
                                "totalpaid": 0,
                                "balancedue": 0,
                                "commissionRatePercent": 5,
                                "commissionpayable": 0,
                                "agentCode": "Spice Scotland",
                                "clientOwnerAtPurchaseDate": "Spice Scotland",
                                "bookingStatus": "Booked",
                                "eventName": "Conway Crafting: Glass Painting Session",
                                "eventOwner": "Spice Manchester",
                                "eventCommences": "04/12/2021 13:30",
                                "discountRate": 0,
                                "discountTotal": 0,
                                "discountedTotalDue": 0,
                                "eventRef": "MCR0036293",
                                "eventType": "TOMS",
                                "_id": "61bed71b195e83fb4989610c"
                            }
                        ]
                    }
                ],
                "currency": "GBP",
                "eventsMonth": "12/2021",
                "hasInvoiceBeenOpenedByRecipient": false,
                "hasInvoiceBeenSent": false,
                "isOnStatement": true,
                "statementId": "o0Vx1ZFBVOEBVCrSi0xN_"
            },
            {
                "_id": "61bed734195e83fb4989613c",
                "agentDetails": {
                    "legalName": "SPICE (SCOTLAND) LIMITED",
                    "agentTradingName": "Spice Scotland",
                    "agentContact": "Jamie Morris",
                    "agentEmail": "jamie@spicescotland.com",
                    "agentAddress1": "7 Glenlee Gardens",
                    "agentAddress2": "",
                    "agentAddress3": "",
                    "agentCity": "Edinburgh",
                    "agentCounty": "",
                    "agentCountry": "Scotland",
                    "agentPostCode": "EH8 7HG",
                    "VATRegNo": "",
                    "agentVATRegistered": false,
                    "agentCompanyNumber": "SC375093",
                    "id": 6
                },
                "invoiceDate": "05/12/2021",
                "invoiceRef": "L7kVFZn_kR4s7pZcl8RAs",
                "invoiceTo": "Spice Scotland",
                "invoiceFrom": "Spice Manchester",
                "eventType": "TOMS",
                "eventRef": "MCR0036279",
                "eventName": "Conway/Conwy Spice Exclusive Blue Badge Guided Tour - Sunday",
                "eventCommences": "05/12/2021 10:30",
                "invoiceTotal": 6.17,
                "totalCommDue": 0.33,
                "totalSalesReceived": 6.5,
                "totalDiscounts": 0,
                "vatOnComms": 0,
                "isVATRegistered": false,
                "lineItemsArray": [
                    {
                        "subtotalTicketsSold": 1,
                        "ticketType": "Member",
                        "lineSalesReceived": 6.5,
                        "lineSubtotal": 6.17,
                        "lineCommSubtotal": 0.33,
                        "lineItemVATOnComm": 0,
                        "ticketCategoryTotalDue": 6.5,
                        "totalTicketTypeDiscount": 0,
                        "subtotalTicketTypeLessDiscount": 6.5,
                        "ticketPrice": 6.5,
                        "newArray": [
                            {
                                "id": "egkVfPb8UcNoBwuA6Igs0",
                                "bookingRef": "SCO0134804",
                                "bookedOn": "24/11/2021 20:13",
                                "client": "Kirsty Dillingham",
                                "ticketoption": "Member",
                                "ticketquantity": 1,
                                "ticketprice": 6.5,
                                "totaldue": 6.5,
                                "totaldueCalc": 6.5,
                                "totalpaid": 6.5,
                                "balancedue": 0,
                                "commissionRatePercent": 5,
                                "commissionpayable": 0.33,
                                "agentCode": "Spice Scotland",
                                "clientOwnerAtPurchaseDate": "Spice Scotland",
                                "bookingStatus": "Booked",
                                "eventName": "Conway/Conwy Spice Exclusive Blue Badge Guided Tour - Sunday",
                                "eventOwner": "Spice Manchester",
                                "eventCommences": "05/12/2021 10:30",
                                "discountRate": 0,
                                "discountTotal": 0,
                                "discountedTotalDue": 6.5,
                                "eventRef": "MCR0036279",
                                "eventType": "TOMS",
                                "_id": "61bed734195e83fb49896145"
                            }
                        ]
                    }
                ],
                "currency": "GBP",
                "eventsMonth": "12/2021",
                "hasInvoiceBeenOpenedByRecipient": false,
                "hasInvoiceBeenSent": false,
                "isOnStatement": true,
                "statementId": "o0Vx1ZFBVOEBVCrSi0xN_"
            }
        ],
        "totalVATOnComms": 0
    }
]
export const SpiceStatement = () => {
    console.log(data)
    const notify = () => toast("Wow so easy!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={100}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <button onClick={notify}>Notify!</button>
            <body style={Styles.body}>
                <div style={Styles.container} >
                    <div style={Styles.header} >
                        <div style={Styles.logo}>
                            <img style={Styles.logo} src="https://res.cloudinary.com/smart-accounting/image/upload/v1641080921/images-template-smart-repor-client/Spice-Logo_l9dt7f.jpg" alt="SpiceLogo" />
                        </div>
                        <div style={Styles.wrapperInfo}>
                            <div style={Styles.block}>
                                <h5 style={Styles.LateralInfo}>INVOICE DATE:  </h5>
                            </div>
                            <div style={Styles.block}>
                                <h5 style={Styles.LateralInfo}>{dateFormat(data[0].Date)} </h5>
                            </div>
                        </div>
                    </div>
                    <h1 style={Styles.title}> COMMISSION STATEMENTS</h1>
                    <div style={Styles.Wrap}>
                        <div style={Styles.CardWrapper}>
                            <div style={Styles.header} >
                                <div style={Styles.ctnContent}>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>Statement From Details  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>VATRegNo  </h5>
                                    {data?.statementFromDetails?.agentAddress1 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentAddress1  </h5>}
                                    {data?.statementFromDetails?.agentAddress2 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentAddress2  </h5>}
                                    {data?.statementFromDetails?.agentAddress3 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentAddress3 </h5>}
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentCity  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentCompanyNumber  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentContact  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentCountry  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentCounty  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentEmail  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentPostCode  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>agentVATRegistered  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, width: '100%', margin: 0, padding: 0 }}>legalName  </h5>
                                </div>
                                <div style={Styles.ctnContent}>
                                    {data[0]?.statementFromDetails?.map(x => (
                                        <div style={{ display: 'grid', flexDirection: 'column', textAlign: 'start', flexDirection: 'column' }}>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentTradingName}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.VATRegNo}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentAddress1 || ''}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentAddress2 || ''}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentAddress3 || ''}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentCity}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentCompanyNumber}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentContact}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentCountry}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentCounty}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentEmail}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentPostCode}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.agentVATRegistered === true ? 'Yes' : 'No'}</h5>
                                            <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>{x.legalName}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={Styles.CardWrapper}>
                            <div style={Styles.header} >
                                <div style={Styles.ctnContent}>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>Statement To Details  </h5>
                                    {data?.statementToDetails?.VATRegNo && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>VATRegNo  </h5>}
                                    {data?.statementToDetails?.agentAddress1 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentAddress1  </h5>}
                                    {data?.statementToDetails?.agentAddress2 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentAddress2  </h5>}
                                    {data?.statementToDetails?.agentAddress3 && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentAddress3 </h5>}
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentCity  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentCompanyNumber  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentContact  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentCountry  </h5>
                                    {data?.statementToDetails?.agentCounty && <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentCounty  </h5>}
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentEmail  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentPostCode  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>agentVATRegistered  </h5>
                                    <h5 style={{ fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300, margin: 0 }}>legalName  </h5>
                                </div>
                                <div style={Styles.ctnContent}>
                                    {data[0]?.statementToDetails?.map(x => (
                                        <>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentTradingName}</h5>
                                            {x.VATRegNo && <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.VATRegNo}</h5>}
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentAddress1 || ''}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentAddress2 || ''}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentAddress3 || ''}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentCity}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentCompanyNumber}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentContact}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentCountry}</h5>
                                            {x.agentCounty && <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentCounty}</h5>}
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentEmail}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentPostCode}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.agentVATRegistered === true ? 'Yes' : 'No'}</h5>
                                            <h5 style={{ margin: 0, fontSize: '15px', worBreak: 'break-word', overflow: 'hidden', lineHeight: 1.4, verticalAlign: 'middle', display: 'inline-block', fontWeight: 300 }}>{x.legalName}</h5>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* the map */}
                    {data && data[0]?.invoicesIncOnStatement?.map(item => {
                        return (
                            <div key={item._id}>sla
                                <h2 style={Styles.headerline} > Agent Trading Name: {item.agentDetails.agentTradingName}  </h2>
                                <div style={Styles.section_one}>
                                    <div style={Styles.lineitembox}>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Event Commences:</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Event Name</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Event Ref</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Event Type</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Events Month</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}> Invoice From</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Invoice To</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Ticket Price:</h2>
                                        </div>
                                    </div>
                                    {/* MAIN DATA */}
                                    <div style={Styles.lineitembox}>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.eventCommences}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.eventName}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.eventRef}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.eventType}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.eventsMonth}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}> {item.invoiceFrom}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>{item.invoiceTo}</h2>
                                        </div>
                                        <div style={Styles.Card}>
                                            <h2 style={Styles.TextCard}>Ticket Price:</h2>
                                        </div>
                                    </div>
                                    <div style={Styles.header} >
                                        <div style={Styles.wrapperFooter}>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <button style={Styles.linkInvoice}>
                                                <a href={`http://localhost:3000/invoice/${item._id}`}  style={Styles.Link} target="_blank" rel="noreferrer" ><span style={Styles.Link} >View Invoice</span> </a>
                                            </button>
                                        </div>
                                        <div className="esta es beklwherlwk" style={Styles.wrapperFooter}>
                                            <div style={Styles.ctnFooter}>
                                                <h5 style={Styles.textBold}>InvoiceTotal  </h5>
                                                <h5 style={Styles.InitText}>Total  Comm Due </h5>
                                                <h5 style={Styles.InitText}>Total Sales Received: </h5>
                                                <h5 style={Styles.InitText}>Vat On Comms </h5>
                                            </div>
                                            <div style={Styles.ctnFooter2}>
                                                <h5 style={Styles.text}>£ {parseFloat(item?.invoiceTotal).toFixed(2)}  </h5>
                                                <h5 style={Styles.text}>£ {item?.totalCommDue}</h5>
                                                <h5 style={Styles.text}>£ {item?.totalSalesReceived}</h5>
                                                <h5 style={Styles.text}>£ {item?.vatOnComms}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </body>
        </div>
    );
}
