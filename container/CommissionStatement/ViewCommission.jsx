import React, { useContext, useState, useMemo } from 'react'
import currencyFormatter from 'currency-formatter'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { PLVColor, PVColor, SCColor, SEGColor, TBGAColor, BGColor, TBGBColor, TBGDColor, TBGVColor, TFBColor, EColor } from '../../public/colors'
import { Container, Card, Text, Content, ContentTableItem, TableButton, Options, ContainerStatements, CardInvoice, Row, FooterInfo, WrapInvoice, SectionRow, Input } from './styled'
import Link from 'next/link'
import { RippleButton } from '../../components/Ripple'
import { IconUser } from '../../public/icons'
import { ALL_COMMISSION_STATEMENT, SEND_COMMISSION_STATEMENT } from './queries'
import { useCompanyHook } from '../dashboard'
import ActiveLink from '../../components/common/Link'
import { generatePdfDocumentInvoiceStatement } from './PdfInvoiceStatement'
const newDataFormatted = (data) => {
    var rightNow = new Date(data);
    var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "-");
    return res
}
export const ViewCommissionStatements = ({ data, loading }) => {
    console.log(data, 'AQUI ES LA DATA')
    // STATES}
    const [dataCompany] = useCompanyHook()
    // console.log(dataCompany)
    const [lineItemsModal, setLineItemsModal] = useState(false)
    const { setAlertBox, setCompanyLink, isCompany } = useContext(Context)
    const [modal, setModalConfirm] = useState(false)
    const [dataItems, setDataLineItems] = useState({})
    // QUERIES
    const [sendOneCommissionStatements, { loading: loadingSend }] = useMutation(SEND_COMMISSION_STATEMENT, {
        onCompleted: (data) => {
            setAlertBox({ message: `${data?.sendOneCommissionStatements?.message}` })
            setModalConfirm(false)
        },
        update(cache) {
            cache.modify({ fields: { getAllCommissionStatementsFrom(dataOld = []) { return cache.writeQuery({ query: ALL_COMMISSION_STATEMENT, data: dataOld }) } } })
        }
    })
    // HANDLESS
    const handleOpenLineItems = data => {
        setLineItemsModal(!lineItemsModal)
        setDataLineItems(data)
    }
    const handleConfirmIsOnStatements = () => {
        const dataBool = data?.invoicesIncOnStatement.map(x => { return { onStatement: x.isOnStatement } })
        // console.log(dataBool)
        for (let i = 0; i < dataBool.length; i++) {
            if (dataBool[i].onStatement !== true) {
                setAlertBox({ message: 'The commission statement invoice is not ready to be sent' })
            } else {    
                return sendOneCommissionStatements({
                    variables: {
                        idComp: 'colcasda',
                        company: '12312312',
                        uEmail: 'odavalencia002@gmail.com',
                        IdStatements: data._id,
                        statementToEmail: 'odavalencia002@gmail.com'
                    }
                }).catch(err => setAlertBox({ message: 'error' }))
            }
        }
    }
    // hasInvoiceBeenSent cuando todo esta ok
    // hasInvoiceBeenOpenedByRecipient cuando el usuario ya lo ha abierto esta ok
    // {dataItems?.lineItemsArray && dataItems?.lineItemsArray?.map(x => x.newArray?.map((z, i) => (

    const [search, setSearch] = useState({ agentCode: '' })
    const filterLineItems = useMemo(() =>
        dataItems?.lineItemsArray && dataItems?.lineItemsArray?.filter((data) => {
            if (search.agentCode) {
                return data?.agentCode?.toLowerCase().includes(search?.agentCode?.toLowerCase())
            } else {
                return dataItems?.lineItemsArray
            }
        }), [search, dataItems]
    )
    return (
        <>
            {data !== {} && <ContainerStatements>
                {(loadingSend === true) && <Loading />}
                <Options>
                    <Link href={'/invoice/commission-statement/create'}>
                        <RippleButton widthButton='150px' padding={'15px 5px'} bgColor={PVColor} color={BGColor}>
                            Create
                        </RippleButton>
                    </Link>
                    <RippleButton widthButton='150px' padding={'15px 5px'} bgColor={TBGVColor} color={BGColor}>
                        {/* Send to {data[0]?.statementToDetails?.agentEmail} */}
                    </RippleButton>
                    <RippleButton widthButton='150px' padding={'15px 5px'} bgColor={PVColor} color={BGColor} onClick={() => generatePdfDocumentInvoiceStatement({ dataInvoice: { ...data } })}>
                        Download
                    </RippleButton>
                </Options>
                <WrapInvoice>
                    <Row>
                        <CardInvoice>
                            <Text size='25px' > # {data?.statementFromDetails[0]?.VATRegNo}</Text>
                            <IconUser size='30px' />
                            <Row margin='5px 0'>
                                <Text size='30px' >Statement From Details</Text>
                                <Text size='30px' >{data?.statementFromDetails[0]?.agentTradingName}</Text>
                            </Row>
                            {data?.statementFromDetails[0]?.agentAddress1 !== '' && <Text size='25px' >{data?.statementFromDetails[0]?.agentAddress1}</Text>}
                            {data?.statementFromDetails[0]?.agentAddress2 !== '' && <Text size='25px' >{data?.statementFromDetails[0]?.agentAddress2}</Text>}
                            {data?.statementFromDetails[0]?.agentAddress3 !== '' && <Text size='25px' >{data?.statementFromDetails[0]?.agentAddress3}</Text>}
                            <Row margin='5px 0'>
                                <Text size='19px' >Company Number:</Text>
                                <Text size='19px' > {data?.statementFromDetails[0]?.agentCompanyNumber}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' > Agent City</Text>
                                <Text size='19px' > {data?.statementFromDetails[0]?.agentCity}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Company Contact:</Text>
                                <Text size='19px' >{data?.statementFromDetails[0]?.agentContact}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Country:</Text>
                                <Text size='19px' >Country:  {data?.statementFromDetails[0]?.agentCountry}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Email:</Text>
                                <Text size='19px' >Email:  {data?.statementFromDetails[0]?.agentEmail}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >PostCode: </Text>
                                <Text size='19px' >{data?.statementFromDetails[0]?.agentPostCode}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Trading Name:</Text>
                                <Text size='19px' >Trading Name:  {data?.statementFromDetails[0]?.agentTradingName}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >VAT Registered:</Text>
                                <Text size='19px' >{data?.statementFromDetails[0]?.agentVATRegistered ? 'YES' : 'NO'}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >LegalName:</Text>
                                <Text size='19px' >{data?.statementFromDetails[0]?.legalName}</Text>
                            </Row>
                        </CardInvoice>
                        <CardInvoice>
                            <Text size='25px' > # {data?.statementToDetails[0]?.VATRegNo}</Text>
                            <IconUser size='30px' />
                            <Row margin='5px 0'>
                                <Text size='30px' >Statement To Details</Text>
                                <Text size='30px' >{data?.statementToDetails[0]?.agentTradingName}</Text>
                            </Row>
                            {data?.statementToDetails[0]?.agentAddress1 !== '' && <Text size='25px' >{data?.statementToDetails[0]?.agentAddress1}</Text>}
                            {data?.statementToDetails[0]?.agentAddress2 !== '' && <Text size='25px' >{data?.statementToDetails[0]?.agentAddress2}</Text>}
                            {data?.statementToDetails[0]?.agentAddress3 !== '' && <Text size='25px' >{data?.statementToDetails[0]?.agentAddress3}</Text>}
                            <Row margin='5px 0'>
                                <Text size='19px' >Company Number:</Text>
                                <Text size='19px' > {data?.statementToDetails[0]?.agentCompanyNumber}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' > Agent City</Text>
                                <Text size='19px' > {data?.statementToDetails[0]?.agentCity}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Company Contact:</Text>
                                <Text size='19px' >{data?.statementToDetails[0]?.agentContact}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Country:</Text>
                                <Text size='19px' >Country:  {data?.statementToDetails[0]?.agentCountry}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Email:</Text>
                                <Text size='19px' >Email:  {data?.statementToDetails[0]?.agentEmail}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >PostCode: </Text>
                                <Text size='19px' >{data?.statementToDetails[0]?.agentPostCode}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >Trading Name:</Text>
                                <Text size='19px' >Trading Name:  {data?.statementToDetails[0]?.agentTradingName}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >VAT Registered:</Text>
                                <Text size='19px' >{data?.statementToDetails[0]?.agentVATRegistered ? 'YES' : 'NO'}</Text>
                            </Row>
                            <Row margin='5px 0'>
                                <Text size='19px' >LegalName:</Text>
                                <Text size='19px' >{data?.statementToDetails[0]?.legalName}</Text>
                            </Row>

                        </CardInvoice>
                    </Row>
                    <Table
                        titles={[
                            { name: 'Event Commences', key: 'eventCommences', justify: 'flex-start', width: '7%' },
                            { name: 'Events Name', key: 'eventName', justify: 'flex-start', width: '7%' },
                            { name: 'Events Ref', key: 'eventRef', justify: 'flex-start', width: '7%' },
                            { name: 'Events Type', key: 'eventType', justify: 'flex-start', width: '7%' },
                            { name: 'eventsMonth', key: 'eventsMonth', justify: 'flex-start', width: '7%' },
                            { name: 'has Invoice Been Opened By Recipient', key: 'hasInvoiceBeenOpenedByRecipient', justify: 'flex-start', width: '7%' },
                            { name: 'has Invoice Been Sent', key: 'hasInvoiceBeenSent', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice Date', key: 'invoiceDate', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice From', key: 'invoiceFrom', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice To', key: 'invoiceTo', justify: 'flex-start', width: '7%' },
                            { name: 'InvoiceTotal', key: 'invoiceTotal', justify: 'flex-start', width: '7%' },
                            { name: 'Is On Statement', key: 'isOnStatement', justify: 'flex-start', width: '7%' },
                            { name: 'Action', key: 'Action', justify: 'flex-start', width: '2fr' },
                        ]}
                        bgRow={2}
                        pointer
                        data={data?.invoicesIncOnStatement}
                        renderBody={(dataB, titles) => dataB?.map((x, i) => <Section bgRow={2} columnWidth={titles} key={i}>
                            <Content>
                                <Text> {x.eventCommences && (x.eventCommences)}</Text>
                            </Content>
                            <Content>
                                <Text> {x.eventName}</Text>
                            </Content>
                            <Content>
                                <Text> {x.eventRef}</Text>
                            </Content>
                            <Content>
                                <Text> {x.eventType}</Text>
                            </Content>
                            <Content>
                                <Text> {x.eventsMonth}</Text>
                            </Content>
                            <Content>
                                <Text> {x.hasInvoiceBeenOpenedByRecipient === true ? 'Yes' : 'No'}</Text>
                            </Content>
                            <Content>
                                <Text> {x.hasInvoiceBeenSent === true ? 'Yes' : 'No'}</Text>
                            </Content>
                            <Content>
                                <Text> {x.invoiceDate}</Text>
                            </Content>
                            <Content>
                                <Text> {x.invoiceFrom}</Text>
                            </Content>
                            <Content>
                                <Text> {x.invoiceTo}</Text>
                            </Content>
                            <Content>
                                <Text> {currencyFormatter.format(x.invoiceTotal, { code: x?.currency ? x?.currency : 'USD' })} </Text>
                            </Content>
                            <Content>
                                <Text> {x.isOnStatement === true ? 'Yes' : 'No'}</Text>
                            </Content>
                            <Content>
                                <ContentTableItem padding='0px' direction='row'>
                                    <TableButton backgroundColor={TBGAColor} color={SCColor} onClick={() => handleOpenLineItems(x)}>
                                        View tickets
                                    </TableButton>
                                    <ActiveLink activeClassName="active" href={`/invoice/${x._id}`}>
                                        <TableButton backgroundColor={TBGBColor} color={PVColor}>
                                            View
                                        </TableButton>
                                    </ActiveLink>
                                    <Link href={'/invoice/commission-statement/create'}>
                                        <TableButton backgroundColor={TBGVColor} color={TFBColor}>
                                            Add
                                        </TableButton>
                                    </Link>
                                </ContentTableItem>
                            </Content>
                        </Section>)}
                    />
                    {/* info ammount */}
                    <Options direction='column' style={{ alignItems: 'end' }}>
                        <Row padding='10px' width='30%' borderBottom='1px solid #ccc' margin='15px 0'>
                            <Text padding='10px 0' size='20px' >Total Amount To Pay</Text>
                            <Text padding='10px 0' size='20px' >{data?.totalAmountToPay}</Text>
                        </Row>
                        <Row padding='10px' width='30%' borderBottom='1px solid #ccc' margin='15px 0'>
                            <Text padding='10px 0' size='20px' >Total Commission Payable To You</Text>
                            <Text padding='10px 0' size='20px' >{data?.totalCommissionPayableToYou}</Text>
                        </Row>
                        <Row padding='10px' width='30%' borderBottom='1px solid #ccc' margin='15px 0'>
                            <Text padding='10px 0' size='20px' color={EColor} >Total Discounts</Text>
                            <Text padding='10px 0' size='20px' color={EColor} >{data?.totalDiscounts}</Text>
                        </Row>
                        <Row padding='10px' width='30%' borderBottom='1px solid #ccc' margin='15px 0'>
                            <Text padding='10px 0' size='20px' >Total Gross Sales Received By You</Text>
                            <Text padding='10px 0' size='20px' >{data?.totalGrossSalesReceivedByYou}</Text>
                        </Row>
                    </Options>
                    <FooterInfo>
                        <Text justify='end' size='30px' >TOTAL AMOUNT TO PAY:  {data?.totalAmountToPay}</Text>
                        <RippleButton widthButton='300px' padding={'15px 5px'} bgColor={PVColor} color={BGColor} onClick={() => setModalConfirm(!modal)}>
                            Send to {data?.statementToEmail}
                        </RippleButton>
                    </FooterInfo>
                </WrapInvoice>

                <AwesomeModal
                    show={modal}
                    backdrop
                    onHide={() => setModalConfirm(false)}
                    onCancel={() => false}
                    btnCancel={false}
                    btnConfirm={false}
                    header={true}
                    size="small"
                    height='300px'
                    width='50%'
                    padding='2%'
                    footer={false} >
                    <Text size='25px'>You want to send this commission announcement to HERE   {data?.statementToEmail} </Text>
                    <Options style={{ borderBottom: 'none', justifyContent: 'space-between' }}>
                        <RippleButton widthButton='45%' padding={'15px 5px'} bgColor={'#ea1d2c'} color={BGColor} onClick={() => handleConfirmIsOnStatements()}>
                            Yes
                        </RippleButton>
                        <RippleButton widthButton='45%' padding={'15px 5px'} bgColor={'#a6a29f'} color={BGColor} onClick={() => setModalConfirm(false)}>
                            No
                        </RippleButton>
                    </Options>
                </AwesomeModal>
                <AwesomeModal
                    show={lineItemsModal}
                    backdrop
                    onHide={() => setLineItemsModal(false)}
                    btnCancel={false}
                    btnConfirm={false}
                    header={true}
                    size="large"
                    // title='Invoice Stements From'
                    height='100vh'
                    width='100%'
                    footer={false} >
                    <Text size='25px'> List Tickets</Text>
                    <Input width='100%' placeholder='Filter characteristic.' value={search.agentCode} onChange={(e) => setSearch({ ...search, agentCode: e.target.value })} name='agentCode' />
                    <SectionRow bgRow={2} columnWidth={['4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%']}>
                        <Content padding={'0'} >
                            <Text> AgentCode</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Balance Due</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Booked On</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Booking Ref</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Booking Status</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text>Client</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> clientOwnerAtPurchaseDate</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Commission Rate Percent</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Commission payable</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Discount Rate</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text>Discount Total</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Discounted Total Due</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Event Commences</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Event Name</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text>event Owner</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Event Ref</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Event Type</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Ticket Option</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Ticket price</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Ticket Quantity</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Total Due</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Total Due Calc</Text>
                        </Content>
                        <Content padding={'0'} >
                            <Text> Total Paid</Text>
                        </Content>
                    </SectionRow>
                    {dataItems?.lineItemsArray && filterLineItems?.map(x => x.newArray?.map((z, i) => (
                        <div key={z._id}>
                            <SectionRow bgRow={2} columnWidth={['4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%']} key={i}>
                                <Content padding={'0'} >
                                    <Text> {z.agentCode}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.balancedue}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.bookedOn}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.bookingRef}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.bookingStatus}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.client}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.clientOwnerAtPurchaseDate}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.commissionRatePercent}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.commissionpayable}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.discountRate}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.discountTotal}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.discountedTotalDue}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.eventCommences}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.eventName}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.eventOwner}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.eventRef}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.eventType}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.ticketoption}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.ticketprice}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.ticketquantity}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.totaldue}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.totaldueCalc}</Text>
                                </Content>
                                <Content padding={'0'} >
                                    <Text> {z.totalpaid}</Text>
                                </Content>
                            </SectionRow>
                        </div>
                    )))}



                </AwesomeModal>
            </ContainerStatements>}
        </>
    )
}
