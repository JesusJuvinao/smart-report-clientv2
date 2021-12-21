import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react';
import { GET_ONE_INVOICE, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';
import { Button, DocumentFormatA4, WrapperControls, WrapperPdf, Content, ContentToggle, ButtonTheme, SwitchButton, Text } from './styled';
import { updateCache } from '../../utils';
import { GET_ALL_INVOICES_SENT, HAS_BEEN_RECEIVED } from '../dashboard/queries';
import { Context } from '../../context';
import { BColor } from '../../public/colors';
import { RippleButton } from '../../components/Ripple';
import { useSetState } from '../../components/hooks/useState';
import { useUser } from '../Profile';

export const Invoice = ({ idInvoice }) => {
    const { data, loading } = useQuery(GET_ONE_INVOICE, { variables: { idInvoice: idInvoice }, fetchPolicy: 'cache-and-network' })
    const { setAlertBox } = useContext(Context)
    const [dataUser] = useUser()
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (data) {
            setOpenModal(true)
        }
    }, [])
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
    const Switch = useSetState(0)
    const handleChangeReceived = async () => {  
        setOpenModal(!openModal)
        await hasBeenReceived({
            variables: {
                idInvoice: idInvoice,
                uEmail: data && data?.getOneCommissionInvoice.agentDetails.agentEmail,
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
                        <DocumentPdf invoice={!loading && data?.getOneCommissionInvoice} />
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
                                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                                    <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
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
