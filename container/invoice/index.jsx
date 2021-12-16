import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { GET_ONE_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';
import { Button, DocumentFormatA4, WrapperControls, WrapperPdf } from './styled';

export const Invoice = ({ idInvoice }) => {
    const { data, loading } = useQuery(GET_ONE_INVOICE, { variables: { idInvoice: idInvoice }, fetchPolicy: 'cache-and-network' })
    const [openModal, setOpenModal] = useState(false)
    const [animate, setAnimate] = useState(false);
    console.log(data)
    useEffect(() => {
        if (data) {
            setOpenModal(true)
        }
    }, [])
    if (loading) return <Loading />

    return (
        <div>
            <AwesomeModal show={true} useScroll={true} height='100vh' zIndex='0' title={`Invoice ${data ? data?.getOneCommissionInvoice?.eventName : null}`} onHide={() => setOpenModal(false)} onCancel={() => false} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperPdf>
                    <DocumentFormatA4>
                        <DocumentPdf invoice={!loading && data?.getOneCommissionInvoice} />
                    </DocumentFormatA4>
                    <WrapperControls>
                        <Button animate={animate} onClick={() => setAnimate(true)} onAnimationEnd={() => setAnimate(false)}>Share</Button>
                    </WrapperControls>
                </WrapperPdf>
            </AwesomeModal>

        </div>
    )
}

Invoice.propTypes = {
    idInvoice: PropTypes.string,

}
