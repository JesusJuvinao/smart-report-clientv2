import React, { useEffect, useState, useReducer, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import currencyFormatter from 'currency-formatter'
import { useRouter } from 'next/router'
import InputHooks from '../../components/InputHooks/InputHooks'
import { orderColumn } from '../../components/Table/orderColumn'
import { Table, useKeyPress } from '../../components/Table'
import { dateFormat, dateNow, updateCache } from '../../utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import { CREATE_COMMISSION_PAY, GET_ALL_INVOICES_RECEIVED, GET_ALL_INVOICES_SENT, GET_STIMATE_COUNT, GET_STIMATE_COUNT_SEND, HAS_BEEN_RECEIVED } from './queries'
import { IconCancel, IconPlus } from '../../public/icons'
import { BlueButton, ButtonAdd, ButtonContentT, CardInvoice, CardInvoiceTo, CheckAnimation, ChipHead, Clip, ContainerInfo, Content, ContentHead, ContentListInvoice, ContentModal, CtnInfo, DownLoadButton, FilterOptions, HeaderModal, Options, PaymentStatus, Toast, Toolbar, Tooltip, WrapperInnerInvoiceTo } from './styled'
import { Container, WrapperFilter, Button, Card, Text, Circle, Wrapper, LineItems, OptionsFunction, WrapperButtonAction, Current, Section, ArrowsLabel, InputFilterNumber, BoxArrow, InputHide, ButtonPagination, PageA4Format } from './styled'
import { Context } from '../../context'
import { useContext } from 'react'
import { useUser } from '../Profile'
import { RippleButton } from '../../components/Ripple'
import { useSetState } from '../../components/hooks/useState'
import NewSelect from '../../components/NewSelectHooks'
import { Overline } from '../../components/common/Reusable'
import { LazyLoading, SpinnerColorJust } from '../../components/Loading'
import { BColor, BGColor, PVColor, APColor, BGAColor, PLColor } from '../../public/colors'


export const ModalAddInvoicePaymentState = ({ statePay, dispatchInvoice, setOpenModalMain, openModalMain, loading, setShowMore,  handleChange, values, errors, handleAddInvoice, data, setActive, handleClick, Handleremove, handlePayState, show, state, active }) => {
    // STATE
    const { setAlertBox, company } = useContext(Context)
    const [showInvoice, showAllData] = useState(false)
    const sumTotal = arr => arr && arr?.reduce((sum, { invoiceTotal }) => sum + invoiceTotal, 0)
    const sumTotalForInvoiceTo = arr => arr && arr?.reduce((sum, { invoiceTotal }) => sum + invoiceTotal, 0)
    const totalForInvoiceTo = sumTotal(statePay?.Addtopay)
    const totalInvoice = sumTotal(statePay?.Addtopay)
    const [openModalConfirm, setOpenModalConfirm] = useState(0)
    // QUERYS
    const [createInvoicePaymentMutation] = useMutation(CREATE_COMMISSION_PAY, {
        onCompleted: (data) => setAlertBox({ message: `Success`, duration: 8000, color: data ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceSent, getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT || GET_ALL_INVOICES_RECEIVED,
            nameFun: 'getAllCommissionInvoiceSent' || 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceSent || getAllCommissionInvoiceReceived,
            type: 2
        })
    })
    const newData = statePay?.Addtopay?.map(x => ({ idInvoice: x._id, currency: x.currency, agentDetails: { VATRegNo: x.agentDetails.VATRegNo, agentAddress1: x.agentDetails.agentAddress1, agentAddress2: x.agentDetails.agentAddress2, agentAddress3: x.agentDetails.agentAddress3, agentCity: x.agentDetails.agentCity, agentCompanyNumber: x.agentDetails.agentCompanyNumber, agentContact: x.agentDetails.agentContact, agentCountry: x.agentDetails.agentCountry, agentEmail: x.agentDetails.agentEmail, agentPostCode: x.agentDetails.agentPostCode, agentTradingName: x.agentDetails.agentTradingName, agentVATRegistered: x.agentDetails.agentVATRegistered, legalName: x.agentDetails.legalName }, lineItemsArray: { eventName: x.eventName, eventRef: x.eventRef, eventType: x.eventType, hasBeenReceived: x.hasBeenReceived, hasBeenSent: false, invoiceDate: x.invoiceDate, invoiceFrom: x.invoiceFrom, invoiceRef: x.invoiceRef, invoiceTo: x.invoiceTo, invoiceTotal: x.invoiceTotal, isOnStatement: x.isOnStatement, isPaid: x.isPaid, isRedo: x.isRedo, isVATRegistered: x.isVATRegistered, statementId: x.statementId, totalCommDue: x.totalCommDue, totalDiscounts: x.totalDiscounts, totalSalesReceived: x.totalSalesReceived, uploaded: x.uploaded, vatOnComms: x.vatOnComms } }))
    // HANDLES
    const handleForm = async e => {
        e.preventDefault()
        return createInvoicePaymentMutation({
            variables: {
                input: {
                    idComp: company.idLasComp,
                    Idescription: values.Idescription,
                    totalInvoicePayment: parseFloat(totalInvoice.toFixed(2)),
                    isPaymentConfirm: false
                },
                //  Array
                inputLineItems: {
                    setDataPay: newData
                }
            }
        }).then(() => setAlertBox({ message: `Success`, duration: 8000, color: 'success' })
        ).catch((e) => setAlertBox({ message: `${e}`, duration: 8000, color: 'error' }))
    }
    const result = statePay?.Addtopay?.reduce(function (r, a) {
        r[a.invoiceTo] = r[a.invoiceTo] || [];
        r[a.invoiceTo].push(a);
        return r;
    }, Object.create(null));
    const dataInvoiceTo = Object.keys(result);
    const TOTAL_INVOICE_TO = dataInvoiceTo?.map(date => result[date]?.map((x, idx) => x))
    const calculateTotalFoInvoice = useCallback((totalCalue) => {
        // if (totalCalue) {
        //     let sum = 0
        //     let TOTAL_SUM = 0
        //     const PercentageNumber = parseFloat(totalCalue)
        //     TOTAL_SUM = sum = + PercentageNumber
        // }
        return 0
    }, [result])
    const ValitareRange = () => {
        if (statePay?.Addtopay.length > 0) {
            handleClick(4)
        } else {
            setAlertBox({ message: 'You must select at least one invoice' })
        }
    }
    return (
        <div>
            <AwesomeModal zIndex='999999' padding='20px' height='600px' useScroll={true} show={active === 4} onHide={() => setActive(false)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
              <Text>Data receibe</Text>
                <form onSubmit={(e) => handleForm(e)}>
                    <h4>{dateNow}</h4>
                    <InputHooks title='Description' TypeTextarea minWidth='100%' maxWidth='100%' required name='Idescription' error={errors?.Idescription} value={values?.Idescription} onChange={handleChange} />
                    <RippleButton padding='10px' widthButton={'100%'} type={'sutmit'}  >Save</RippleButton>
                </form>
            </AwesomeModal>

            <AwesomeModal zIndex='99999' padding='20px' height='100vh' show={!!openModalMain} onHide={() => setOpenModalMain(false)} onCancel={() => setOpenModalMain(false)} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                {TOTAL_INVOICE_TO?.length > 0 && !!showInvoice && <Text size='30px' >Invoice to selected: {TOTAL_INVOICE_TO?.length}</Text>}
                <ContentModal showInvoice={showInvoice} overflow='auto'>
                    {!showInvoice && statePay?.Addtopay?.filter(x => x.isPaid === false).map((x, idx) => (
                        <CardInvoice key={x.idx}>
                            <HeaderModal>
                                <RippleButton bgColor='transparent' justifyContent='flex-end' color={BGColor}
                                    onClick={() => dispatchInvoice({ type: "REMOVE_INVOICE", idx })}>
                                    <IconCancel size='15px' color='#FF2D01' />
                                </RippleButton>
                            </HeaderModal>
                            <CtnInfo>
                                <Text color={BColor} size='18px'>{x.eventName}</Text>
                            </CtnInfo>
                            <CtnInfo>
                                <Text size='18px' color={`${BColor}69`}># {x.invoiceRef}</Text>
                            </CtnInfo>
                            <CtnInfo>
                                <Text size='18px' color={BColor}>{dateFormat(x.eventCommences)}</Text>
                                {x.eventCommences && <Text size='18px' color={BColor}>Commences:  {x.eventCommences && dateFormat(x.eventCommences)}</Text>}
                            </CtnInfo>
                            <CtnInfo>
                                <Text size='18px' color={BColor}>Invoice From: </Text>
                                <Text size='18px' color={BColor}>{x.invoiceFrom}</Text>
                            </CtnInfo>
                            <CtnInfo>
                                <Text size='18px' color={BColor}>Invoice To: </Text>
                                <Text size='18px' color={BColor}>{x.invoiceTo}</Text>
                            </CtnInfo>
                            <CtnInfo border>
                                <ButtonContentT>
                                    <Tooltip onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>Payment Now</Tooltip>
                                    <BlueButton onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>{x.isPaid === false ? 'PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                </ButtonContentT>
                                <Options justify>
                                    <Text justify='flex-end' size='18px' color={BColor}>TOTAL</Text>
                                    <Text justify='flex-end' size='18px' color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                </Options>
                            </CtnInfo>
                        </CardInvoice>
                    ))}
                    {showInvoice && dataInvoiceTo?.map(date => (
                        <CardInvoice height='100%' showInvoice={showInvoice}>
                            <WrapperInnerInvoiceTo>
                                <Text color={BColor} size='26px'>{date}</Text>
                                <div>
                                    {result[date]?.filter(x => x.isPaid === false).map((x, idx) => (
                                        <CardInvoice key={x.idx}>
                                            <HeaderModal>
                                                <Text color={BColor} size='20px'>{x.eventName}</Text>
                                                <RippleButton bgColor='transparent' color={BGColor}
                                                    onClick={() => dispatchInvoice({ type: "REMOVE_INVOICE", idx })}>
                                                    <IconCancel size='15px' />
                                                </RippleButton>
                                                <span id='line' />
                                            </HeaderModal>
                                            <CtnInfo>
                                                <Text size='18px' color={`${BColor}69`}># {x.invoiceRef}</Text>
                                            </CtnInfo>
                                            <CtnInfo>
                                                <Text size='18px' color={BColor}>{dateFormat(x.eventCommences)}</Text>
                                                {x.eventCommences && <Text size='18px' color={BColor}>Commences:  {x.eventCommences && dateFormat(x.eventCommences)}</Text>}
                                            </CtnInfo>
                                            <CtnInfo>
                                                <Text size='18px' color={BColor}>Invoice From: </Text>
                                                <Text size='18px' color={BColor}>{x.invoiceFrom}</Text>
                                            </CtnInfo>
                                            <CtnInfo>
                                                <Text size='18px' color={BColor}>Invoice To: </Text>
                                                <Text size='18px' color={BColor}>{x.invoiceTo}</Text>
                                            </CtnInfo>
                                            <CtnInfo border>
                                                {/*   <ButtonContentT>
                                                </ButtonContentT> */}
                                                <Options justify>
                                                    <Tooltip onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>PAYMENT NOW</Tooltip>
                                                    <BlueButton onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>{x.isPaid === false ? 'PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                                    <Text justify='flex-end' size='18px' color={BColor}>TOTAL</Text>
                                                    <Text justify='flex-end' size='18px' color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                                </Options>
                                            </CtnInfo>
                                        </CardInvoice>
                                    ))}
                                </div>
                            </WrapperInnerInvoiceTo>
                            <Text>
                                {calculateTotalFoInvoice(date)}
                            </Text>
                        </CardInvoice>
                    ))}
                </ContentModal>
                <Options direction='row'>
                    <Button style={{ border: '1px solid #ccc' }} onClick={() => ValitareRange()}>Save invoices</Button>
                    <Text width='min-content' size='30px'>£ {parseFloat(totalInvoice.toFixed(2))}</Text>
                </Options>
                <ContainerInfo>
                    <Options direction='row'>
                        {/* <Button style={{ border: '1px solid #ccc' }} onClick={() => showAllData(!showInvoice)}>{!showInvoice ? 'Show' : 'Close'} All invoice</Button> */}
                        <Text width='min-content' size='30px'>{data?.filter(x => x.isPaid === false)?.length} / {data?.length || 0}  Invoice </Text>
                    </Options>
                    <ContentModal overflow='auto' height={'90vh'}>
                        {!showInvoice ? data ? data?.filter(x => statePay?.Addtopay.length > 0 ? x.invoiceTo === statePay?.Addtopay[0]?.invoiceTo && x.isPaid === false : x.isPaid === false).map(x => (
                            <CardInvoice key={x.id}>
                                <HeaderModal>
                                    <ButtonAdd bgColor='transparent' justifyContent='flex-end' color={BGColor}
                                        onClick={() => handleAddInvoice(x)}>
                                        <IconPlus color={PVColor} size='25px' />
                                    </ButtonAdd>
                                </HeaderModal>
                                <CtnInfo>
                                    <Text color={BColor} size='18px'>{x.eventName}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={`${BColor}69`}># {x.invoiceRef}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>{dateFormat(x.eventCommences)}</Text>
                                    {x.eventCommences && <Text size='18px' color={BColor}>Commences:  {x.eventCommences && dateFormat(x.eventCommences)}</Text>}
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>Invoice From: </Text>
                                    <Text size='18px' color={BColor}>{x.invoiceFrom}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>Invoice to: </Text>
                                    <Text size='18px' color={BColor}>{x.invoiceTo}</Text>
                                </CtnInfo>
                                <CtnInfo border>
                                    <ButtonContentT>
                                        <Tooltip onClick={() => handlePayState(x)}>PAYMENT NOW</Tooltip>
                                        <BlueButton onClick={() => handlePayState(x)}> {x.isPaid === false ? 'PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                    </ButtonContentT>
                                    <Options justify>
                                        <Text justify='flex-end' size='18px' color={BColor}>TOTAL</Text>
                                        <Text justify='flex-end' size='18px' color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                    </Options>
                                </CtnInfo>
                            </CardInvoice>
                        )) : <div>No data</div> : data ? data?.filter(x => x.isPaid === false).map(x => (
                            <CardInvoice key={x.id}>
                                <HeaderModal>
                                    <ButtonAdd bgColor='transparent' justifyContent='flex-end' color={BGColor}
                                        onClick={() => handleAddInvoice(x)}>
                                        <IconPlus color={PVColor} size='25px' />
                                    </ButtonAdd>
                                </HeaderModal>
                                <CtnInfo>
                                    <Text color={BColor} size='18px'>{x.eventName}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={`${BColor}69`}># {x.invoiceRef}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>{dateFormat(x.eventCommences)}</Text>
                                    {x.eventCommences && <Text size='18px' color={BColor}>Commences:  {x.eventCommences && dateFormat(x.eventCommences)}</Text>}
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>Invoice From: </Text>
                                    <Text size='18px' color={BColor}>{x.invoiceFrom}</Text>
                                </CtnInfo>
                                <CtnInfo>
                                    <Text size='18px' color={BColor}>Invoice To: </Text>
                                    <Text size='18px' color={BColor}>{x.invoiceTo}</Text>
                                </CtnInfo>
                                <CtnInfo border>
                                    <ButtonContentT>
                                        <Tooltip onClick={() => handlePayState(x)}>PAYMENT NOW</Tooltip>
                                        <BlueButton onClick={() => handlePayState(x)}>{x.isPaid === false ? 'PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                    </ButtonContentT>
                                    <Options justify>
                                        <Text justify='flex-end' size='18px' color={BColor}>TOTAL</Text>
                                        <Text justify='flex-end' size='18px' color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                    </Options>
                                </CtnInfo>
                            </CardInvoice>
                        )) : <div>No data</div>}
                    </ContentModal>
                    {<BlueButton onClick={() => setShowMore(s => s + 200)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}
                </ContainerInfo>
            </AwesomeModal>
        </div>
    )
}