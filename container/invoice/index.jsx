import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react';
import { GET_ONE_INVOICE, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';
import { updateCache } from '../../utils';
import { GET_ALL_INVOICES_SENT, HAS_BEEN_RECEIVED } from '../dashboard/queries';
import { Context } from '../../context';
import { BColor, BGColor } from '../../public/colors';
import { RippleButton } from '../../components/Ripple';
import { useSetState } from '../../components/hooks/useState';
import { useUser } from '../Profile';
import { generatePdfDocumentInvoice } from './PdfInvoice';
import { DocumentFormatA4, WrapperControls, WrapperPdf, Card, Content, ContentToggle, ButtonTheme, SwitchButton, Text, Title, Row, RowGrid, ContentInvoice, Container, ContPdf, Tabla, TablaFila, RowDinamic } from './styled';

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
    return (
        <Content>
            <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => handleChangeReceived()}>
                View Invoice
            </RippleButton>
            <AwesomeModal show={data && openModal} useScroll={true} height='100vh' zIndex='0' title={`Invoice ${data ? data?.getOneCommissionInvoice?.eventName : null}`} onHide={() => setOpenModal(!openModal)} backdrop='static' onCancel={() => true} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperPdf>
                    <DocumentFormatA4>
                        <ContPdf>
                            <Card margin='0 0 30px 0' width='100%'>
                                <Card width='50%'>
                                    Logo
                                </Card>
                                <Card width='50%'>

                                    <Card width='50%'>
                                        {data?.getOneCommissionInvoice.agentDetails.legalName}
                                    </Card>
                                    <Card width='50%'>
                                        {data?.getOneCommissionInvoice.invoiceDate}
                                    </Card>
                                </Card>
                            </Card>
                            <Card>
                                <Text margin='10px 0 10px 0' size='30px'> COMMISSION PAYMENT</Text>
                            </Card>
                            <Card margin='20px 0' background='#cb1d6c' radius='0'>
                                <Text margin='10px 0 10px 5px' color={BGColor} size='20px'> Agent Trading Name: Spice Yorkshire</Text>
                            </Card>
                            <Card >
                                <RowDinamic columnWidth={['12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%']}>
                                    <Row><Text size='11px'>Ticket Type </Text></Row>
                                    <Row><Text size='11px'>Total Tix Sold</Text> </Row>
                                    <Row><Text size='11px'>Rev Tix Sold </Text></Row>
                                    <Row><Text size='11px'>Subtotal </Text></Row>
                                    <Row><Text size='11px'> Commission Due for Tix Sales </Text></Row>
                                    <Row><Text size='11px'> Total Discounts Applied to Sales </Text></Row>
                                    <Row><Text size='11px'>Total Due After Discounts</Text></Row>
                                    <Row><Text size='11px'>Ticket Price</Text></Row>
                                </RowDinamic>
                                {data && data?.getOneCommissionInvoice?.lineItemsArray?.map(invoice => (
                                    <RowDinamic columnWidth={['12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%', '12.5%']} key={invoice._id}>
                                        <Row border> <Text size='11px'>{invoice?.ticketType}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.subtotalTicketsSold}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.lineItemVATOnComm}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.lineSalesReceived}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.subtotalTicketTypeLessDiscount}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.subtotalTicketsSold}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.ticketCategoryTotalDue}</Text> </Row>
                                        <Row border> <Text size='11px'>{invoice?.ticketPrice}</Text> </Row>
                                    </RowDinamic>
                                ))}
                                <Card>
                                    <Text margin='10px 0 10px 0' size='11px'> Total Revenue of Tickets You Sold: </Text>
                                </Card>
                                <Card>
                                    <Text margin='10px 0 10px 0' size='11px'> Total Commission (including VAT) Payable to you: </Text>
                                </Card>
                                <Card>
                                    <Text margin='10px 0 10px 0' size='11px'> Total Payable by your group to the event owner: </Text>
                                </Card>
                                <Card>
                                    <RippleButton  bgColor={'#cb1d6c'}>View Invoice</RippleButton>
                                </Card>
                            </Card>

                           
                            
                        </ContPdf>
                    </DocumentFormatA4>
                    <WrapperControls>
                        <ContentToggle>
                            <div>
                                <Text style={{ margin: '0' }} size='13px' >Redo Invoice</Text>
                                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                                    <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
                            <div>
                                <Text style={{ margin: '0' }} size='13px' >Mark Payment</Text>
                                <ButtonTheme onClick={() => Switch2.setState(!Switch2.state)}>
                                    <SwitchButton active={Switch2.state ? '36px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { ...data } })}
                                type='button' width='40%' padding='6px 10px' margin='10px 0 10px auto' >
                                Descargar
                            </RippleButton>
                        </ContentToggle>
                    </WrapperControls>
                </WrapperPdf>
          
            </AwesomeModal>
        </Content>
    )
}

Invoice.propTypes = {
    idInvoice: PropTypes.string,

}
