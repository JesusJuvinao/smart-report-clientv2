import React, { useEffect, useState, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/hooks/useForm'
import { useRouter } from 'next/router'
import { EColor, PColor, SVColor, SFVColor, BColor, BGColor, PVColor, APColor } from '../../public/colors'
import { CREATE_COMMISSION_PAY, GET_ALL_INVOICES_RECEIVED, GET_ALL_INVOICES_SENT, HAS_BEEN_RECEIVED } from './queries'
import { useQuery, useMutation } from '@apollo/client'
import { orderColumn } from '../../components/Table/orderColumn'
import { Table, useKeyPress } from '../../components/Table'
import { IS_APPROVED_INVOICE_SENDER, IS_PAY_INVOICE, IS_REDO_INVOICE } from '../../container/invoice/queries'
import { dateFormat, dateNow, updateCache } from '../../utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import Tabs from '../../components/Tabs'
import { DocumentPdf } from './Document'
import { Pagination } from '../../components/Pagination'
import { IconArrowBottom, IconArrowTop, IconDelete, IconDost, IconEdit, IconFolder, IconShowEye, IconPDF, IconCancel, IconPlus, IconPay, IconCheck, IconDelTag } from '../../public/icons'
import { BlueButton, ButtonAdd, ButtonContentT, CardInvoice, CheckAnimation, Clip, ContainerInfo, Content, ContentHead, ContentListInvoice, ContentModal, CtnInfo, FilterOptions, HeaderModal, Options, PaymentStatus, Tooltip } from './styled'
import {
    Container, WrapperFilter, Button, Card, Text, Circle, Wrapper, LineItems, OptionsFunction, WrapperButtonAction, Current, Section, ArrowsLabel, InputFilterNumber, BoxArrow, InputHide, ButtonPagination, PageA4Format
} from './styled'
import { Context } from '../../context'
import { useContext } from 'react'
import { useUser } from '../Profile'
import { RippleButton } from '../../components/Ripple'
import { useSetState } from '../../components/hooks/useState'
import NewSelect from '../../components/NewSelectHooks'
import { Overline } from '../../components/common/Reusable'
import { SpinnerColorJust } from '../../components/Loading'
import currencyFormatter from 'currency-formatter'
// {currencyFormatter.format(calculateAmount(x.quantity, x.rate)
export const DashboardComp = ({ idComp }) => {
    const router = useRouter()
    const name = router.query.name
    const { company } = useContext(Context)
    const [active, setActive] = useState(1)
    const handleClick = index => setActive(index === active ? false : index)
    const [showMore, setShowMore] = useState(0)
    const { data, loading } = useQuery(GET_ALL_INVOICES_SENT, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp, max: showMore } })
    const { data: DataReceived, loading: loadingR } = useQuery(GET_ALL_INVOICES_RECEIVED, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
    console.log(data, 'SEND DATA')
    return (
        <ContentListInvoice>
            <FilterOptions>
                <Button style={{ border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem' }} onClick={() => console.log('object')}>Filtros</Button>
                <Button style={{ border: '1px solid #ccc', borderRadius: '20px', marginRight: '0.75rem', minWidth: '5.375rem' }} onClick={() => console.log('object')}>Save invoices</Button>
            </FilterOptions>
            <Text margin='0 0 30px 0 !important' size='30px !important'>Welcome to {name}</Text>
            <Tabs>
                <Tabs.Panel label={`Sent bill: ${data ? data?.getAllCommissionInvoiceSent?.length : 0}`}>
                    <>
                        <SentBillComponent loading={loading} setShowMore={setShowMore} showMore={showMore} data={data} />
                    </>
                </Tabs.Panel>
                <Tabs.Panel label={`Invoices Received ${DataReceived ? DataReceived?.getAllCommissionInvoiceReceived?.length : 0}`}>
                    <>
                        <InvoiceReceivedComponent loading={loadingR} setShowMore={setShowMore} showMore={showMore} data={DataReceived} />
                    </>
                </Tabs.Panel>
            </Tabs>
        </ContentListInvoice>
    )
}

export const InvoiceReceivedComponent = ({ data, setShowMore, showMore, loading }) => {
    // Filtrar
    const { setAlertBox } = useContext(Context)
    const [search, setSearch] = useState('')
    const [dataUser] = useUser()
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
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
    const [isApprovedByInvoiceSenderMutation] = useMutation(IS_APPROVED_INVOICE_SENDER, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isApprovedByInvoiceSenderMutation?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })

    const handlePayState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'stuart.wilson@smartaccountingonline.com', uEmail: 'stuart.wilson@smartaccountingonline.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleRedoState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isRedoStateInvoice({ variables: { idInvoice: _id, ToEmail: 'stuart.wilson@smartaccountingonline.com', uEmail: 'stuart.wilson@smartaccountingonline.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleApprovedInvoiceState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        console.log(data)
        isApprovedByInvoiceSenderMutation({ variables: { idInvoice: _id, ToEmail: 'stuart.wilson@smartaccountingonline.com', uEmail: 'stuart.wilson@smartaccountingonline.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [dataInvoice, setDataInvoice] = useState({})
    const handleClick = (data) => {
        setOpen(!open)
        setDataInvoice(data)
    }
    const initialState = { selectedIndex: -1 }
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
    const arrowUpPressed = useKeyPress('ArrowUp')
    const arrowDownPressed = useKeyPress('ArrowDown')
    const backSpace = useKeyPress('Enter')
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        if (arrowUpPressed) {
            dispatch({ type: 'arrowUp' })
        }
        if (arrowDownPressed) {
            dispatch({ type: 'arrowDown' })
        }
        if (backSpace) {
            dispatch({ type: 'Enter' })
        }
    }, [arrowUpPressed, arrowDownPressed, backSpace])
    // calculo
    const [height, setHeight] = useState(0)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()

    useEffect(() => {
        setHeight(refButton?.current?.clientHeight - refMenu?.current?.clientHeight)
        setHeightMenu(refMenu?.current?.clientHeight)
    }, [])
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
    const handleChangeReceived = async ({ id, toEmail }) => {
        await hasBeenReceived({
            variables: {
                idInvoice: id,
                uEmail: toEmail,
                ToEmail: dataUser && dataUser?.uEmail
            }
        })
    }

    const initialStateInvoice = {
        Addtopay: []
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
                    // ...state,
                    Addtopay: state.Addtopay.filter((t, idx) => idx !== action?.idx)
                };
            case "TOGGLE_INVOICE":
                return {
                    Addtopay: state.Addtopay.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            // const itemToBeRemoved = state.Addtopay.find((item) => item.id === action.payload)
            default:
                return state;
        }
    }
    const [statePay, dispatchInvoice] = useReducer(invoicePayReducer, initialStateInvoice)
    const showModalInvoice = useSetState(false)
    const active = useSetState(false)
    const handleClickShow = index => {
        active.setState(index === active.state ? true : index)
    }
    const [invoiceData, setDataInv] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const isConfirm = index => {
        handleClickShow(1)
        handlePayState(invoiceData)
        setOpenModal(!openModal)
        setShow(false)

    }
    const handleClickAddInvoice = elem => {
        setDataInv(elem)
        setOpenModal(!openModal)
        if (statePay.Addtopay.filter((x) => x.idx === elem.idx)) {
            // dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
        } else {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })

        }
    }
    const addInvoice = elem => {
        dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
    }
    const Handleremove = _id => {
        dispatchInvoice({ type: 'REMOVE_INVOICE', payload: _id })
    }
    const handleMarckPayInvoice = () => {
        setOpenModal(!openModal)
        handleClickShow(true)
        showModalInvoice.setState(true)
    }
    return (
        <Container>
            <InputHooks title='Filter.' width='50%' required disabled={false} value={search} onChange={handleChangeFilter} name='search' />
            <AwesomeModal useScroll={true} height='100vh' padding='10px' show={open} hideOnConfirm={false} title={` Invoice Name ${dataInvoice.eventName}`} onHide={() => setOpen(!open)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <PageA4Format>
                    {<DocumentPdf invoice={dataInvoice} />}
                </PageA4Format>
            </AwesomeModal>
            <AwesomeModal title='Have you only paid this bill?' zIndex='9999' padding='20px' height='200px' show={openModal} onHide={() => setOpenModal(!openModal)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <Options direction='row'>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 1 && isConfirm(1)}>Si</RippleButton>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 2 && handleMarckPayInvoice()}>No</RippleButton>
                </Options>
            </AwesomeModal>
            {active.state && <ModalAddInvoicePaymentState Handleremove={Handleremove} handleClickAddInvoice={addInvoice} data={data?.getAllCommissionInvoiceReceived} showModalInvoice={showModalInvoice} dispatchInvoice={dispatchInvoice} statePay={statePay} />}
            <Table
                titles={[
                    { name: 'EventCommences', arrow: true, key: 'eventCommences', width: '9%' },
                    { name: 'Event Name', arrow: true, key: 'eventName', width: '9%' },
                    { name: 'Invoice From', arrow: true, key: 'invoiceTo', width: '9%' },
                    { name: 'Invoice Total', arrow: true, key: 'invoiceTotal', width: '9%' },
                    { name: 'Total Discounts', arrow: true, key: 'totalDiscounts', width: '9%' },
                    { name: 'Total Commission', arrow: true, key: 'totalCommDue', width: '9%' },
                    { name: 'Total Gross Sales', arrow: true, key: 'totalSalesReceived', width: '9%' },
                    { name: 'Date Received', width: '9%' },
                    { name: 'Is Pay Invoice', width: '9%' },
                    { name: 'Approved Invoice', width: '9%' },
                    { name: 'Action', width: '9%' }
                ]
                }
                data={data?.getAllCommissionInvoiceReceived}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section pointer={true} bgRow={4} padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${SVColor}` : 'transparent' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >{console.log(elem)}
                    <Wrapper>
                        <Text size='15px'> {elem.eventCommences && dateFormat(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{elem.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTo}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.invoiceTotal), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.totalDiscounts), { code: elem?.currency ? elem?.currency : 'GBP' })} </Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.totalCommDue), { code: elem?.currency ? elem?.currency : 'GBP' })} </Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalSalesReceived}</Text>
                    </Wrapper>

                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem.uploaded)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <PaymentStatus active={elem?.isPaid} >
                            <Clip active={elem.isPaid}>
                                <div className="chip">
                                    <div className="chip-head">  {!elem?.isPaid ? <IconCancel size='18px' color={!elem?.isPaid ? BGColor : PColor} /> : <IconCheck size='15px' />} </div>
                                    <div className="chip-content"> <Text size='15px' color={elem?.isPaid && PColor}> {elem?.isPaid ? 'Paid' : 'No Payment'}</Text></div>
                                </div>
                            </Clip>
                        </PaymentStatus>
                    </Wrapper>
                    <Wrapper>
                        <PaymentStatus active={elem?.isApprovedByInvoiceSender} >
                            <Clip active={elem.isPaid}>
                                <div className="chip">
                                    <div className="chip-head">  {!elem?.isApprovedByInvoiceSender ? <IconCancel size='18px' color={!elem?.isApprovedByInvoiceSender ? BGColor : PColor} /> : <IconCheck size='15px' />} </div>
                                    <div className="chip-content"> <Text size='15px' color={elem?.isApprovedByInvoiceSender && PColor}> {elem?.isApprovedByInvoiceSender ? 'Approved' : 'No Approved'}</Text></div>
                                </div>
                            </Clip>
                        </PaymentStatus>
                    </Wrapper>
                    <Wrapper>
                        <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                            <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#000'} /></Button></div>
                        </WrapperButtonAction>
                        <OptionsFunction show={show === elem}>
                            <Button border height='auto' onClick={() => handleClick({ ...elem })} ><Text size='1.1em'>View Invoice</Text></Button>
                            <Button border height='auto' onClick={() => handleRedoState(elem)} ><Text size='1.1em'>Redo invoice</Text></Button>
                            {elem.isApprovedByInvoiceSender === true && <Button border onClick={() => handleClickAddInvoice(elem)}> <Text size='1.1em'>{!elem?.isPaid ? 'Mark Paid' : 'Mark Unpaid'}</Text></Button>}
                            <Button border onClick={() => handleApprovedInvoiceState(elem)}> <Text size='1.1em'>{elem.isApprovedByInvoiceSender ? 'Mark as not Approved' : 'Mark approved'}</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                </Section>)}
            />
            {/* <Pagination value={showMore} range={data?.getAllCommissionInvoiceReceived?.length || 100} onChange={setShowMore} /> */}
            {data && <BlueButton onClick={() => setShowMore(s => s + 100)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}

        </Container>
    )
}
export const SentBillComponent = ({ data, setShowMore, showMore, loading }) => {
    // STATES
    const { setAlertBox, company } = useContext(Context)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    // QUETYS
    const [dataUser] = useUser()
    const [createInvoicePaymentMutation] = useMutation(CREATE_COMMISSION_PAY, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
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

    // HANDLES

    const handlePayState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'stuart.wilson@smartaccountingonline.com', uEmail: 'stuart.wilson@smartaccountingonline.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleRedoState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isRedoStateInvoice({ variables: { idInvoice: _id, ToEmail: 'stuart.wilson@smartaccountingonline.com', uEmail: 'stuart.wilson@smartaccountingonline.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [dataInvoice, setDataInvoice] = useState({})
    const handleClick = (data) => {
        setOpen(!open)
        setDataInvoice(data)
    }
    const initialState = { selectedIndex: -1 }
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
    const arrowUpPressed = useKeyPress('ArrowUp')
    const arrowDownPressed = useKeyPress('ArrowDown')
    const backSpace = useKeyPress('Enter')
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        if (arrowUpPressed) {
            dispatch({ type: 'arrowUp' })
        }
        if (arrowDownPressed) {
            dispatch({ type: 'arrowDown' })
        }
        if (backSpace) {
            dispatch({ type: 'Enter' })
        }
    }, [arrowUpPressed, arrowDownPressed, backSpace])
    // calculo
    const [height, setHeight] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()

    useEffect(() => {
        setHeight(refButton?.current?.clientHeight - refMenu?.current?.clientHeight)
        setHeightMenu(refMenu?.current?.clientHeight)
    }, [])
    const initialStateInvoice = {
        Addtopay: []
    }
    // ESTE ES JESUS
    const invoicePayReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_PAY':
                return {
                    ...state,
                    Addtopay: [...state?.Addtopay, action?.payload]
                }
            case 'REMOVE_INVOICE':
                return {
                    Addtopay: state.Addtopay.filter((t, idx) => idx !== action?.idx),
                };
            case "TOGGLE_INVOICE":
                return {
                    Addtopay: state.Addtopay.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            // const itemToBeRemoved = state.Addtopay.find((item) => item.id === action.payload)
            default:
                return state;
        }
    }
    const [statePay, dispatchInvoice] = useReducer(invoicePayReducer, initialStateInvoice)
    const showModalInvoice = useSetState(false)
    const active = useSetState(false)
    const handleClickShow = index => {
        active.setState(index === active.state ? true : index)
    }
    const [invoiceData, setDataInv] = useState({})
    const isConfirm = index => {
        handleClickShow(1)
        handlePayState(invoiceData)
        setOpenModal(!openModal)
        setShow(false)

    }
    const handleClickAddInvoice = elem => {
        setDataInv(elem)
        setOpenModal(!openModal)
        const results = statePay?.Addtopay?.filter(function (elem) { return elem._id === elem._id; });
        const firstObj = (results.length > 0) ? results[0] : null;
        if (!firstObj) {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
        } else {
            console.log('No se puede')
        }
    }
    const addInvoice = elem => {
        let includes = statePay?.Addtopay.includes(elem);
        if (includes) {
            setAlertBox({ message: 'The invoice is already added to the list' })
        } else {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
        }
    }
    const Handleremove = _id => {
        dispatchInvoice({ type: 'REMOVE_INVOICE', payload: _id })
    }
    const handleMarckPayInvoice = () => {
        setOpenModal(!openModal)
        handleClickShow(true)
        showModalInvoice.setState(true)
    }
    return (
        <div>
            <Overline show={show} onClick={() => setShow(!show)} />
            <AwesomeModal useScroll={true} height='100vh' padding='10px' show={open} hideOnConfirm={false} title={` Invoice Name ${dataInvoice.eventName}`} onHide={() => setOpen(!open)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <PageA4Format>
                    {<DocumentPdf invoice={dataInvoice} />}
                </PageA4Format>
            </AwesomeModal>
            <AwesomeModal title='Have you only paid this bill?' zIndex='9999' padding='20px' height='200px' show={openModal} onHide={() => setOpenModal(!openModal)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <Options direction='row'>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 1 && isConfirm(1)}>Si</RippleButton>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 2 && handleMarckPayInvoice()}>No</RippleButton>
                </Options>
            </AwesomeModal>
            {active.state && <ModalAddInvoicePaymentState handlePayState={handlePayState} Handleremove={Handleremove} handleClickAddInvoice={addInvoice} data={data?.getAllCommissionInvoiceSent} showModalInvoice={showModalInvoice} dispatchInvoice={dispatchInvoice} statePay={statePay} />}
            <Table
                titles={[
                    { name: 'EventCommences', arrow: true, key: 'eventCommences', width: '10%' },
                    { name: 'Event Name', arrow: true, key: 'eventName', width: '10%' },
                    { name: 'Invoice From', arrow: true, key: 'invoiceTo', width: '10%' },
                    { name: 'Invoice Total', arrow: true, key: 'invoiceTotal', width: '10%' },
                    { name: 'Total Discounts', arrow: true, key: 'totalDiscounts', width: '10%' },
                    { name: 'Total Commission', arrow: true, key: 'totalCommDue', width: '10%' },
                    { name: 'Total Gross Sales', arrow: true, key: 'totalSalesReceived', width: '10%' },
                    { name: 'Date Received', width: '10%' },
                    { name: 'State Invoice', width: '10%' },
                    { name: 'Action', width: '10%' }
                ]
                }
                data={data?.getAllCommissionInvoiceSent?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section bgRow={4} padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${SVColor}` : 'transparent' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >{console.log(elem?.currency)}
                    <Wrapper>
                        <Text size='15px'> {elem.eventCommences && dateFormat(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{elem.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTo}</Text>
                    </Wrapper>

                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.invoiceTotal), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.totalDiscounts), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.totalCommDue), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {currencyFormatter.format((elem.totalSalesReceived), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem.uploaded)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <PaymentStatus active={elem?.isPaid} >
                            <Text size='15px' color={elem?.isPaid && PColor}> {elem?.isPaid ? 'Payment' : 'No Payment'}</Text>
                        </PaymentStatus>
                    </Wrapper>
                    <Wrapper>
                        <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                            <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#000'} /></Button></div>
                        </WrapperButtonAction>
                        <OptionsFunction show={show === elem}>
                            <Button border height='auto' onClick={() => handleClick({ ...elem })} ><Text size='1.1em'>View</Text></Button>
                            <Button border height='auto' onClick={() => handleRedoState(elem)} ><Text size='1.1em'>Redo invoice</Text></Button>
                            <Button border onClick={() => handleClickAddInvoice(elem)}> <Text size='1.1em'>{!elem?.isPaid ? 'Mark Payment' : 'Mark No Payment'}</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                </Section>)}
            />
            {/* <Pagination value={showMore} range={data?.getAllCommissionInvoiceSent?.length || 100} onChange={setShowMore} /> */}
            {data?.getAllCommissionInvoiceSent && <BlueButton onClick={() => setShowMore(s => s + 100)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}

        </div>
    )
}
export const ModalAddInvoicePaymentState = ({ showModalInvoice, statePay, dispatchInvoice, data, handleClickAddInvoice, Handleremove, handlePayState }) => {
    // STATE
    const { setAlertBox, company } = useContext(Context)
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    const sumTotal = arr => arr && arr?.reduce((sum, { invoiceTotal }) => sum + invoiceTotal, 0)
    const totalInvoice = sumTotal(statePay.Addtopay)
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
    const newData = statePay?.Addtopay?.map(x => ({ idInvoice: x._id, agentDetails: { VATRegNo: x.agentDetails.VATRegNo, agentAddress1: x.agentDetails.agentAddress1, agentAddress2: x.agentDetails.agentAddress2, agentAddress3: x.agentDetails.agentAddress3, agentCity: x.agentDetails.agentCity, agentCompanyNumber: x.agentDetails.agentCompanyNumber, agentContact: x.agentDetails.agentContact, agentCountry: x.agentDetails.agentCountry, agentEmail: x.agentDetails.agentEmail, agentPostCode: x.agentDetails.agentPostCode, agentTradingName: x.agentDetails.agentTradingName, agentVATRegistered: x.agentDetails.agentVATRegistered, legalName: x.agentDetails.legalName }, lineItemsArray: { eventName: x.eventName, eventRef: x.eventRef, eventType: x.eventType, hasBeenReceived: x.hasBeenReceived, hasBeenSent: false, invoiceDate: x.invoiceDate, invoiceFrom: x.invoiceFrom, invoiceRef: x.invoiceRef, invoiceTo: x.invoiceTo, invoiceTotal: x.invoiceTotal, isOnStatement: x.isOnStatement, isPaid: x.isPaid, isRedo: x.isRedo, isVATRegistered: x.isVATRegistered, statementId: x.statementId, totalCommDue: x.totalCommDue, totalDiscounts: x.totalDiscounts, totalSalesReceived: x.totalSalesReceived, uploaded: x.uploaded, vatOnComms: x.vatOnComms } }))
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
        ).catch(() => setAlertBox({ message: `Error interno`, duration: 8000, color: 'error' }))
    }
    console.log(statePay?.Addtopay)
    return (
        <div>
            <AwesomeModal zIndex='999999' padding='20px' height='600px' useScroll={true} show={openModalConfirm} onHide={() => setOpenModalConfirm(false)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <form onSubmit={(e) => handleForm(e)}>
                    <h4>{dateNow}</h4>
                    <InputHooks title='Description' required name='Idescription' error={errors?.Idescription} value={values?.Idescription} onChange={handleChange} />
                    <RippleButton padding='10px' widthButton={'100%'} type={'sutmit'}  >Save</RippleButton>
                </form>
            </AwesomeModal>
            <AwesomeModal zIndex='99999' padding='20px' height='100vh' show={showModalInvoice.state} onHide={() => showModalInvoice.setState(false)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <ContentModal>
                    {statePay ? statePay?.Addtopay?.map((x, idx) => (
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
                                    <Tooltip onClick={() => handlePayState(x)}>PAYMENT NOW</Tooltip>
                                    <BlueButton onClick={() => handlePayState(x)}>{'MARK PAYMENT NOW'}</BlueButton>
                                </ButtonContentT>
                                <Options justify>
                                    <Text justify='flex-end' size={'1.125rem'} color={BColor}>TOTAL</Text>
                                    <Text justify='flex-end' size={'1.125rem'} color={APColor}>£ {x.invoiceTotal || 0}</Text>
                                </Options>
                            </CtnInfo>
                            {/* <Button
                                onClick={() => dispatchInvoice({ type: "TOGGLE_INVOICE", idx })}>
                                PAY
                            </Button> */}
                        </CardInvoice>
                    )) : <div>No data</div>}
                </ContentModal>
                <Options direction='row'>
                    <Button style={{ border: '1px solid #ccc' }} onClick={() => setOpenModalConfirm(!openModalConfirm)}>Save invoices</Button>
                    <Text width='min-content' size='30px'>£ {parseFloat(totalInvoice.toFixed(2))}</Text>
                </Options>
                <ContainerInfo>
                    <Options direction='row'>
                        <NewSelect topTitle='10px !important' action top='88%' icon title='Filter supplier.' width='25%' secOptionName={''} error={errors?._id} required search disabled={false} options={data || []} id='_id' name='_id' value={values?._id || ''} optionName={['invoiceTo']} onChange={handleChange} />
                        <InputHooks width='25%' type='date' title='from' required name='from' error={errors?.from} value={values?.from} onChange={handleChange} />
                        <InputHooks width='25%' type='date' title='todate' required name='todate' error={errors?.todate} value={values?.todate} onChange={handleChange} />
                        <Button style={{ border: '1px solid #ccc' }} onClick={() => console.log('object')}>Today</Button>
                        <Button style={{ border: '1px solid #ccc' }} onClick={() => console.log('object')}>Last 7 days</Button>
                        <Text width='min-content' size='30px'>{data?.filter(x => x.isPaid === false).length} / {data?.length || 0}  Invoice </Text>
                    </Options>
                    <ContentModal height={'90vh'}>
                        {data ? data?.filter(x => x.isPaid === false && x.invoiceTo === statePay?.Addtopay[0]?.invoiceTo).map(x => (
                            <CardInvoice key={x.id}>
                                <HeaderModal>
                                    <Text color={BColor} size='20px'>{x.eventName}</Text>
                                    <ButtonAdd bgColor='transparent' color={BGColor}
                                        onClick={() => handleClickAddInvoice(x)}>
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
                                        <BlueButton onClick={() => handlePayState(x)}>{'MARK PAYMENT NOW'}</BlueButton>
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


export const PendingToPay = ({ statePay }) => {
    return (
        <div>
            <ContentModal>
                {statePay ? statePay?.Addtopay?.map(x => (
                    <CardInvoice key={x.id}>
                        <HeaderModal>
                            <Text>{x.eventName}</Text>
                            <RippleButton bgColor='transparent' color={BGColor}
                                onClick={() => Handleremove(x)}>
                                <IconCancel size='15px' />
                            </RippleButton>
                        </HeaderModal>x
                    </CardInvoice>
                )) : <div>No data</div>}
            </ContentModal>
        </div>
    )
}

DashboardComp.propTypes = {

}

