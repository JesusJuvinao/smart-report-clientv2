import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Checkbox } from '../../components/Checkbox'
import { Overline } from '../../components/common/Reusable'
import { LazyLoading, SpinnerColorJust } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import { Table } from '../../components/Table'
import { Context } from '../../context'
import { IconCancel, IconDost } from '../../public/icons'
import { DocumentPdf } from './Document'
import { CREATE_COMMISSION_PAY } from './queries'
import { Container, WrapperFilter, Button, Card, Text, Circle, Wrapper, LineItems, OptionsFunction, WrapperButtonAction, Current, Section, ArrowsLabel, InputFilterNumber, BoxArrow, InputHide, ButtonPagination, PageA4Format, DownLoadButton, Options, BlueButton, Toast, PaymentStatus, Clip } from './styled'


export const SentBillComponent = ({ data, setShowMore, showMore, loading, createInvoicePaymentMutation, isPaidStateInvoice, isApprovedByInvoiceSenderMutation, handleClickchangePayAndApprove, handleApprovedInvoiceState, isRedoStateInvoice, handlePayState, handleRedoState }) => {
    // STATES
    const { setAlertBox, company } = useContext(Context)
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [openModalO, setOpenModalO] = useState(false)
    const [dataInvoice, setDataInvoice] = useState({})
    // QUETYS
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
    const handleClickModalAlert = index => setOpenModalO(index === openModalO ? false : index)
    const [isApprovedByInvoiceSenderMutation, { loading: loadingApprove }] = useMutation(IS_APPROVED_INVOICE_SENDER, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isApprovedByInvoiceSenderMutation?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoiceReceived } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES_SENT,
            nameFun: 'getAllCommissionInvoiceReceived',
            dataNew: getAllCommissionInvoiceReceived,
            type: 2

        })
    })
    const handleClickchangePayAndApprove = async () => {
        await isApprovedByInvoiceSenderMutation({ variables: { idInvoice: dataInvoice._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        await isPaidStateInvoice({ variables: { idInvoice: dataInvoice._id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }
    const handleApprovedInvoiceState = async data => {
        if (data.isPaid === true) {
            const { agentDetails, _id } = data || {}
            const { agentEmail } = agentDetails || {}
            isApprovedByInvoiceSenderMutation({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        } else {
            setDataInvoice(data)
            handleClickModalAlert(1)
            setAlertBox({ message: 'The invoice is not marked as paid, select the invoice as paid.', duration: 8000, color: 'warning' })
        }
    }
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
        isPaidStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        setOpenModalO(!openModalO)
    }
    const handleRedoState = async data => {
        const { agentDetails, _id } = data || {}
        const { agentEmail } = agentDetails || {}
        isRedoStateInvoice({ variables: { idInvoice: _id, ToEmail: 'odavalencia002@gmail.com', uEmail: 'odavalencia002@gmail.com' } }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
    }

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
    const [openModalPay, setOpenModalPay] = useState(false)
    const handleClickAddInvoice = elem => {
        setDataInv(elem)
        if (elem.isPaid) {
            setOpenModalPay(true)
            // setDataInvoice(elem)
            handlePayState(elem)
        } else {
            let includes = statePay?.Addtopay.includes(elem);
            if (includes) {
                setAlertBox({ message: 'The invoice is already added to the list' })
            } else {
                setOpenModal(!openModal)
                dispatchInvoice({ type: 'ADD_TO_PAY', payload: elem })
            }
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
    const { checkedItems, disabledItems, handleChangeCheck, toggleAll, selectAll, clearAll } = useCheckboxState(data?.getAllCommissionInvoiceSent, [0], [0]);
    console.log(checkedItems)
    return (
        <div>
            <Toast open={checkedItems?.size > 1}>
                <Text size='15px'  >  {checkedItems?.size} Object selected </Text>
                <DownLoadButton onClick={selectAll}>Select All</DownLoadButton>
                    <DownLoadButton onClick={clearAll}>Clear All</DownLoadButton>
                <DownLoadButton onClick={toggleAll}>Toggle All</DownLoadButton>
                <DownLoadButton style={{ border: 'none' }} onClick={clearAll}><IconCancel size='20px' color={BGColor} /></DownLoadButton>
            </Toast>
            {loadingApprove && <LazyLoading bgColor={`${PLColor}69`} />}
            <Overline show={show} onClick={() => setShow(!show)} />
            <AwesomeModal zIndex='9999' padding='20px' height='200px' show={openModalO || openModalPay} onHide={() => !openModalPay ? setOpenModalO(!openModalO) : setOpenModalPay(!openModalPay)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <Text size='20px' color={BColor}>Necessary action!</Text>
                <Text size='30px' wrap='wrap' color={BColor}>Do you want to mark the invoice as paid?</Text>
                <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleClickchangePayAndApprove()}>Yes</RippleButton>
                OR
                <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => { showModalInvoice.setState(true), handleClickShow(1) }}>Add More invoice</RippleButton>
            </AwesomeModal >
            <AwesomeModal useScroll={true} height='100vh' padding='10px' show={open} hideOnConfirm={false} title={` Invoice Name ${dataInvoice.eventName}`} onHide={() => setOpen(!open)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <PageA4Format>
                    {<DocumentPdf invoice={dataInvoice} />}
                </PageA4Format>
            </AwesomeModal>
            <AwesomeModal title='Have you only paid this bill?' zIndex='9999' padding='20px' height='200px' show={openModal} onHide={() => setOpenModal(!openModal)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <Options style={{ position: 'absolute', left: '7px', bottom: '49px' }} direction='row'>
                    <BlueButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 1 && isConfirm(1)}>Yes</BlueButton>
                    <BlueButton margin='0px 10px 0px 0px' border='60px' color={BColor} widthButton='150px' bgColor={'#e2e8f0'} family='PFont-Regular' onClick={() => active.state !== 2 && handleMarckPayInvoice()}>No</BlueButton>
                </Options>
            </AwesomeModal>
            <Table
                titles={[
                    { name: '', width: '8%' },
                    { name: 'Event Commences', arrow: true, key: 'eventCommences', width: '8%' },
                    { name: 'Event Name', arrow: true, key: 'eventName', width: '8%' },
                    { name: 'Invoice From', arrow: true, key: 'invoiceTo', width: '8%' },
                    { name: 'Invoice Total', arrow: true, key: 'invoiceTotal', width: '8%' },
                    { name: 'Total Discounts', arrow: true, key: 'totalDiscounts', width: '8%' },
                    { name: 'Total Commission', arrow: true, key: 'totalCommDue', width: '8%' },
                    { name: 'Total Gross Sales', arrow: true, key: 'totalSalesReceived', width: '8%' },
                    { name: 'Date Received', width: '8%' },
                    { name: 'Pay Invoice', width: '8%' },
                    { name: 'Approve Invoice', width: '8%' },
                    { name: 'Action', width: '8%' }
                ]
                }
                data={data?.getAllCommissionInvoiceSent?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section bgRow={1} padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${SVColor}` : 'transparent', borderBottom: 'border-bottom: 1px solid rgba(0, 0, 0, 0.05)' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >
                    <Wrapper>
                        <Checkbox
                            id={elem}
                            // label={`${i + 1}`}
                            disabled={disabledItems.has(elem)}
                            checked={checkedItems.has(elem)}
                            onChange={handleChangeCheck}
                        />
                        {/* <BlueButton onClick={() => disableCheckboxes(elem)}>disable</BlueButton>
                        <BlueButton onClick={() => enableCheckboxes(elem)}>enable</BlueButton> */}
                    </Wrapper>
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
                            <Clip active={elem.isPaid}>
                                <div className="chip">
                                    <div className="chip-content" activebg={elem?.isPaid} > <Text size='15px' color={elem?.isPaid && '#26af48 !important'}> {elem?.isPaid ? 'Paid' : 'No Payment'}</Text></div>
                                </div>
                            </Clip>
                        </PaymentStatus>
                    </Wrapper>
                    <Wrapper>
                        <PaymentStatus onClick={() => handleApprovedInvoiceState(elem)} active={elem?.isApprovedByInvoiceSender} >
                            <Clip>
                                <div className="chip">
                                    <div className="chip-content" > <Text size='15px' color={elem?.isApprovedByInvoiceSender ? '#26af48 !important' : '#e63c3c !important'}> {elem?.isApprovedByInvoiceSender ? 'Approved' : 'No Approved'}</Text></div>
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
            {/* <Pagination value={showMore} range={data?.getAllCommissionInvoiceSent?.length || 100} onChange={setShowMore} /> */}
            {data?.getAllCommissionInvoiceSent && <BlueButton onClick={() => setShowMore(s => s + 100)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}

        </div>
    )
}