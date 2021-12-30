import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useContext, useEffect, useState, useRef } from 'react';
import { GET_ONE_INVOICE, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
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
    const { data, loading } = useQuery(GET_ONE_INVOICE, { variables: { idInvoice: idInvoice }, fetchPolicy: 'cache-and-network' })
    const { setAlertBox } = useContext(Context)
    const [dataUser] = useUser()
    const signPadRef = useRef()

    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (data) {
            setOpenModal(true)
        }
    }, [data])

    const [isRedoStateInvoice] = useMutation(IS_REDO_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isRedoStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getOneCommissionInvoice } }) => updateCache({
            cache,
            query: GET_ONE_INVOICE,
            nameFun: 'getOneCommissionInvoice',
            dataNew: getOneCommissionInvoice,
            type: 2

        })
    })

    const [hasBeenReceived] = useMutation(HAS_BEEN_RECEIVED, {
        onCompleted: (data) => setAlertBox({ message: `${data?.hasBeenReceived?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getOneCommissionInvoice } }) => updateCache({
            cache,
            query: GET_ONE_INVOICE,
            nameFun: 'getOneCommissionInvoice',
            dataNew: getOneCommissionInvoice,
            type: 2

        })
    })

    const [isPaidStateInvoice] = useMutation(IS_PAY_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getOneCommissionInvoice } }) => updateCache({
            cache,
            query: GET_ONE_INVOICE,
            nameFun: 'getOneCommissionInvoice',
            dataNew: getOneCommissionInvoice,
            type: 2

        })
    })
    const handlePayState = async () => {
        const { agentDetails } = data || {}
        const { agentEmail } = agentDetails || {}
        isPaidStateInvoice({ variables: { idInvoice: data?.getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleRedoState = async () => {
        const { agentDetails } = data || {}
        const { agentEmail } = agentDetails || {}
        isRedoStateInvoice({ variables: { idInvoice: data?.getOneCommissionInvoice?._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const Switch = useSetState(0);
    const Switch2 = useSetState(0);

    const handleChangeReceived = async () => {
        setOpenModal(!openModal)
        await hasBeenReceived({
            variables: {
                idInvoice: idInvoice,
                uEmail: data && data?.getOneCommissionInvoice?.agentDetails?.agentEmail,
                ToEmail: dataUser && dataUser?.uEmail
            }
        })
    }

    if (loading) return <Loading />

    // Address Agent ----
    const dir1 = data?.getOneCommissionInvoice.agentDetails.agentAddress1;
    const dir2 = data?.getOneCommissionInvoice.agentDetails.agentAddress2;
    const dir3 = data?.getOneCommissionInvoice.agentDetails.agentAddress3;

    let agentAddress = '';
    if (dir1?.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length === 0) {
        agentAddress = dir1;
    } else if (dir1?.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length === 0) {
        agentAddress = dir2;
    } else if (dir1?.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length > 0) {
        agentAddress = dir3;
    } else if (dir1?.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length === 0) {
        agentAddress = `Unregistered Addresses`
    } else if (dir1?.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length > 0) {
        agentAddress = `${dir1} - ${dir2} - ${dir3}`
    } else if (dir1?.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length === 0) {
        agentAddress = `${dir1} - ${dir2}`
    } else if (dir1?.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length > 0) {
        agentAddress = `${dir1} - ${dir3}`
    } else if (dir1?.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length > 0) {
        agentAddress = `${dir2} - ${dir3}`
    } // ----
    // Map items arrays ------
    let newArrays = [];
    data && data?.getOneCommissionInvoice?.lineItemsArray?.map(items => (
        newArrays.push(items.newArray)
    ))// -------
    return (
        <Content>
            <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => handleChangeReceived()}>
                View Invoice
            </RippleButton>
            <AwesomeModal show={data && openModal} useScroll={true} height='100vh' zIndex='0' title={`Invoice ${data ? data?.getOneCommissionInvoice?.eventName : null}`} onHide={() => setOpenModal(!openModal)} backdrop='static' onCancel={() => true} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperPdf>
                    <DocumentFormatA4>
                        <ContPdf>
                            <Card width='100%'>
                                <img style={{}} src='https://www.spiceuk.com/Images/Spice-Logo.jpg' ></img>
                            </Card>
                            <Card margin='0' width='100%'>
                                <Card width='40%' margin='20px 0' background='#cb1d6c' radius='0'>
                                    <Title align='center' color={BGColor} size='16px'> INVOICE </Title>
                                </Card>
                            </Card>
                            <Card height='min-content' justifyContent='space-between' margin='5px 0 5px 0' width='100%'>
                                <Card width='50%'>
                                    <Text width='100%' size='15px' bold='bold' align='left'>To:</Text>
                                    <Text width='100%' size='20px' bold='bold' align='left'>{data?.getOneCommissionInvoice.invoiceTo}</Text>
                                    <Text width='100%' size='15px' bold='bold' align='left'>{data?.getOneCommissionInvoice.agentDetails.legalName}</Text>
                                </Card>
                                <Card display='block' padding='10px 5px' width='35%' background='#cb1d6c' radius='0'>
                                    <Text margin='0' color={BGColor}> Invoice No. </Text>
                                    <Text size='11px' margin='0' color={BGColor}> # {data?.getOneCommissionInvoice.invoiceRef} </Text>
                                </Card>
                            </Card>
                            <Card justifyContent='space-between' margin='0 0 10px 0' width='100%'>
                                <Card width='50%'>
                                    <Text color='#000' width='100%' size='12px' align='left'>{agentAddress} / {data?.getOneCommissionInvoice.agentDetails.agentPostCode}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>W {data?.getOneCommissionInvoice.agentDetails.agentEmail}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>P {data?.getOneCommissionInvoice.agentDetails.agentCompanyNumber}</Text>
                                </Card>
                                <Card padding='10px 5px' width='35%' radius='0'>
                                    <Text margin='0' color='#000'> Invoice Date : {dateFormat(data?.getOneCommissionInvoice.invoiceDate)}</Text>
                                    <Text margin='0' color='#000'> Event Commences Date : {dateFormat(data?.getOneCommissionInvoice.eventCommences)}</Text>
                                    <Text margin='0' color='#000'> Account No : {data?.getOneCommissionInvoice.eventRef}</Text>
                                </Card>
                            </Card>
                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card justifyContent='center' padding='10px' width='100%' background='#cb1d6c' radius='0'>
                                    <Text color={BGColor} size='15px'> {data?.getOneCommissionInvoice.eventName} </Text>
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
                                {data?.getOneCommissionInvoice?.lineItemsArray?.map((el, i) => (
                                    <RowDinamic margin='5px 0 0px 0' padding='20px 0' width='100%' borderButtom='1px solid #000' columnWidth={['10.5%', '10.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%', '8.5%']} key={el.id}>
                                        <Row> <Text bold='100' size='10px'>{i + 1}</Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.subtotalTicketsSold, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })}  </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{el.ticketType}</Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineSalesReceived, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineSubtotal, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineCommSubtotal, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.lineItemVATOnComm, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.ticketCategoryTotalDue, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.totalTicketTypeDiscount, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.subtotalTicketTypeLessDiscount, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                        <Row> <Text bold='100' size='10px'>{currencyFormatter.format(el.ticketPrice, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text> </Row>
                                    </RowDinamic>
                                ))}
                            </Card>
                            <Card height='min-content' justifyContent='space-between' margin='5px 0 5px 0' width='100%'>
                                <Card width='50%' margin='5px 0' radius='0' height='fit-content'>
                                    <Text color={BColor} width='100%' size='20px' margin='20px 0' bold='bold' align='left'>Total Due</Text>
                                    <Text color={BColor} width='100%' size='15px' margin='20px 0' bold='bold' align='left'> {currencyFormatter.format(data?.getOneCommissionInvoice.totalCommDue, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                                </Card>

                                <Card height='min-content' direction='column' justifyContent='space-between' margin='5px 0 5px 0' width='50%' radius='0'>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' justifyContent='space-between' width='100%' margin='5px 0' radius='0'>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'>Total Sales Received</Text>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'> {currencyFormatter.format(data?.getOneCommissionInvoice.totalSalesReceived, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                                    </Card>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' width='100%' justifyContent='space-between' margin='5px 0' radius='0'>
                                        <Text justify='center' color={EColor} width='100%' size='13px' align='left'>Total Discounts</Text>
                                        <Text justify='center' color={EColor} width='100%' size='13px' align='left'> {currencyFormatter.format(data?.getOneCommissionInvoice.totalDiscounts, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text>
                                    </Card>
                                    <Card borderBottom='1px solid' wrap='nowrap' padding='0 0 10px' width='100%' justifyContent='space-between' margin='5px 0' radius='0'>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'>Total Vat On Comms</Text>
                                        <Text justify='center' color={BColor} width='100%' size='13px' align='left'> {currencyFormatter.format(data?.getOneCommissionInvoice.vatOnComms, { code: data?.getOneCommissionInvoice.currency ? data?.getOneCommissionInvoice.currency : 'USD' })} </Text>
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
                                Descargar
                            </RippleButton>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handlePayState()}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                {data?.getOneCommissionInvoice.isPaid ? 'Paid' : 'No pay'}
                            </RippleButton>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleRedoState()}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                {data?.getOneCommissionInvoice.isRedo ? 'isRedo' : 'No Redo'}
                            </RippleButton>
                        </ContentToggle>
                    </WrapperControls>

                </WrapperPdf>

            </AwesomeModal>
        </Content>
    )
}


