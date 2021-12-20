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
        "_id": "61bea751746e9fa4a79ffca7",
        "agentDetails": {
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
        },
        "invoiceDate": "03/07/2021",
        "invoiceRef": "diy0iF8F4V_tRtWz2IaQB",
        "invoiceTo": "Spice Manchester",
        "invoiceFrom": "Spice East Midlands",
        "eventType": "Non-TOMS",
        "eventRef": "EM0031514",
        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
        "eventCommences": "03/07/2021 18:30",
        "invoiceTotal": 0,
        "totalCommDue": 0,
        "totalSalesReceived": 0,
        "totalDiscounts": 0,
        "vatOnComms": 0,
        "isVATRegistered": true,
        "lineItemsArray": [
            {
                "subtotalTicketsSold": 9,
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
                        "id": "fFeHZiDlshAI8vEKOjUS5",
                        "bookingRef": "MCR0393394",
                        "bookedOn": "31/05/2021 09:55",
                        "client": "Annie Train",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcad"
                    },
                    {
                        "id": "eEZhEgTrQU9ttX9TwM2cQ",
                        "bookingRef": "MCR0393693",
                        "bookedOn": "25/06/2021 23:49",
                        "client": "Jason Massey",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcb2"
                    },
                    {
                        "id": "OQ6aA2eMKbYgZ-JoWOlNA",
                        "bookingRef": "MCR0393663",
                        "bookedOn": "22/06/2021 23:06",
                        "client": "Ian Weir",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcb3"
                    },
                    {
                        "id": "nccyDadhxGAP7AJ8EAxYm",
                        "bookingRef": "MCR0393268",
                        "bookedOn": "20/05/2021 17:42",
                        "client": "Julie Close",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcc0"
                    },
                    {
                        "id": "DfREPwNOE-dSIsyuqudbS",
                        "bookingRef": "MCR0393272",
                        "bookedOn": "20/05/2021 18:13",
                        "client": "Helen Dale",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcc1"
                    },
                    {
                        "id": "rp3RUzgLIYGX9RLJ1o0PR",
                        "bookingRef": "MCR0393273",
                        "bookedOn": "20/05/2021 18:23",
                        "client": "Hazel Burgess",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcc2"
                    },
                    {
                        "id": "vJFuTj3J7VNxyZXFgIiYz",
                        "bookingRef": "MCR0393503",
                        "bookedOn": "09/06/2021 21:38",
                        "client": "Janice Peel",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffcca"
                    },
                    {
                        "id": "GfbpYEUTnCXCkdoWlxAcK",
                        "bookingRef": "MCR0393469",
                        "bookedOn": "06/06/2021 06:15",
                        "client": "Ellen Davies",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffccc"
                    },
                    {
                        "id": "97GYB-0aZylWQOM9nmd2r",
                        "bookingRef": "MCR0393467",
                        "bookedOn": "05/06/2021 23:50",
                        "client": "Kathy Hanley",
                        "ticketoption": "Member",
                        "ticketquantity": 1,
                        "ticketprice": 0,
                        "totaldue": 0,
                        "totaldueCalc": 0,
                        "totalpaid": 0,
                        "balancedue": 0,
                        "commissionRatePercent": 5,
                        "commissionpayable": 0,
                        "agentCode": "Spice Manchester",
                        "clientOwnerAtPurchaseDate": "Spice Manchester",
                        "bookingStatus": "Booked",
                        "eventName": "SPICE EXCLUSIVE: Rock n Roll Bingo",
                        "eventOwner": "Spice East Midlands",
                        "eventCommences": "03/07/2021 18:30",
                        "discountRate": 0,
                        "discountTotal": 0,
                        "discountedTotalDue": 0,
                        "eventRef": "EM0031514",
                        "eventType": "Non-TOMS",
                        "_id": "61bea751746e9fa4a79ffccd"
                    }
                ]
            }
        ],
        "datePaid": "20/12/2021",
        "hasBeenReceived": false,
        "hasBeenSent": false,
        "isOnStatement": true,
        "statementId": "WDA7ZQ1RMv51a2Djj2Ms-"
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
                                <h5 style={Styles.textBold}>Commission Statement To: </h5>{console.log(data)}
                            </div>
                            <div style={Styles.block}>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.legalName} (T/a {data[0]?.agentDetails.agentTradingName})</h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentAddress1} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentAddress2} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentAddress3} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentCity} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentCounty} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentCountry} </h5>
                                <h5 style={Styles.text}>{data[0]?.agentDetails.agentPostCode} </h5>
                                <h5 style={Styles.text}>Company No:{data[0]?.agentDetails.agentCompanyNumber} </h5>
                                <h5 style={Styles.text}>VAT Reg No:{data[0]?.agentDetails.VATRegNo} </h5>
                                <h5 style={Styles.text}></h5>
                            </div>
                        </div>
                    </div>
                    <h1 style={Styles.title}> Commission Statement</h1>
                    <div style={Styles.subheader}>
                        <div style={Styles.block}>
                            <h2 style={Styles.textBlock}>Statement Date</h2>
                            <h2 style={Styles.textBlock}>{data[0]?.invoiceDate}</h2>
                        </div>
                        <div style={Styles.block}>
                            <h2 style={Styles.textBlock}>Agent Received</h2>
                            <h2 style={Styles.textBlock}>£ dasda{data[0]?.totalGrossSalesReceivedByYou?.toString()}</h2>
                        </div>
                        <div style={Styles.block}>
                            <h2 style={Styles.textBlock}>Other</h2>
                            <h2 style={Styles.textBlock}>£ {data[0]?.totalDiscounts?.toString()}</h2>
                        </div>
                    </div>
                    <div>
                    </div>
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
                
                    {data && data[0]?.lineItemsArray?.map(item => {
                        return (
                            <div key={item._id}>
                                <div style={Styles.section_one}>
                                    {item && item?.newArray?.map(lineitem => {
                                        return (
                                            <div key={lineitem._id} style={Styles.lineitembox} >
                                                <div style={Styles.Card}>
                                                    <h4 style={Styles.TextCardBold}>{lineitem.tickettype}</h4>
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
