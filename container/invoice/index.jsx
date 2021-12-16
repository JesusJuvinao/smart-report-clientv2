import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { GET_ONE_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';

export const Invoice = ({ idInvoice }) => {
    const { data, loading, error } = useQuery(GET_ONE_INVOICE, { variables: { idInvoice }, fetchPolicy: 'cache-and-network' })
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (data) {
            setOpenModal(true)
        }
    }, [])
    console.log(data)
    if (loading || error) return <Loading />
    return (
        <div>
            <AwesomeModal show={!!data} padding='1rem' height='100vh' title={`Invoice ${ data ? data?.getOneCommissionInvoice?.eventName : null }`} onHide={() => setOpenModal(false)} onCancel={() => false} size='medium' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <DocumentPdf invoice={!loading && data?.getOneCommissionInvoice} />
            </AwesomeModal>

        </div>
    )
}

Invoice.propTypes = {
    idInvoice: PropTypes.string,

}
