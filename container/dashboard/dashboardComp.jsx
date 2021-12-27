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
import { LazyLoading, Loading, SpinnerColorJust } from '../../components/Loading'
import { EColor, PColor, SVColor, SFVColor, BColor, BGColor, PVColor, APColor, BGAColor, PLColor } from '../../public/colors'
import { Checkbox } from '../../components/Checkbox'
import { useCheckboxState } from '../../components/hooks/useCheckbox'
import { SentBillComponent } from './invoiceSend'
import { InvoiceReceived } from './invoiceReceived'
import { ModalAddInvoicePaymentState } from './ModalPayment'
import { ModalAlerBox } from './ModalAlert'
export const DashboardComp = () => {
    const { setAlertBox, company } = useContext(Context)
    const router = useRouter()
    const name = router.query.name
    const [show, setShow] = useState(false)
    const [openModalMain, setOpenModalMain] = useState(false)
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
    const [values, setValues] = useState({})
    const [alertModal, setAlertModal] = useState(false)
    const [invoiceData, setDataInv] = useState({})
    const [errors, setErrors] = useState({})
    const [showInvoice, showAllData] = useState(false)
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }

    // QUERIES
    const [isPaidStateInvoice, { loading: loadingPay }] = useMutation(IS_PAY_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2
        })
    })
    const [isApprovedByInvoiceSenderMutation, { loading: loadingApprove }] = useMutation(IS_APPROVED_INVOICE_SENDER, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isApprovedByInvoiceSenderMutation?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_RECEIVED,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })
    const [isRedoStateInvoice, { loading: loadingRedo }] = useMutation(IS_REDO_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isRedoStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })
    // HANDLES
    const handleRedoState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isRedoStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleApprovedInvoiceState = async (data) => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        console.log(data)
        if (data.isApprovedByInvoiceSender === false) {
            await isApprovedByInvoiceSenderMutation({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        } else {
            await isApprovedByInvoiceSenderMutation({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
            await isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        }
    }
    const handlePayState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleClickAddInvoice = elem => {
        let includes = statePay?.Addtopay.includes(elem);
        console.log(elem)
        if (elem.isPaid === false) {
            handlePayState(elem)
        } else if (includes && elem.isPaid !== true) {
            setAlertBox({ message: 'The invoice is already added to the list' })
            setOpenModalMain(true)
        } else if (elem.isPaid !== true) {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
            setOpenModalMain(true)
        } else if (elem.isPaid === true) {
            setAlertModal(true)
            setDataInv(elem)
        }
    }
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
            {loadingPay || loadingRedo || loadingApprove && <Loading />}
            <Text margin='0 0 30px 0 !important' size='30px !important'>Welcome to {name}</Text>
            <FilterOptions>
                <Button size='0.875rem' style={{ height: '40px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem', padding: '2px 10px', display: 'grid', placeContent: 'center', gridTemplateColumns: '1fr .5fr' }} onClick={() => getYearInvoices()}> FILTERS</Button>
                <Button size='0.875rem' style={{ height: '40px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem', padding: '2px 10px' }} onClick={() => setOpenModalMain(true)}> ADD INVOICE PAY</Button>
                {/* <NewSelect topTitle='10px !important' action top='88%' icon title='Filter supplier.' width='25%' secOptionName={''} error={errors?._id} required search disabled={false} options={data || []} id='_id' name='_id' value={values?._id || ''} optionName={['invoiceTo']} onChange={handleChange} /> */}
                <InputHooks width='25%' type='date' title='from' required name='from' error={errors?.from} value={values?.from} onChange={handleChange} />
                <InputHooks width='25%' type='date' title='todate' required name='todate' error={errors?.todate} value={values?.todate} onChange={handleChange} />
                <Button style={{ border: '1px solid #ccc' }} onClick={() => showAllData(!showInvoice)}>{!showInvoice ? 'Show' : 'Close'} All invoice</Button>
                {/* <Text width='min-content' size='30px'>{data?.filter(x => x.isPaid === false)?.length} / {data?.length || 0}  Invoice </Text> */}
            </FilterOptions>
            <Tabs width={['25%', '25%']} >
                <Tabs.Panel label={`Sent bill: ${data ? data?.getAllCommissionInvoiceSent?.length : 0} / ${dataCountSend?.getEstimateCountInvoiceSend ? dataCountSend?.getEstimateCountInvoiceSend?.length : 0}`}>
                    <>
                        <SentBillComponent
                            loading={loading}
                            setShowMore={setShowMore}
                            showMore={showMore}
                            setShow={setShow}
                            show={show}
                            setActive={setActive}
                            state={state}
                            dataInvoice={data}
                            handleClickAddInvoice={handleClickAddInvoice}
                            // onchange
                            values={values}
                            errors={errors}
                            handleChange={handleChange}
                            setOpen={setOpen}
                            handleApprovedInvoiceState={handleApprovedInvoiceState}
                            handleRedoState={handleRedoState}
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
                            // onchange
                            values={values}
                            errors={errors}
                            handleChange={handleChange}
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
                openModalMain={openModalMain}
                setOpenModalMain={setOpenModalMain}
                // onchange
                values={values}
                errors={errors}
                handleChange={handleChange}
                statePay={statePay}
                data={data?.getAllCommissionInvoiceSent}
                handleAddInvoice={handleAddInvoice}
                setActive={setActive}
                handleClick={handleClick}
                Handleremove={Handleremove}
                active={active}
                handlePayState={handlePayState}
            />
            <ModalAlerBox
                setAlertModal={setAlertModal}
                handlePayState={handlePayState}
                invoiceData={invoiceData}
                handleApprovedInvoiceState={handleApprovedInvoiceState}
                alertModal={alertModal}
            />
            <ModalFilter
                // open modal Action
                data={data}
                active={active}
                // onchange
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleClick={handleClick}
                setActive={setActive}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />

        </ContentListInvoice>
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

