import { AwesomeModal } from '../../components/AwesomeModal';
import { Loading } from '../../components/Loading';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react';
import { GET_ONE_INVOICE, IS_PAY_INVOICE, IS_REDO_INVOICE } from './queries';
import { DocumentPdf } from '../dashboard/Document';
import { dateFormat, updateCache } from '../../utils';
import { GET_ALL_INVOICES_SENT, GET_COMMISSION_PAY, HAS_BEEN_RECEIVED } from '../dashboard/queries';
import { Context } from '../../context';
import { RippleButton } from '../../components/Ripple';
import { useSetState } from '../../components/hooks/useState';
import { useUser } from '../Profile';
import { IconPlus } from '../../public/icons';
import { BlueButton, Options } from '../dashboard/styled';
import { APColor, BColor, BGColor, PVColor  } from '../../public/colors';
import { Button, DocumentFormatA4, WrapperControls, WrapperPdf, Content, ContentToggle, ButtonTheme, SwitchButton, Text, CardInvoice, ContentInvoice, ButtonAdd, HeaderModal, CtnInfo, ButtonContentT, Tooltip } from './styled';

export const InvoicePay = () => {
    // if (false) return <Loading />
    const Switch = useSetState(0)
    const { setAlertBox, company } = useContext(Context)

    const { data, loading } = useQuery(GET_COMMISSION_PAY, { variables: { idComp: company.idLasComp && company.idLasComp }, fetchPolicy: 'cache-and-network' })
    console.log(data)
    return (
        <Content>
            <AwesomeModal show={false} useScroll={true} height='100vh' zIndex='0' title={`Invoice ${'data ? data?.getOneCommissionInvoice?.eventName : null'}`} onHide={() => false} backdrop='static' onCancel={() => true} size='large' btnCancel={false} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <WrapperPdf>
                    <DocumentFormatA4>
                        <DocumentPdf /* invoice={!loading && data?.getOneCommissionInvoice} */ />
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
            <ContentInvoice>
                {data ? data?.getInvoicePay?.map(x => (
                    <CardInvoice key={x.id}>
                        <HeaderModal>
                            <Text color={BColor} size='20px'>{x.eventName}</Text>
                            <ButtonAdd bgColor='transparent' color={BGColor}
                                onClick={() => (x)}>
                                <IconPlus color={PVColor} size='25px' />
                            </ButtonAdd>
                            <span id='line' />
                        </HeaderModal>
                        <CtnInfo>
                            <Text size={'1rem'} color={`${BColor}69`}># {x.invoiceRef}</Text>
                        </CtnInfo>
                        <CtnInfo>
                            <Text size={'1.125rem'} color={BColor}>{dateFormat(x.eventCommences)}</Text>
                            {x.eventCommences && <Text size={'1.125rem'} color={BColor}>COMMENCES:  {x.eventCommences && dateFormat(x.eventCommences)}</Text>}
                        </CtnInfo>
                        <CtnInfo>
                            <Text size={'1.125rem'} color={BColor}>INVOICE FORM: </Text>
                            <Text size={'1.125rem'} color={BColor}>{x.invoiceFrom}</Text>
                        </CtnInfo>
                        <CtnInfo border>
                            <ButtonContentT>
                                <Tooltip onClick={() => (x)}>PAYMENT NOW</Tooltip>
                                <BlueButton onClick={() => (x)}>{'MARK PAYMENT NOW'}</BlueButton>
                            </ButtonContentT>
                            <Options justify>
                                <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                            </Options>
                        </CtnInfo>
                    </CardInvoice>
                )) : <div>No data</div>}
            </ContentInvoice>
        </Content>
    )
}

InvoicePay.propTypes = {
}
