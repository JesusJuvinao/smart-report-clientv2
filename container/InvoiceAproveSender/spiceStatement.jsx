import { dateFormat } from "../../utils";

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
        maxWidth: '50%'
    },
    wrapperFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '90%',
        alignContent: 'center',
        margin: '20px 0',
        minWidth: '90%',
        maxWidth: '90%',
        placeContent: 'center flex-end'
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
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '50%',
        minWidth: '50%',
        alignContent: 'center',
        maxWidth: '50%'
    },
    linkInvoice: {
        overflow: 'hidden',
        wordBreak: 'break-word',
        height: '150px',
        objectFit: 'contain',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0px',
        flexWrap: 'wrap',
        width: '10%',
        minWidth: '10%',
        alignContent: 'center',
        maxWidth: '10%'
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
        width: '33.33%',
        minWidth: '33.33%',
        maxWidth: '33.33%',
        height: '100px',
        display: 'inline-grid',
        justifyContent: 'flex-end',
        textAlign: 'start',
    },
    TextInfo: {
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
    btn: {
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
        textAlign: 'center'
    }
}
const data = [
    {
        "_id" : "61c3aa461d9cfd488813c2fc",
        "Date" : "2021-12-22T22:25:41.043Z",
        "isPaymentConfirm" : false,
        "idComp" : "61c38c5500f2d114980e255f",
        "Idescription" : "jhbjhjvhjvjhvjhhhjhjhjhjhjhjhjhjhvjhvjhvjhvjhvjhknlknlknlknlknlklklk",
        "totalInvoicePayment" : 7009.84,
        "lineItemsInvoiceIsPay" : [ 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa461d9cfd488813c2fe",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa461d9cfd488813c2ff",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c301",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c302",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c304",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c305",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c308",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c309",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c30c",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c30d",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c310",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c311",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c314",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c315",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa471d9cfd488813c317",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa471d9cfd488813c318",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c31a",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c31b",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c31d",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c31e",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c320",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c321",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c323",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c324",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c326",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c327",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c329",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c32a",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c32c",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c32d",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c32f",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c330",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa481d9cfd488813c332",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa481d9cfd488813c333",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa491d9cfd488813c335",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa491d9cfd488813c336",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa491d9cfd488813c338",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa491d9cfd488813c339",
                        "newArray" : []
                    }
                ]
            }, 
            {
                "isPaid" : false,
                "isApprovedByInvoiceSender" : false,
                "hasBeenReceived" : false,
                "isRedo" : false,
                "_id" : "61c3aa491d9cfd488813c33b",
                "agentDetails" : {
                    "legalName" : "SPICE BIRMINGHAM LIMITED",
                    "agentContact" : "Steve Dell",
                    "agentTradingName" : "Spice West Midlands",
                    "agentEmail" : "steve@spicebham.com",
                    "agentAddress1" : "Ryknild House",
                    "agentAddress2" : "Burnett Road",
                    "agentAddress3" : "Sutton Coldfield",
                    "agentCity" : "",
                    "agentCountry" : "England",
                    "agentPostCode" : "B74 3EL",
                    "VATRegNo" : "679 0904 96",
                    "agentVATRegistered" : true,
                    "agentCompanyNumber" : "04878169"
                },
                "lineItemsArray" : [ 
                    {
                        "_id" : "61c3aa491d9cfd488813c33c",
                        "newArray" : []
                    }
                ]
            }
        ],
        "__v" : 0
    }
]
export const InvoiceApproveSender = () => {

    return (    
        <div>
            <body style={Styles.body}>
                <div style={Styles.container} >
                    <div style={Styles.header} >
                        <div style={Styles.logo}>
                            <img style={Styles.logo} src="https://www.spiceuk.com/Images/Spice-Logo.jpg" alt="SpiceLogo" />
                        </div>
                        <div style={Styles.wrapperInfo}>
                            <div style={Styles.block}>
                                <h5 style={Styles.TextInfo}>{dateFormat(data[0]?.Date)}</h5>
                            </div>
                        </div>
                    </div>
                    <h1 style={Styles.title}> Invoice Payment </h1>
                    <h2 style={Styles.headerline} > Event name {data[0].eventName}  {data[0]?.eventRef}, {data[0]?.eventCommences}  </h2>
                    <div style={Styles.lineitembox}>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Booking Status:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>AgentCode:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Rev Tix Sold:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Subtotal:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Commission Due for Tix Sales:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}> Total Discounts Applied to Sales:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Total Due After Discounts:</h2>
                        </div>
                        <div style={Styles.Card}>
                            <h2 style={Styles.TextCard}>Ticket Price:</h2>
                        </div>
                    </div>
                
                    {data && data[0]?.lineItemsInvoiceIsPay?.map(item => {
                        return (
                            <div key={item._id}>
                                <div style={Styles.section_one}>
                                    {item && item?.newArray?.map(lineitem => {
                                        return (
                                            <div key={lineitem._id} style={Styles.lineitembox} >
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>{lineitem.ticketType}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}> {lineitem.agentCode}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {parseFloat(lineitem.balancedue).toFixed(2)}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {lineitem.bookedOn}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {lineitem.bookingRef}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {parseFloat(lineitem.bookingRef).toFixed(2)}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {parseFloat(lineitem.bookingRef).toFixed(2)}</h4>
                                                </div>
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>£ {lineitem.bookingRef}</h4>
                                                </div>
                                            </div>
                                        )
                                    })}
                                     <div style={Styles.header} >
                                        <div style={Styles.wrapperFooter}>
                                            <div style={Styles.ctnFooter}>
                                                <h5 style={Styles.textBold}>Total Commission Due:  </h5>
                                                <h5 style={Styles.text}>totalDiscounts: </h5>
                                                <h5 style={Styles.text}>Total Sales Received: </h5>
                                                <h5 style={Styles.text}>Vat On Commission: </h5>
                                                <h5 style={Styles.text}>Invoice Total: </h5>
                                            </div>
                                            <div style={Styles.ctnFooter}>
                                                <h5 style={Styles.text}>£ {data[0]?.totalCommDue}  </h5>
                                                <h5 style={Styles.text}>£ {data[0]?.totalDiscounts}</h5>
                                                <h5 style={Styles.text}>£ {data[0]?.totalSalesReceived}</h5>
                                                <h5 style={Styles.text}>£ {data[0]?.vatOnComms}</h5>
                                                <h5 style={Styles.text}>£ {data[0]?.invoiceTotal}</h5>
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
