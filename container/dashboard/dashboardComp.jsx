import React, { useEffect, useState, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import currencyFormatter from 'currency-formatter'
import { useRouter } from 'next/router'
import InputHooks from '../../components/InputHooks/InputHooks'
import { orderColumn } from '../../components/Table/orderColumn'
import { Table, useKeyPress } from '../../components/Table'
import { IS_APPROVED_INVOICE_SENDER, IS_PAY_INVOICE, IS_REDO_INVOICE } from '../../container/invoice/queries'
import { dateFormat, dateNow, updateCache } from '../../utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import Tabs from '../../components/Tabs'
import { DocumentPdf } from './Document'
import { Pagination } from '../../components/Pagination'
import { CREATE_COMMISSION_PAY, GET_ALL_INVOICES_RECEIVED, GET_ALL_INVOICES_SENT, GET_STIMATE_COUNT, GET_STIMATE_COUNT_SEND, HAS_BEEN_RECEIVED } from './queries'
import { IconArrowBottom, IconArrowTop, IconDelete, IconDost, IconEdit, IconFolder, IconShowEye, IconPDF, IconCancel, IconPlus, IconPay, IconCheck, IconDelTag } from '../../public/icons'
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
import { EColor, PColor, SVColor, SFVColor, BColor, BGColor, PVColor, APColor, BGAColor, PLColor } from '../../public/colors'
import { Checkbox } from '../../components/Checkbox'
import { useCheckboxState } from '../../components/hooks/useCheckbox'
import { SentBillComponent } from './invoiceSend'
import { InvoiceReceived } from './invoiceReceived'
export const DashboardComp = () => {
    const { setAlertBox, company } = useContext(Context)
    const router = useRouter()
    const name = router.query.name
    const [show, setShow] = useState(false)
    const [yearss, setsetYear] = useState('')
    const [arrayInvoice, setData] = useState([])
    // main func
    const [active, setActive] = useState(false)
    const handleClick = index => setActive(index === active ? false : index)
    const [showMore, setShowMore] = useState(0)
    const { data, loading } = useQuery(GET_ALL_INVOICES_SENT, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp, max: showMore } })
    const { data: dataCount } = useQuery(GET_STIMATE_COUNT, { fetchPolicy: 'network-only', variables: { idComp: company.idLasComp && company.idLasComp } })
    const { data: dataCountSend } = useQuery(GET_STIMATE_COUNT_SEND, { fetchPolicy: 'network-only', variables: { idComp: company.idLasComp && company.idLasComp } })
    const { data: DataReceived, loading: loadingR } = useQuery(GET_ALL_INVOICES_RECEIVED, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
    // QUERIES
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

    const [selectedDate, handleDateChange] = useState('');
    const Years = (startYear) => {
        const currentYear = new Date().getFullYear()
        let years = [];
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    }
    const YearArray = dataCountSend?.getEstimateCountInvoiceSend?.filter(y => y.eventCommences !== null).map(x => parseInt(x.eventCommences?.replace(/\D/gi, '').substring(0, 4)))
    let min = !!YearArray && YearArray[0]
    for (var i = 0; i < YearArray?.length; i++) {
        if (YearArray[i] < min) {
            min = YearArray[i];
        }
    }
    const getYearInvoices = () => {
        const year = Years(min)
        setsetYear(year)
        handleClick(1)
    }
    const [open, setOpen] = useState(false)
    const { checkedItems, disabledItems, handleChangeCheck, toggleAll, selectAll, clearAll } = useCheckboxState(data?.getAllCommissionInvoiceSent, [0], [0]);
    const initialState = { selectedIndex: 1 }
    const initialStateInvoice = {
        Addtopay: []
    }
    function reducer(state, action) {
        switch (action.type) {
            case 'arrowUp':
                return {
                    selectedIndex:
                        state.selectedIndex !== 0 ? state.selectedIndex - 1 : data.length - 1
                }
            case 'arrowDown':
                return {
                    selectedIndex:
                        state.selectedIndex !== data.length - 1 ? state.selectedIndex + 1 : 0
                }
            case 'Enter':
                return {
                    selectedIndex:
                        setOpen(!open)
                }
            case 'select':
                return { selectedIndex: action && action.payload }
            default:
                throw new Error()
        }
    }

    const invoicePayReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_PAY':
                return {
                    ...state,
                    Addtopay: [...state?.Addtopay, action?.payload]
                }
            case 'REMOVE_INVOICE':
                return {
                    Addtopay: state?.Addtopay?.filter((t, idx) => idx !== action?.idx)
                };
            case "TOGGLE_INVOICE":
                return {
                    Addtopay: state?.Addtopay.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }

    const [statePay, dispatchInvoice] = useReducer(invoicePayReducer, initialStateInvoice)
    const [state, dispatch] = useReducer(reducer, initialState)

    const Handleremove = _id => {
        dispatchInvoice({ type: 'REMOVE_INVOICE', payload: _id })
    }
    const handlePayState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleAddInvoice = elem => {
        let includes = statePay?.Addtopay.includes(elem);
        if (includes) {
            setAlertBox({ message: 'The invoice is already added to the list' })
        } else {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
        }
    }
    return (
        <ContentListInvoice>
            <Text margin='0 0 30px 0 !important' size='30px !important'>Welcome to {name}</Text>
            <FilterOptions>
                <Button size='0.875rem' style={{ height: '40px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem', padding: '2px 10px', display: 'grid', placeContent: 'center', gridTemplateColumns: '1fr .5fr' }} onClick={() => getYearInvoices()}>  Filtros</Button>
                <Button size='0.875rem' style={{ height: '40px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem', padding: '2px 10px' }} onClick={() => handleClick(2)}>Save invoices</Button>
                <Button size='0.875rem' style={{ height: '40px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem', padding: '2px 10px' }} onClick={() => handleClick(3)}>Add Invoice Pay</Button>
            </FilterOptions>
            <Tabs width={['25%', '25%']} >
                <Tabs.Panel label={`Sent bill: ${data ? data?.getAllCommissionInvoiceSent?.length : 0} / ${dataCountSend?.getEstimateCountInvoiceSend ? dataCountSend?.getEstimateCountInvoiceSend?.length : 0}`}>
                    <>
                        <SentBillComponent
                            loading={loading}
                            setShowMore={setShowMore}
                            showMore={showMore}
                            show={show}
                            setActive={setActive}
                            state={state}
                            dataInvoice={data}
                            setOpen={setOpen}
                            dispatch={dispatch}
                            clearAll={clearAll}
                            handleAddInvoice={handleAddInvoice}
                            currencyFormatter={currencyFormatter}
                            toggleAll={toggleAll}
                            selectAll={selectAll}
                            disabledItems={disabledItems}
                            checkedItems={checkedItems}
                            handleClick={handleClick}
                            handleChangeCheck={handleChangeCheck}
                            active={active}
                            data={data}
                        />
                    </>
                </Tabs.Panel>
                <Tabs.Panel label={`Invoices Received ${DataReceived ? DataReceived?.getAllCommissionInvoiceReceived?.length : 0} / ${dataCount?.getEstimateCountInvoice ? dataCount?.getEstimateCountInvoice?.length : 0}`}>
                    <>
                        <InvoiceReceived
                            loading={loading}
                            setShowMore={setShowMore}
                            setActive={setActive}
                            showMore={showMore}
                            show={show}
                            handleAddInvoice={handleAddInvoice}
                            state={state}
                            dataInvoice={data}
                            setOpen={setOpen}
                            dispatch={dispatch}
                            clearAll={clearAll}
                            currencyFormatter={currencyFormatter}
                            toggleAll={toggleAll}
                            selectAll={selectAll}
                            disabledItems={disabledItems}
                            checkedItems={checkedItems}
                            handleClick={handleClick}
                            handleChangeCheck={handleChangeCheck}
                            active={active}
                            data={DataReceived}
                        />
                    </>
                </Tabs.Panel>
            </Tabs>
            <ModalAddInvoicePaymentState
                setShow={setShow}
                show={show}
                dispatchInvoice={dispatchInvoice}
                state={state}
                statePay={statePay}
                data={data?.getAllCommissionInvoiceSent}
                handleAddInvoice={handleAddInvoice}
                setActive={setActive}
                handleClick={handleClick}
                Handleremove={Handleremove}
                active={active}
                handlePayState={handlePayState}
            />
            <ModalFilter
                // open modal Action
                data={data}
                active={active}
                handleClick={handleClick}
                setActive={setActive}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />

        </ContentListInvoice>
    )
}

