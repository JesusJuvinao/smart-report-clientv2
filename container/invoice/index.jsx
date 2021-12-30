import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react';
import { GET_ONE_INVOICE, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';
import { dateFormat, updateCache } from '../../utils';
import { GET_ALL_INVOICES_SENT, HAS_BEEN_RECEIVED } from '../dashboard/queries';
import { Context } from '../../context';
import { BColor, BGColor } from '../../public/colors';
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
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (data) {
            setOpenModal(true)
        }
    }, [data])

    const [isRedoStateInvoice] = useMutation(IS_REDO_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isRedoStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })

    const [hasBeenReceived] = useMutation(HAS_BEEN_RECEIVED, {
        onCompleted: (data) => setAlertBox({ message: `${data?.hasBeenReceived?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })
    
    const [isPaidStateInvoice] = useMutation(IS_PAY_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })

    const handlePayState = async ({ id }) => {
        isPaidStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }

    const handleRedoState = async ({ id }) => {
        isRedoStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
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

    if( dir1.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length === 0){
        agentAddress = dir1;
    }else if( dir1.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length === 0){
        agentAddress = dir2;
    }else if( dir1.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length > 0){
        agentAddress = dir3;
    }else if( dir1.trim().length === 0 && dir2.trim().length === 0 && dir3.trim().length === 0 ){
        agentAddress = `Unregistered Addresses`
    }else if( dir1.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length > 0 ){
        agentAddress = `${dir1} - ${dir2} - ${dir3}`
    }else if( dir1.trim().length > 0 && dir2.trim().length > 0 && dir3.trim().length === 0 ){
        agentAddress = `${dir1} - ${dir2}`
    }else if( dir1.trim().length > 0 && dir2.trim().length === 0 && dir3.trim().length > 0 ){
        agentAddress = `${dir1} - ${dir3}`
    }else if( dir1.trim().length === 0 && dir2.trim().length > 0 && dir3.trim().length > 0 ){
        agentAddress = `${dir2} - ${dir3}`
    } // ----
    
    // Map items arrays ------
    let newArrays =[];
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
                                <img src='https://www.spiceuk.com/Images/Spice-Logo.jpg' ></img>
                            </Card>
                            <Card margin='0 0 0 0' width='100%'>
                                <Card width='30%' margin='20px 0' background='#cb1d6c' radius='0'>
                                    <Title align='center' color='#fff' size='20px'> INVOICE </Title>
                                </Card>
                            </Card>

                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card width='50%'>
                                    <Text width='100%' size='15px' bold='bold' align='left'>To:</Text>
                                    <Text width='100%' size='20px' bold='bold' align='left'>{data?.getOneCommissionInvoice.invoiceTo}</Text>
                                    <Text width='100%' size='15px' bold='bold' align='left'>{data?.getOneCommissionInvoice.agentDetails.legalName}</Text>
                                </Card>
                                <Card width='25%' radius='0'></Card>

                                <Card padding='10px 5px' width='25%' background='#cb1d6c' radius='0'>
                                    <Text margin='0 0 0 0' color='#fff'> Invoice No. </Text>
                                    <Text margin='0 0 0 0' color='#fff'> {data?.getOneCommissionInvoice.invoiceRef} </Text>
                                </Card>
                            </Card>


                            <Card margin='0 0 10px 0' width='100%'>
                                <Card width='50%'>
                                    <Text color='#000' width='100%' size='12px' align='left'>{agentAddress} / {data?.getOneCommissionInvoice.agentDetails.agentPostCode}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>W {data?.getOneCommissionInvoice.agentDetails.agentEmail}</Text>
                                    <Text color='#000' width='100%' size='12px' align='left'>P {data?.getOneCommissionInvoice.agentDetails.agentCompanyNumber}</Text>
                                </Card>
                                <Card width='25%' radius='0'></Card>

                                <Card padding='10px 5px' width='25%' radius='0'>
                                    <Text margin='0 0 0 0' color='#000'> Invoice Date : {dateFormat(data?.getOneCommissionInvoice.invoiceDate)}</Text>
                                    <Text margin='0 0 0 0' color='#000'> Issue Date : {dateFormat(data?.getOneCommissionInvoice.invoiceDate)}</Text>
                                    <Text margin='0 0 0 0' color='#000'> Account No : {data?.getOneCommissionInvoice.eventRef}</Text>
                                </Card>
                            </Card>
                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card padding='10px 5px' width='100%' background='#cb1d6c' radius='0'>
                                    <Title align='center' color='#fff' size='15px'> {data?.getOneCommissionInvoice.eventName} </Title>
                                </Card>
                            </Card>
                            <Card margin='5px 0 0px 0' width='100%'>
                                <RowDinamic background='#cb1d6c' columnWidth={['20%', '20%', '20%', '20%', '20%']}>
                                    <Row><Text color='#fff' size='12px'>No. </Text></Row>
                                    <Row><Text color='#fff' size='12px'>Ticket Type </Text> </Row>
                                    <Row><Text color='#fff' size='12px'>Unite Price </Text></Row>
                                    <Row><Text color='#fff' size='12px'>Qty </Text></Row>
                                    <Row><Text color='#fff' size='12px'>Total</Text></Row>
                                </RowDinamic>
                                {newArrays[0].map(el => (
                                    <RowDinamic columnWidth={['20%', '20%', '20%', '20%', '20%']} key={el.id}>
                                        <Row border='1'> <Text size='11px'>{el.eventRef}</Text> </Row>
                                        <Row border='1'> <Text size='11px'>{el.ticketoption}</Text> </Row>
                                        <Row border='1'> <Text size='11px'>{el.ticketprice}</Text> </Row>
                                        <Row border='1'> <Text size='11px'>{el.ticketquantity}</Text> </Row>
                                        <Row border='1'> <Text size='11px'>{el.totalpaid}</Text> </Row>
                                    </RowDinamic>
                                ))}
                            </Card>

                            <Card margin='0 0 5px 0' width='100%'>
                                <Card width='25%'> </Card>
                                <Card width='25%'> </Card>

                                <Card padding='10px 5px' width='50%' radius='0'>
                                    <Text width='30%' margin='0 0 0 0' color='#000'> Sub-Total </Text>
                                    <Text width='70%' margin='0 0 0 0' color='#000'> {data?.getOneCommissionInvoice?.lineItemsArray[0].lineSubtotal} </Text>
                                </Card>
                            </Card>
                            <Card margin='0 0 5px 0' width='100%'>
                                <Card padding='10px 5px' background='#cb1d6c' width='25%'> 
                                    <Text width='50%' color='#fff' size='15px'> Total Due </Text>
                                    <Text width='50%' color='#fff' size='15px'> {data?.getOneCommissionInvoice.totalSalesReceived} </Text>
                                </Card>
                                <Card width='25%'> </Card>

                                <Card padding='10px 5px' width='50%' radius='0'>
                                    <Text width='30%' margin='0 0 0 0' color='#000'> Tax: Vat(% {data?.getOneCommissionInvoice.vatOnComms}) </Text>
                                    <Text width='70%'margin='0 0 0 0' color='#000'> {data?.getOneCommissionInvoice.lineItemsArray[0].lineItemVATOnComm} </Text>
                                </Card>
                            </Card>
                            <Card margin='0 0 5px 0' width='100%'>
                                <Card width='25%'> </Card>
                                <Card width='25%'> </Card>

                                <Card padding='10px 5px' width='50%' radius='0'>
                                    <Text width='30%' margin='0 0 0 0' color='#000'> Discount </Text>
                                    <Text width='70%' margin='0 0 0 0' color='#000'> {data?.getOneCommissionInvoice.totalDiscounts} </Text>
                                </Card>
                            </Card>
                            <Card margin='0 0 5px 0' width='100%'>
                                <Card width='25%'> </Card>
                                <Card width='25%'> </Card>

                                <Card padding='10px 5px' width='50%' radius='0'>
                                    <Text width='30%' margin='0 0 0 0' color='#000'> Grand Total </Text>
                                    <Text width='70%' margin='0 0 0 0' color='#000'> {data?.getOneCommissionInvoice.totalSalesReceived} </Text>
                                </Card>
                            </Card>
                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card padding='10px 5px' width='40%' radius='0'>
                                    <Text width='100%' padding='10px 10px' color='#fff' background='#cb1d6c' size='15px'> Payment Mathod: </Text>
                                    <Text width='100%' color='#000' size='15px'> Stripe </Text>
                                    <Text width='100%' color='#000' size='15px'> Card </Text>
                                </Card>
                                <Card width='30%'> </Card>
                                <Card width='30%'> </Card>
                            </Card>
                            <Card margin='5px 0 5px 0' width='100%'>
                                <Card padding='10px 5px' width='25%' radius='0'>
                                    <Text width='100%' color='#000' size='15px'> Phone: 027-123-1324-23 </Text>
                                    <Text width='100%' color='#000' size='15px'> Email: example@gmail.com </Text>
                                    <Text width='100%' color='#000' size='15px'> Page: www.example.com </Text>
                                </Card>
                                <Card width='25%'> </Card>
                                <Card width='50%'>
                                    <Text width='100%' size='20px' bold='bold' align='left'>{data?.getOneCommissionInvoice.invoiceTo}</Text>
                                    <Text width='100%' size='15px' bold='bold' align='left'>{data?.getOneCommissionInvoice.agentDetails.legalName}</Text>
                                </Card>
                            </Card>
                        </ContPdf>
                    </DocumentFormatA4>
                    {/* <WrapperControls>
                        <ContentToggle>
                            <div>
                            {/* handleRedoState(data?.getOneCommissionInvoice._id) }
                                <Text style={{ margin: '0' }} size='13px' >Redo Invoice</Text>
                                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                                    <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
                            <div>
                            {/* handlePayMake(data?.getOneCommissionInvoice._id) }
                                <Text style={{ margin: '0' }} size='13px' >Mark Payment</Text>
                                <ButtonTheme onClick={ () => Switch2.setState(!Switch2.state) }>
                                    <SwitchButton active={Switch2.state ? '36px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { ...data } })}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                Descargar
                            </RippleButton>
                        </ContentToggle>
                    </WrapperControls> */}
                </WrapperPdf>
          
            </AwesomeModal>
        </Content>
    )
}


