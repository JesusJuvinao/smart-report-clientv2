import React, { useEffect, useState, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/hooks/useForm'
import { useRouter } from 'next/router'
import { EColor, PColor, TBGBColor, SFVColor } from '../../public/colors'
import { GET_ALL_INVOICES } from './queries'
import { useQuery, useMutation } from '@apollo/client'
import { orderColumn } from '../../components/Table/orderColumn'
import { useKeyPress } from '../../components/Table'
import { ContentHead } from './styled'
import { IS_PAY_INVOICE, IS_REDO_INVOICE } from '../../container/invoice/queries'
import { dateFormat, updateCache } from '../../utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import Tabs from '../../components/Tabs'
import { DocumentPdf } from './Document'
import { IconArrowBottom, IconArrowTop, IconDelete, IconDost, IconEdit, IconFolder, IconShowEye, IconPDF } from '../../public/icons'
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

export const DashboardComp = ({ idComp }) => {
    const router = useRouter()
    const name = router.query.name
    const [onchange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [active, setActive] = useState(1)
    const handleClick = index => setActive(index === active ? false : index)
    const { data } = useQuery(GET_ALL_INVOICES, { fetchPolicy: 'network-only', variables: { search: '' } })
    return (
        <Container>
            <Text margin='0 0 30px 0' size='30px'>Hello {name}</Text>
            <WrapperFilter>
                <Button shadow={true} active={active === 1} onClick={() => active !== 1 && handleClick(1)}>Invoice received: ({data ? data?.getAllCommissionInvoice?.length : 0})</Button>
                &nbsp;
                <Button shadow={true} active={active === 2} onClick={() => active !== 2 && handleClick(2)}> Sent bill ({data ? data?.getAllCommissionInvoice?.length : 0})</Button>
            </WrapperFilter>
            {active && active === 1 ? <InvoiceReceivedComponent /> : <SentBillComponent />}
            <Tabs>
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
            </Tabs>

        </Container>
    )
}

export const InvoiceReceivedComponent = () => {
    // Filtrar
    const { setAlertBox } = useContext(Context)
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const { data } = useQuery(GET_ALL_INVOICES, { fetchPolicy: 'network-only', variables: { search } })
    const [isPaidStateInvoice] = useMutation(IS_PAY_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isPaidStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoice } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES,
            nameFun: 'getAllCommissionInvoice',
            dataNew: getAllCommissionInvoice,
            type: 2

        })
    })
    const [isRedoStateInvoice] = useMutation(IS_REDO_INVOICE, {
        onCompleted: (data) => setAlertBox({ message: `${data?.isRedoStateInvoice?.message}`, duration: 8000, color: data.success ? 'success' : 'error' }),
        update: (cache, { data: { getAllCommissionInvoice } }) => updateCache({
            cache,
            query: GET_ALL_INVOICES,
            nameFun: 'getAllCommissionInvoice',
            dataNew: getAllCommissionInvoice,
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
    const setEdit = () => {
        console.log(0)
    }
    const handleUpdate = (data) => {
        console.log(data)
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
    // calculo
    const [height, setHeight] = useState(0)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()

    useEffect(() => {
        setHeight(refButton?.current?.clientHeight - refMenu?.current?.clientHeight)
        setHeightMenu(refMenu?.current?.clientHeight)
    }, [])
    return (
        <div>
            <InputHooks title='Filter.' width='50%' required disabled={false} value={search} onChange={handleChangeFilter} name='search' />
            <AwesomeModal useScroll={true} height='100vh' padding='10px' show={open} hideOnConfirm={false} title={` Invoice Name ${dataInvoice.eventName}`} onHide={() => setOpen(!open)} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <PageA4Format>
                    {<DocumentPdf invoice={dataInvoice} />}
                </PageA4Format>
            </AwesomeModal>{console.log(data?.getAllCommissionInvoice)}
            <FilterComponent
                titles={[
                    { name: 'eventName', arrow: true, key: 'eventName', width: '9%' },
                    { name: 'invoiceTo', arrow: true, key: 'invoiceTo', width: '9%' },
                    { name: 'invoiceFrom', arrow: true, key: 'invoiceFrom', width: '9%' },
                    { name: 'invoice_total', arrow: true, key: 'invoice_total', width: '9%' },
                    { name: 'totalDiscounts', arrow: true, key: 'totalDiscounts', width: '9%' },
                    { name: 'total_comm_due', arrow: true, key: 'total_comm_due', width: '9%' },
                    { name: 'total_sales_received', arrow: true, key: 'total_sales_received', width: '9%' },
                    { name: 'eventCommences', arrow: true, key: 'eventCommences', width: '9%' },
                    { name: 'uploaded', arrow: true, key: 'uploaded', width: '9%' },
                    { name: 'Company', arrow: true, key: 'Company', width: '9%' },
                    { name: 'Payment', arrow: true, key: 'Payment', width: '9%' }
                ]
                }
                data={data?.getAllCommissionInvoice}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state.selectedIndex ? `${TBGBColor}` : 'transparent' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }}
                >
                    <Wrapper>
                        <Text size='15px'>{elem.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceTo}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoiceFrom}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.invoice_total}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.totalDiscounts}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.total_comm_due}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.total_sales_received}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{dateFormat(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem.uploaded)}</Text>
                    </Wrapper>
                    <Circle active={elem?.isPaid}>
                        {elem.eventName?.slice(0, 2).toUpperCase() || null}
                    </Circle>
                    <Wrapper>
                        <Text size='15px' color={elem?.isPaid && PColor}> {elem?.isPaid ? 'Payment' : 'No Payment'}</Text>
                        <OptionsFunction show={show === elem}>
                            <Button height='auto' onClick={() => handleUpdate({ ...elem, cState: 0 })}><Text>Delete</Text></Button>
                            <Button height='auto' onClick={() => setEdit({ id: elem._id })} ><Text>Edit</Text></Button>
                            <Button height='auto' onClick={() => handlePayState({ id: elem._id })} ><Text>{!elem?.isPaid ? 'Mark Payment' : 'Mark No Payment'}</Text></Button>
                            <Button height='auto' onClick={() => handleClick({ ...elem })} ><Text>View</Text></Button>
                            <Button height='auto' onClick={() => handleRedoState({ id: elem._id })} ><Text>Redo invoice</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                    <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                        <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#CCC'} /></Button></div>
                    </WrapperButtonAction>
                </Section>)}
            />
        </div>
    )
}
export const SentBillComponent = () => {
    return (
        <div>
            Send
            {[1, 2, 3, 4, 5].map(x => (
                <Card direction='row' justify='space-between' key={x._id}>
                    Hi
                    <Circle>
                        ST
                    </Circle>
                </Card>
            ))}
        </div>
    )
}
const FilterComponent = ({ titles = [], data, renderBody = [] }) => {

    const [currentColumn, setCurrentColumn] = useState({})
    const [properties, setProperties] = useState({
        currentPage: 1,
        entriesValue: 20,
        pages: [],
        indexFirstElem: '',
        indexLastElem: ''
    })
    const [pages, setPages] = useState([])
    useEffect(() => {
        const allPages = Math.ceil(data?.length / properties.entriesValue)
        setPages([])
        for (let i = 0; i < allPages; i++) {
            setPages(s => [...s, i])
        }
        const indexLastElem = properties.currentPage * properties.entriesValue
        const indexFirstElem = indexLastElem - properties.entriesValue
        setProperties({ ...properties, indexLastElem, indexFirstElem })
    }, [properties.entriesValue, properties.currentPage, data])

    const handleEntries = event => {
        const { value } = event.target
        value >= 20 && setProperties({ ...properties, entriesValue: parseInt(value) })
    }
    // Handle para identificar columna seleccionada
    const handleColumn = (e, key) => {
        const { name, checked } = e.target
        setCurrentColumn({ [name]: checked ? 0 : 1, key })
    }
    const fileInputRef = React.useRef(null)

    const onTargetClick = e => {
        e.preventDefault()
        fileInputRef?.current?.click()
    }
    return (
        <div>
            <div>
                {(data?.length > 0) && <div>
                    <InputFilterNumber step={20} max={data?.length?.toString()} onChange={handleEntries} value={properties.entriesValue} type="number" />
                </div>}
                <ContentHead>
                    {titles?.map((x, i) => <div justify={x.justify} key={i}>
                        {x.arrow && <ArrowsLabel htmlFor={x.key}>
                            <InputHide type="checkbox" ref={fileInputRef} name={x.key} id={x.key} onChange={(e) => handleColumn(e, x.key)} />
                            <ArrowsLabel direction='row' htmlFor={x.key}>
                                <Text size={'12px'} onClick={onTargetClick}>{x.name}</Text>
                                <BoxArrow>
                                    <Button height='auto' padding='0' onClick={onTargetClick}><IconArrowTop size='15px' color={currentColumn?.[`${x.key}`] === 0 ? '#3a3945' : '#d0d7ec'} /></Button>
                                    <Button height='auto' padding='0' onClick={onTargetClick}><IconArrowBottom size='15px' color={currentColumn?.[`${x.key}`] === 1 ? '#3a3945' : '#d0d7ec'} /></Button>
                                </BoxArrow>
                            </ArrowsLabel>
                        </ArrowsLabel>}
                    </div>)}
                </ContentHead>
            </div>
            {data?.length > 0 ?
                renderBody(data?.filter((x, i) => ((i >= properties.indexFirstElem) && i < properties.indexLastElem))?.sort((prev, post) => orderColumn(prev, post, currentColumn)), titles, properties.indexFirstElem)
                : <Container style={{ height: '100vh', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}><IconFolder size='200px' /></Container>}
            <Pagination>
                <ButtonPagination onClick={() => setProperties(s => ({ ...properties, currentPage: properties.currentPage !== 1 ? s.currentPage - 1 : 1 }))}>Before</ButtonPagination>
                {pages.map(x => <Current current={(x + 1 === properties.currentPage && 'true')} onClick={() => setProperties({ ...properties, currentPage: x + 1 })} key={x}>{x + 1}</Current>)}
                <ButtonPagination onClick={() => setProperties(s => ({ ...properties, currentPage: s.currentPage !== pages.length ? s.currentPage + 1 : s.currentPage }))} >Next</ButtonPagination>
            </Pagination>
        </div>
    )
}



DashboardComp.propTypes = {

}

FilterComponent.propTypes = {
    titles: PropTypes.array,
    bgRow: PropTypes.number,
    buttonAdd: PropTypes.bool,
    data: PropTypes.array,
    handleAdd: PropTypes.func,
    pointer: PropTypes.bool,
    renderBody: PropTypes.func,
    labelBtn: PropTypes.string,
    entryPerView: PropTypes.bool || PropTypes.string,
    columnWidth: PropTypes.string

}
