import { useContext } from 'react'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Context } from '../../context'
import { RippleButton } from '../../components/Ripple'
import { EColor, PVColor } from '../../public/colors'
import { Text } from './styled'


export const ModalAlerBox = ({ setAlertModal, alertModal, handlePayState, invoiceData, handleApprovedInvoiceState }) => {
    // STATE
    const { setAlertBox, company } = useContext(Context)
    return (
        <div>
            <AwesomeModal zIndex='999999' padding='20px' height='auto' useScroll={true} show={alertModal} onHide={() => setAlertModal(false)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='5px' >
                <Text wrap='wrap' bold='700' size='30px' color={EColor} margin='30px 0'>You will change the status of the invoice to or paid and not approved!</Text>
                <RippleButton size='20px' padding='10px' margin='auto' widthButton={'50%'} bgColor={PVColor} onClick={() => { setAlertModal(false); handleApprovedInvoiceState(invoiceData)}} >Send</RippleButton>
        </AwesomeModal>
        </div >
    )
}