import React, { useEffect, useState, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/hooks/useForm'
import { useRouter } from 'next/router'
import { EColor, PColor, TBGBColor, SFVColor, BColor, BGColor, PVColor } from '../../public/colors'
import { GET_ALL_INVOICES_RECEIVED, GET_ALL_INVOICES_SENT, HAS_BEEN_RECEIVED } from './queries'
import { useQuery, useMutation } from '@apollo/client'
import { orderColumn } from '../../components/Table/orderColumn'
import { Table, useKeyPress } from '../../components/Table'
import { IS_APPROVED_INVOICE_SENDER, IS_PAY_INVOICE, IS_REDO_INVOICE } from '../../container/invoice/queries'
import { dateFormat, updateCache } from '../../utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import Tabs from '../../components/Tabs'
import { DocumentPdf } from './Document'
import { IconArrowBottom, IconArrowTop, IconDelete, IconDost, IconEdit, IconFolder, IconShowEye, IconPDF, IconCancel, IconPlus } from '../../public/icons'
import { CardInvoice, Content, ContentHead, ContentListInvoice, ContentModal, HeaderModal, Options } from './styled'
import {
    Container,
    WrapperFilter,
    Button,
    Card,
    Text,
    Circle,
    Pagination,
    Wrapper,
    LineItems,
    OptionsFunction,
    WrapperButtonAction,
    Current,
    Section,
    ArrowsLabel,
    InputFilterNumber,
    BoxArrow,
    InputHide,
    ButtonPagination,
    PageA4Format
} from './styled'
import { Context } from '../../context'
import { useContext } from 'react'
import { Loading } from '../../components/Loading'
import { useUser } from '../Profile'
import { RippleButton } from '../../components/Ripple'
import { useSetState } from '../../components/hooks/useState'

export const DashboardComp = ({ idComp }) => {
    const router = useRouter()
    const name = router.query.name
    const { company } = useContext(Context)
    const [onchange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [active, setActive] = useState(1)
    const handleClick = index => setActive(index === active ? false : index)
    const { data, loading } = useQuery(GET_ALL_INVOICES_SENT, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
    const { data: DataReceived } = useQuery(GET_ALL_INVOICES_RECEIVED, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
    if (loading) return <Loading />
    return (
        <ContentListInvoice>
            <Text margin='0 0 30px 0' size='30px'>Hello {name}</Text>
            <WrapperFilter>
                <Button shadow={true} active={active === 1} onClick={() => active !== 1 && handleClick(1)}>Invoice received: ({DataReceived ? DataReceived?.getAllCommissionInvoiceReceived?.length : 0})</Button>
                &nbsp;
                <Button shadow={true} active={active === 2} onClick={() => active !== 2 && handleClick(2)}> Sent bill ({data ? data?.getAllCommissionInvoiceSent?.length : 0})</Button>
            </WrapperFilter>
            {active && active === 1 ? <InvoiceReceivedComponent /> : <SentBillComponent />}
            {/* <Tabs>
                <Tabs.Panel label="Tab label 1">
                    <>
                        Disrupt minimum viable product pivot waterfall is so 2000 and late viral
                        loasdupt sticky note user centered design Steve Jobs ideate
                        user story responsive.
                    </>
                </Tabs.Panel>
                <Tabs.Panel label="Tab label 1">
                    <>
                        asjhdkajhsd
                    </>
                </Tabs.Panel>
                <Tabs.Panel label="Tab label 1">
                    <>
                        Disrupt minimum viable product pivot waterfall is so 2000 and late viral
                        sssteve Jobs ideate
                        user story responsive.
                    </>
                </Tabs.Panel>
                <Tabs.Panel label="Tab label 1">
                    <>
                        hi
                    </>
                </Tabs.Panel>
            </Tabs> */}
        </ContentListInvoice>
    )
}

export const InvoiceReceivedComponent = () => {
    // Filtrar
    const { setAlertBox, company } = useContext(Context)
    const [search, setSearch] = useState('')
    const [dataUser] = useUser()

    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const { data, loading } = useQuery(GET_ALL_INVOICES_RECEIVED, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
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

    const handlePayState = async ({ id }) => {
        isPaidStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleRedoState = async ({ id }) => {
        isRedoStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleApprovedInvoiceState = async ({ id }) => {
        isApprovedByInvoiceSenderMutation({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
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


    return (
        <Container>
            <InputHooks title='Filter.' width='50%' required disabled={false} value={search} onChange={handleChangeFilter} name='search' />
            <AwesomeModal useScroll={true} height='100vh' padding='10px' show={open} hideOnConfirm={false} title={` Invoice Name ${dataInvoice.eventName}`} onHide={() => setOpen(!open)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <PageA4Format>
                    {<DocumentPdf invoice={dataInvoice} />}
                </PageA4Format>
            </AwesomeModal>
            <Table
                titles={[
                    { name: 'eventName', arrow: true, key: 'eventName', width: '10%' },
                    { name: 'invoiceTo', arrow: true, key: 'invoiceTo', width: '10%' },
                    { name: 'invoiceTotal', arrow: true, key: 'invoiceTotal', width: '10%' },
                    { name: 'totalDiscounts', arrow: true, key: 'totalDiscounts', width: '10%' },
                    { name: 'totalCommDue', arrow: true, key: 'totalCommDue', width: '10%' },
                    { name: 'totalSalesReceived', arrow: true, key: 'totalSalesReceived', width: '10%' },
                    { name: 'eventCommences', arrow: true, key: 'eventCommences', width: '10%' },
                    { name: 'uploaded', arrow: true, key: 'uploaded', width: '10%' },
                    { name: 'Payment', arrow: true, key: 'Payment', width: '10%' },
                    { name: 'Action', arrow: true, key: 'Action', width: '10%' }
                ]
                }
                data={data?.getAllCommissionInvoiceReceived}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section height={'90px'} padding='0' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${TBGBColor}` : 'transparent' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >
                    <Wrapper>
                        <Text size='15px'>{elem.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTo}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTotal}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalDiscounts}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalCommDue}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalSalesReceived}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{dateFormat(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem.uploaded)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px' color={elem?.isPaid && PColor}> {elem?.isPaid ? 'Payment' : 'No Payment'}</Text>
                        <OptionsFunction show={show === elem}>
                            <Button height='auto' onClick={() => handlePayState({ id: elem._id })} ><Text>{!elem?.isPaid ? 'Mark Payment' : 'Mark No Payment'}</Text></Button>
                            <Button height='auto' onClick={() => handleClick({ ...elem })} ><Text>View</Text></Button>
                            <Button height='auto' onClick={() => handleRedoState({ id: elem._id })} ><Text>Redo invoice</Text></Button>
                            <Button height='auto' onClick={() => handleApprovedInvoiceState({ id: elem._id })} ><Text>Change Approved InvoiceSender</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                    <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#CCC'} /></Button></div>
                    </WrapperButtonAction>
                </Section>)}
            />
        </Container>
    )
}
export const SentBillComponent = () => {
    const { setAlertBox, company } = useContext(Context)
    const { data } = useQuery(GET_ALL_INVOICES_SENT, { fetchPolicy: 'network-only', variables: { search: '', idComp: company.idLasComp && company.idLasComp } })
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

    const handlePayState = async ({ id }) => {
        isPaidStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleRedoState = async ({ id }) => {
        isRedoStateInvoice({ variables: { idInvoice: id, ToEmail: 'juvinaojesusd@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
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
    const invoicePayReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TO_PAY':
                return {
                    ...state,
                    Addtopay: [...state?.Addtopay, action?.payload]
                }
            case 'REMOVE_INVOICE':
                let deletedId = action.payload;
                state.Addtopay = state.Addtopay.filter((item) => deletedId !== item._id
                )
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
    const [idInvoice, setsetId] = useState('')
    const isConfirm = index => {
        handleClickShow(1)
        handlePayState({ id: idInvoice })
        setOpenModal(!openModal)
        setShow(false)

    }
    const handleClickAddInvoice = elem => {
        setsetId(elem._id)
        setOpenModal(!openModal)
        if (statePay.Addtopay.filter((x) => x.id !== elem._id)) {
            dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
        }
    }
    const addInvoice = elem => {
        dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
    }
    const handleMarckPayInvoice = () => {
        setOpenModal(!openModal)
        handleClickShow(true)
        showModalInvoice.setState(true)
    }
    return (
        <div>
            <AwesomeModal title='Have you only paid this bill?' zIndex='9999' padding='20px' height='200px' show={openModal} onHide={() => setOpenModal(!openModal)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <Options direction='row'>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 1 && isConfirm(1)}>Si</RippleButton>
                    <RippleButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 2 && handleMarckPayInvoice()}>No</RippleButton>
                </Options>
            </AwesomeModal>
            {active.state && <ModalAddInvoicePaymentState handleClickAddInvoice={addInvoice} data={data?.getAllCommissionInvoiceSent} showModalInvoice={showModalInvoice} dispatchInvoice={dispatchInvoice} statePay={statePay} />}
            <Table
                titles={[
                    { name: 'eventName', arrow: true, key: 'eventName', width: '10%' },
                    { name: 'invoiceTo', arrow: true, key: 'invoiceTo', width: '10%' },
                    { name: 'invoiceTotal', arrow: true, key: 'invoiceTotal', width: '10%' },
                    { name: 'totalDiscounts', arrow: true, key: 'totalDiscounts', width: '10%' },
                    { name: 'totalCommDue', arrow: true, key: 'totalCommDue', width: '10%' },
                    { name: 'totalSalesReceived', arrow: true, key: 'totalSalesReceived', width: '10%' },
                    { name: 'eventCommences', arrow: true, key: 'eventCommences', width: '10%' },
                    { name: 'uploaded', arrow: true, key: 'uploaded', width: '10%' },
                    { name: 'Payment', arrow: true, key: 'Payment', width: '10%' },
                    { name: 'Action', arrow: true, key: 'Action', width: '10%' }
                ]
                }
                data={data?.getAllCommissionInvoiceSent?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${TBGBColor}` : 'transparent' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >
                    <Wrapper>
                        <Text size='15px'>{elem.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTo}</Text>
                    </Wrapper>

                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTotal}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalDiscounts}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalCommDue}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalSalesReceived}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.eventCommences !== null && dateFormat(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem.uploaded)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px' color={elem?.isPaid && PColor}> {elem?.isPaid ? 'Payment' : 'No Payment'}</Text>
                    </Wrapper>
                    <Wrapper>
                        <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                            <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#000'} /></Button></div>
                        </WrapperButtonAction>
                        <OptionsFunction show={show === elem}>
                            <Button height='auto' onClick={() => handleClick({ ...elem })} ><Text>View</Text></Button>
                            <Button height='auto' onClick={() => handleRedoState({ id: elem._id })} ><Text>Redo invoice</Text></Button>
                            <Button onClick={() => handleClickAddInvoice(elem)}> <Text>{!elem?.isPaid ? 'Mark Payment' : 'Mark No Payment'}</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                </Section>)}
            />
        </div>
    )
}
export const ModalAddInvoicePaymentState = ({ showModalInvoice, statePay, dispatchInvoice, data, handleClickAddInvoice }) => {
    const sumTotal = arr => arr && arr?.reduce((sum, { invoiceTotal }) => sum + invoiceTotal, 0)
    const totalInvoice = sumTotal(statePay.Addtopay)
    console.log(totalInvoice, 'PERO QUE PASA CHAVALES')
    return (
        <div>
            <AwesomeModal zIndex='99999' padding='20px' height='100vh' show={showModalInvoice.state} onHide={() => showModalInvoice.setState(false)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <ContentModal>
                    {statePay ? statePay?.Addtopay?.map(x => (
                        <CardInvoice key={x.id}>
                            <HeaderModal>
                                <Text>{x.eventName}</Text>
                                <RippleButton bgColor='transparent' color={BGColor}
                                    onClick={() => dispatchInvoice({ type: 'REMOVE_INVOICE', payload: x.id })}>
                                    <IconCancel size='15px' />
                                </RippleButton>
                            </HeaderModal>
                        </CardInvoice>
                    )) : <div>No data</div>}

                </ContentModal>
                <ContentModal>
                    {data ? data?.map(x => (
                        <CardInvoice key={x.id}>
                            <HeaderModal>
                                <Text>{x.eventName}</Text>
                                <RippleButton bgColor='transparent' color={BGColor}
                                   onClick={() => handleClickAddInvoice(x)}>
                                    <IconPlus color={PVColor} size='25px' />
                                </RippleButton>
                            </HeaderModal>
                        </CardInvoice>
                    )) : <div>No data</div>}
                </ContentModal>
            </AwesomeModal>
        </div>
    )
}

DashboardComp.propTypes = {

}