export const ModalAddInvoicePaymentState = ({ statePay, dispatchInvoice, handleAddInvoice, data, setActive, handleClick, Handleremove, handlePayState, show, state, active }) => {
    // STATE
    console.log(active)
    const { setAlertBox, company } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [showInvoice, showAllData] = useState(false)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const sumTotal = arr => arr && arr?.reduce((sum, { invoiceTotal }) => sum + invoiceTotal, 0)
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
    console.log(result)
    return (
        <div>
            <AwesomeModal zIndex='999999' padding='20px' height='600px' useScroll={true} show={active === 4} onHide={() => setActive(false)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <form onSubmit={(e) => handleForm(e)}>
                    <h4>{dateNow}</h4>
                    <InputHooks title='Description' required name='Idescription' error={errors?.Idescription} value={values?.Idescription} onChange={handleChange} />
                    <RippleButton padding='10px' widthButton={'100%'} type={'sutmit'}  >Save</RippleButton>
                </form>
            </AwesomeModal>
            <AwesomeModal zIndex='99999' padding='20px' height='100vh' show={active === 3} onHide={() => setActive(false)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <ContentModal showInvoice={showInvoice} overflow='auto'>
                    {!showInvoice && statePay?.Addtopay?.filter(x => x.isPaid === false).map((x, idx) => (
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
                            <CtnInfo>
                                <Text size={'1.125rem'} color={BColor}>INVOICE TO: </Text>
                                <Text size={'1.125rem'} color={BColor}>{x.invoiceTo}</Text>
                            </CtnInfo>
                            <CtnInfo border>
                                <ButtonContentT>
                                    <Tooltip onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>PAYMENT NOW</Tooltip>
                                    <BlueButton onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>{x.isPaid === false ? 'MARK PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                </ButtonContentT>
                                <Options justify>
                                    <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                    <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                </Options>
                            </CtnInfo>
                        </CardInvoice>
                    ))}
                    {showInvoice && dataInvoiceTo?.map(date => (
                        <CardInvoice height='100vh' showInvoice={showInvoice}>
                            <WrapperInnerInvoiceTo>
                                <Text color={BColor} size='26px'>{date}</Text>
                                <div>
                                    {result[date]?.map((x, idx) => (
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
                                            <CtnInfo>
                                                <Text size={'1.125rem'} color={BColor}>INVOICE TO: </Text>
                                                <Text size={'1.125rem'} color={BColor}>{x.invoiceTo}</Text>
                                            </CtnInfo>
                                            <CtnInfo border>
                                                <ButtonContentT>
                                                    <Tooltip onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>PAYMENT NOW</Tooltip>
                                                    <BlueButton onClick={() => { dispatchInvoice({ type: "TOGGLE_INVOICE", idx }); handlePayState(x) }}>{x.isPaid === false ? 'MARK PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                                </ButtonContentT>
                                                <Options justify>
                                                    <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                                    <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                                </Options>
                                            </CtnInfo>
                                        </CardInvoice>
                                    ))}
                                </div>
                            </WrapperInnerInvoiceTo>
                        </CardInvoice>
                    ))}
                </ContentModal>
                <Options direction='row'>
                    <Button style={{ border: '1px solid #ccc' }} onClick={() => handleClick(4)}>Save invoices</Button>
                    <Text width='min-content' size='30px'>£ {parseFloat(totalInvoice.toFixed(2))}</Text>
                </Options>
                <ContainerInfo>
                    <Options direction='row'>
                        <NewSelect topTitle='10px !important' action top='88%' icon title='Filter supplier.' width='25%' secOptionName={''} error={errors?._id} required search disabled={false} options={data || []} id='_id' name='_id' value={values?._id || ''} optionName={['invoiceTo']} onChange={handleChange} />
                        <InputHooks width='25%' type='date' title='from' required name='from' error={errors?.from} value={values?.from} onChange={handleChange} />
                        <InputHooks width='25%' type='date' title='todate' required name='todate' error={errors?.todate} value={values?.todate} onChange={handleChange} />
                        <Button style={{ border: '1px solid #ccc' }} onClick={() => showAllData(!showInvoice)}>{!showInvoice ? 'Show' : 'Close'} All invoice</Button>
                        <Text width='min-content' size='30px'>{data?.filter(x => x.isPaid === false)?.length} / {data?.length || 0}  Invoice </Text>
                    </Options>
                    <ContentModal height={'90vh'}>
                        {!showInvoice ? data ? data?.filter(x => statePay?.Addtopay.length > 0 ? x.invoiceTo === statePay?.Addtopay[0]?.invoiceTo && x.isPaid === false : x.isPaid === false).map(x => (
                            <CardInvoice key={x.id}>
                                <HeaderModal>
                                    <Text color={BColor} size='20px'>{x.eventName}</Text>
                                    <ButtonAdd bgColor='transparent' color={BGColor}
                                        onClick={() => handleAddInvoice(x)}>
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
                                <CtnInfo>
                                    <Text size={'1.125rem'} color={BColor}>INVOICE TO: </Text>
                                    <Text size={'1.125rem'} color={BColor}>{x.invoiceTo}</Text>
                                </CtnInfo>
                                <CtnInfo border>
                                    <ButtonContentT>
                                        <Tooltip onClick={() => handlePayState(x)}>PAYMENT NOW</Tooltip>
                                        <BlueButton onClick={() => handlePayState(x)}> {x.isPaid === false ? 'MARK PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                    </ButtonContentT>
                                    <Options justify>
                                        <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                        <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                    </Options>
                                </CtnInfo>
                            </CardInvoice>
                        )) : <div>No data</div> : data ? data?.filter(x => x.isPaid === false).map(x => (
                            <CardInvoice key={x.id}>
                                <HeaderModal>
                                    <Text color={BColor} size='20px'>{x.eventName}</Text>
                                    <ButtonAdd bgColor='transparent' color={BGColor}
                                        onClick={() => handleAddInvoice(x)}>
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
                                <CtnInfo>
                                    <Text size={'1.125rem'} color={BColor}>INVOICE TO: </Text>
                                    <Text size={'1.125rem'} color={BColor}>{x.invoiceTo}</Text>
                                </CtnInfo>
                                <CtnInfo border>
                                    <ButtonContentT>
                                        <Tooltip onClick={() => handlePayState(x)}>PAYMENT NOW</Tooltip>
                                        <BlueButton onClick={() => handlePayState(x)}>{x.isPaid === false ? 'MARK PAYMENT NOW' : 'PAID OUT'}</BlueButton>
                                    </ButtonContentT>
                                    <Options justify>
                                        <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                        <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                    </Options>
                                </CtnInfo>
                            </CardInvoice>
                        )) : <div>No data</div>}
                    </ContentModal>
                </ContainerInfo>
            </AwesomeModal>
        </div>
    )
}


export const ModalFilter = ({ active, handleDateChange, InvoiceYear, setActive }) => {
    const currentYear = new Date().getFullYear()
    return (
        <AwesomeModal zIndex='99' padding='20px' height='60vh' show={active === 6} onHide={() => setActive(false)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='8px' >
            <RippleButton bgColor='transparent' onClick={() => setActive(false)}>
                <IconArrowBottom size='30px' color={EColor} />
            </RippleButton>
            <Tabs width={['33.33%', '33.33%', '33.33%']}>
                <Tabs.Panel label={'Basic'}>
                    <>
                        <Toolbar>
                            <Text style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }} size='40px' color={BGColor}>{currentYear}</Text>
                        </Toolbar>
                        {InvoiceYear ? InvoiceYear?.map(x => (
                            <RippleButton widthButton='100%' margin='0' bgColor='transparent' key={x.id} onClick={() => handleDateChange(x)}>
                                <Text size='30px' style={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }} color={BColor} >{x}</Text>
                            </RippleButton>
                        )) : <div>No data</div>}
                    </>
                </Tabs.Panel>
                <Tabs.Panel label={'Basic'}>
                    <>
                        Hi
                    </>
                </Tabs.Panel>
                <Tabs.Panel label={'Basic'}>
                    <>
                        Hi
                    </>
                </Tabs.Panel>
            </Tabs>
            <Options style={{ position: 'absolute', bottom: '20px', left: '0' }} >
                <BlueButton style={{ width: '91%', padding: '10px', margin: '0px 30px ' }} onClick={() => setActive(false)}>
                    See results
                </BlueButton>
            </Options>
        </AwesomeModal>
    )
}

DashboardComp.propTypes = {

}

