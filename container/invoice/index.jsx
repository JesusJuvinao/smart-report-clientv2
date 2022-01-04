import { useContext, useEffect, useState, useRef } from 'react';
import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { GET_ONE_INVOICE, IS_APPROVED_INVOICE_SENDER, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
import ReactSignatureCanvas from 'react-signature-canvas'
import { DocumentPdf } from '../dashboard/Document';
import currencyFormatter from 'currency-formatter'
import { dateFormat, updateCache } from '../../utils';
import { HAS_BEEN_RECEIVED } from '../dashboard/queries';
import { Context } from '../../context';
import { BColor, BGColor, EColor, SFColor } from '../../public/colors';
import { RippleButton } from '../../components/Ripple';
import { useSetState } from '../../components/hooks/useState';
import { useUser } from '../Profile';
import { generatePdfDocumentInvoice } from './PdfInvoice';
import { Button, DocumentFormatA4, WrapperControls, WrapperPdf, Card, Card2, Content, ContentToggle, ButtonTheme, SwitchButton, Text, Title, Row, RowGrid, ContentInvoice, Container, ContPdf, Tabla, TablaFila, RowDinamic } from './styled';
import { PaymentStatus } from '../dashboard/styled';
import moment from 'moment';

export const Invoice = ({ idInvoice }) => {
    const { loading, data: oneInvoiceArray } = useQuery(GET_ONE_INVOICE, { variables: { idInvoice: idInvoice }, fetchPolicy: 'cache-and-network' })
    const { setAlertBox } = useContext(Context)
    const [dataUser] = useUser()
    const signPadRef = useRef()

    console.log(oneInvoiceArray,'uyasuasyu')

    const [agentDetails, setAgentDetails] = useState({})

    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (oneInvoiceArray) {
            setOpenModal(true)
            setAgentDetails(oneInvoiceArray);
        }
    }, [oneInvoiceArray])

    // const [isRedoStateInvoice] = useMutation(IS_REDO_INVOICE, {
    //     onCompleted: (getOneCommissionInvoice) => setAlertBox({ message: `${getOneCommissionInvoice?.isRedoStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
    //     update: (cache, { getOneCommissionInvoice }) => updateCache({
    //         cache,
    //         query: GET_ONE_INVOICE,
    //         nameFun: 'getOneCommissionInvoice',
    //         dataNew: getOneCommissionInvoice,
    //         type: 2

    //     })
    // })

    // const [hasBeenReceived] = useMutation(HAS_BEEN_RECEIVED, {
    //     onCompleted: (getOneCommissionInvoice) => setAlertBox({ message: `${getOneCommissionInvoice?.hasBeenReceived?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
    //     update: (cache, { getOneCommissionInvoice }) => updateCache({
    //         cache,
    //         query: GET_ONE_INVOICE,
    //         nameFun: 'getOneCommissionInvoice',
    //         dataNew: getOneCommissionInvoice,
    //         type: 2

    //     })
    // })

    // const [isPaidStateInvoice] = useMutation(IS_PAY_INVOICE, {
    //     onCompleted: (getOneCommissionInvoice) => setAlertBox({ message: `${getOneCommissionInvoice?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
    //     update: (cache, { getOneCommissionInvoice }) => updateCache({
    //         cache,
    //         query: GET_ONE_INVOICE,
    //         nameFun: 'getOneCommissionInvoice',
    //         dataNew: getOneCommissionInvoice,
    //         type: 2

    //     })
    // })
    // const [isApprovedByInvoiceSenderMutation, { loading: loadingApprove, data: datapOPIPO }] = useMutation(IS_APPROVED_INVOICE_SENDER, {
    //     onCompleted: (getOneCommissionInvoice) => setAlertBox({ message: `hi`, duration: 8000, color: getOneCommissionInvoice.success ? 'success' : 'error' }),
    //     update: (cache, { getOneCommissionInvoice }) => updateCache({
    //         cache,
    //         query: GET_ONE_INVOICE,
    //         nameFun: 'getOneCommissionInvoice',
    //         dataNew: getOneCommissionInvoice,
    //         type: 2

    //     })
    // })
    // const handlePayState = async () => {
    //     const { agentDetails } = getOneCommissionInvoice || {}
    //     const { agentEmail } = agentDetails || {}
    //     isPaidStateInvoice({ variables: { idInvoice: getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    // }
    // const handleRedoState = async () => {
    //     const { agentDetails } = getOneCommissionInvoice || {}
    //     const { agentEmail } = agentDetails || {}
    //     isRedoStateInvoice({ variables: { idInvoice: getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    // }
    // const Switch = useSetState(0);
    // const Switch2 = useSetState(0);

    // const handleChangeReceived = async () => {
    //     setOpenModal(!openModal)
    //     // await hasBeenReceived({
    //     //     variables: {
    //     //         idInvoice: idInvoice,
    //     //         uEmail: data && data?.getOneCommissionInvoice?.agentDetails?.agentEmail,
    //     //         ToEmail: dataUser && dataUser?.uEmail
    //     //     }
    //     // })
    // }


   // console.log(getOneCommissionInvoice[agentDetails], 'datainvoice');
    // Address Agent ----
    // const dir1 = getOneCommissionInvoice?.AgentDetails.agentAddress1;
    // const dir2 = getOneCommissionInvoice?.AgentDetails.agentAddress2;
    // const dir3 = getOneCommissionInvoice?.AgentDetails.agentAddress3;

    // let agentAddress = '';
    // if (dir1?.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length === 0) {
    //     agentAddress = dir1;
    // } else if (dir1?.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length === 0) {
    //     agentAddress = dir2;
    // } else if (dir1?.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length > 0) {
    //     agentAddress = dir3;
    // } else if (dir1?.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length === 0) {
    //     agentAddress = `Unregistered Addresses`
    // } else if (dir1?.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length > 0) {
    //     agentAddress = `${dir1} - ${dir2} - ${dir3}`
    // } else if (dir1?.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length === 0) {
    //     agentAddress = `${dir1} - ${dir2}`
    // } else if (dir1?.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length > 0) {
    //     agentAddress = `${dir1} - ${dir3}`
    // } else if (dir1?.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length > 0) {
    //     agentAddress = `${dir2} - ${dir3}`
    // } // ----
    // // Map items arrays ------
    // let newArrays = [];
    // getOneCommissionInvoice && getOneCommissionInvoice?.lineItemsArray?.map(items => (
    //     newArrays.push(items.newArray)
    // ))// -------

    const handleApprovedInvoiceState = async () => {
        const agentEmail = getOneCommissionInvoice && getOneCommissionInvoice?.agentDetails?.agentEmail
        if (getOneCommissionInvoice.isApprovedByInvoiceSender === false) {
            await isApprovedByInvoiceSenderMutation({ variables: { idInvoice: getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        } else {
            await isApprovedByInvoiceSenderMutation({ variables: { idInvoice: getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
            await isPaidStateInvoice({ variables: { idInvoice: getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        }
    }


    if (loading) return <Loading />
    return (
        <Content>
            <h1>agdaos</h1>
            {/* <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => handleChangeReceived()}>View Invoice</RippleButton>
            <AwesomeModal show={getOneCommissionInvoice && openModal} useScroll={true} height='100vh' zIndex='0' title={`Invoice ${getOneCommissionInvoice ? getOneCommissionInvoice?.eventName : null}`} onHide={() => setOpenModal(!openModal)} backdrop='static' onCancel={() => true} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperPdf>
                    <DocumentFormatA4>
                        <ContPdf>
                            <Card width='100%'>
                                <img src='https://www.spiceuk.com/Images/Spice-Logo.jpg' ></img>
                            </Card>
                            <Card margin='0' width='100%'>
                                <Card width='40%' margin='20px 0' background='#cb1d6c' radius='0'>
                                    <Title align='center' color={BGColor} size='16px'> INVOICE  {getOneCommissionInvoice?.isPaid ? 'PAID' : 'NO PAID'}  </Title>
                                </Card>
                            </Card>

                            <Card height='min-content' justifyContent='space-between' margin='5px 0 5px 0' width='100%'>
                                <Card width='50%'>
                                    <Text width='100%' size='15px' bold='bold' align='left'>To:</Text>
                                    <Text width='100%' size='20px' bold='bold' align='left'>{getOneCommissionInvoice?.invoiceTo}</Text>
                                    <Text width='100%' size='15px' bold='bold' align='left'>{getOneCommissionInvoice?.agentDetails.legalName}</Text>
                                </Card>
                                <Card display='block' padding='10px 5px' width='35%' background='#cb1d6c' radius='0'>
                                    <Text margin='0' color={BGColor}> Invoice No. </Text>
                                    <Text size='11px' margin='0' color={BGColor}> # {getOneCommissionInvoice?.invoiceRef} </Text>
                                </Card>
                            </Card>
                            <Card justifyContent='space-between' margin='0 0 10px 0' width='100%'>
                                <Card width='50%'>
                                    <Text color='#000' width='100%' size='12px' align='left'>{agentAddress} / {getOneCommissionInvoice?.agentDetails.agentPostCode}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>W {getOneCommissionInvoice?.agentDetails.agentEmail}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>P {getOneCommissionInvoice?.agentDetails.agentCompanyNumber}</Text>
                                </Card>
                                <Card padding='10px 5px' width='35%' radius='0'>
                                    <Text margin='0' color='#000'> Invoice Date : {dateFormat(getOneCommissionInvoice?.invoiceDate)}</Text>
                                    <Text margin='0' color='#000'> Event Commences Date : {dateFormat(getOneCommissionInvoice?.eventCommences)}</Text>
                                    <Text margin='0' color='#000'> Account No : {getOneCommissionInvoice?.eventRef}</Text>
                                </Card>
                            </Card>
                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card justifyContent='center' padding='10px' width='100%' background='#cb1d6c' radius='0'>
                                    <Text color={BGColor} size='15px'> {getOneCommissionInvoice?.eventName} </Text>
                                </Card>
                            </Card>
                            <Card margin='5px 0 0px 0' width='100%'>
                                <RowDinamic background='#cb1d6c' columnWidth={['8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%']}>
                                    <Row><Text bold='100' color={BGColor} size='10px'>No. </Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Subtotal Tickets Sold </Text> </Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Ticket Type </Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Sales Received </Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Subtotal</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Comm Subtotal</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>VAT On Comm</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Ticket Cat TotalDue</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Ticket Type Discount</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Subtotal Ticket TypeLess Discount</Text></Row>
                                    <Row><Text bold='100' color={BGColor} size='10px'>Ticket Price</Text></Row>
                                </RowDinamic>
                                {getOneCommissionInvoice?.lineItemsArray?.map((el, i) => (
                                    <RowDinamic margin='5px 0 0px 0' padding='20px 0' width='100%' borderButtom='1px solid #000' columnWidth={['10.5%', '10.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%']} key={el.id}>
                                        <Row> <Text bold='100' size='10px'>{i + 1}</Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.subtotalTicketsSold, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })}  </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{el.ticketType}</Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineSalesReceived, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineSubtotal, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineCommSubtotal, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineItemVATOnComm, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.ticketCategoryTotalDue, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.totalTicketTypeDiscount, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.subtotalTicketTypeLessDiscount, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.ticketPrice, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text> </Row>
                                    </RowDinamic>
                                ))}
                            </Card>
                            <Card height='min-content' justifyContent='space-between' margin='5px 0 5px 0' width='100%'>
                                <Card width='50%' margin='5px 0' radius='0' height='fit-content'>
                                    <Text color={BColor} width='100%' size='20px' margin='20px 0' bold='bold' align='left'>Total Due</Text>
                                    <Text color={BColor} width='100%' size='15px' margin='20px 0' bold='bold' align='left'> {currencyFormatter.format(getOneCommissionInvoice?.totalCommDue, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text>
                                </Card>

                                <Card height='min-content' direction='column' justifyContent='space-between' margin='5px 0 5px 0' width='50%' radius='0'>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' justifyContent='space-between' width='100%' margin='5px 0' radius='0'>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'>Total Sales Received</Text>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'> {currencyFormatter.format(getOneCommissionInvoice?.totalSalesReceived, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text>
                                    </Card>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' width='100%' justifyContent='space-between' margin='5px 0' radius='0'>
                                        <Text justify='center' color={EColor} width='100%' size='13px' align='left'>Total Discounts</Text>
                                        <Text justify='center' color={EColor} width='100%' size='13px' align='left'> {currencyFormatter.format(getOneCommissionInvoice?.totalDiscounts, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text>
                                    </Card>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' width='100%' justifyContent='space-between' margin='5px 0' radius='0'>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'>Total Vat On Comms</Text>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'> {currencyFormatter.format(getOneCommissionInvoice?.vatOnComms, { code: getOneCommissionInvoice?.currency ? getOneCommissionInvoice?.currency : 'USD' })} </Text>
                                    </Card>
                                    <ReactSignatureCanvas
                                        penColor={SFColor}
                                        canvasProps={{ width: 340, height: 200 }}
                                        ref={signPadRef}
                                    />
                                </Card>
                            </Card>
                        </ContPdf>
                    </DocumentFormatA4>
                    <WrapperControls>
                        <ContentToggle>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { ...data } })}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                Download
                            </RippleButton>
                            {getOneCommissionInvoice?.isApprovedByInvoiceSender === true && <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handlePayState()}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                {getOneCommissionInvoice?.isPaid ? 'Paid' : 'No pay'}
                            </RippleButton>}
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleRedoState()}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                {getOneCommissionInvoice?.isRedo ? 'isRedo' : 'No Redo'}
                            </RippleButton>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleApprovedInvoiceState()}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                {!getOneCommissionInvoice?.isApprovedByInvoiceSender ? 'Mark approved' : 'Mark as not Approved'}
                            </RippleButton>
                        </ContentToggle>
                    </WrapperControls>

                </WrapperPdf>

            </AwesomeModal> */}
        </Content>
    )
}


