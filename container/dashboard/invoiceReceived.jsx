import { useState } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Overline } from '../../components/common/Reusable'
import { LazyLoading, SpinnerColorJust } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import { Table } from '../../components/Table'
import { AwesomeModal } from '../../components/AwesomeModal'
import { IconCancel, IconDost } from '../../public/icons'
import { ContentTableItem } from '../CommissionStatement/styled'
import { dateFormat, NewDateFormat } from '../../utils'
import { EColor, PColor, SVColor, SFVColor, BColor, BGColor, PVColor, APColor, BGAColor, PLColor, SCColor, TBGAColor, TBGBColor, TBGVColor } from '../../public/colors'
import { DocumentPdf } from './Document'
import ActiveLink from '../../components/common/Link'
import { Anchor } from '../invoice/styled'
import { Container, WrapperFilter, Button, Card, Text, Circle, Wrapper, AnchorLink, LineItems, OptionsFunction, WrapperButtonAction, Current, ArrowsLabel, TableButton, InputFilterNumber, BoxArrow, InputHide, ButtonPagination, PageA4Format, DownLoadButton, Options, BlueButton, Toast, PaymentStatus, Clip } from './styled'
import { Section } from '../../components/Table/styled'
import { generatePdfDocumentInvoice } from '../invoice/PdfInvoice'
import { ViewInvoiceItems } from './ViewInvoice'

export const InvoiceReceived = ({ data, setShowMore, showInvoice, setShow, showDataToday, dispatch, handleChangeCheck, handleClickAddInvoice, dataInvoice, currencyFormatter, setOpen, disabledItems, openModal, state, checkedItems, openModalO, showMore, loading, invoicePayReducer, openModalPay, selectAll, clearAll, toggleAll, loadingApprove, createInvoicePaymentMutation, isPaidStateInvoice, show, isApprovedByInvoiceSenderMutation, handleClickchangePayAndApprove, handleApprovedInvoiceState, isRedoStateInvoice, handlePayState, handleRedoState }) => {
    const [modalLineItems, setModalLineItems] = useState(false)
    const [dataInvoiceLine, setDataInvoice] = useState({})
    const handleOpenLineItems = data => {
        setModalLineItems(true)
        setDataInvoice(data)
    }
    return (
        <div>
            <Toast open={checkedItems?.size > 1}>
                <Text size='15px'  >  {checkedItems?.size} Object selected </Text>
                <DownLoadButton onClick={selectAll}>Select All</DownLoadButton>
                <DownLoadButton onClick={clearAll}>Clear All</DownLoadButton>
                <DownLoadButton onClick={toggleAll}>Toggle All</DownLoadButton>
                <DownLoadButton style={{ border: 'none' }} onClick={clearAll}><IconCancel size='20px' color={BGColor} /></DownLoadButton>
            </Toast>
            <Table
                titles={[
                    { justify: 'center', name: '#', width: '2%' },
                    { justify: 'center', name: 'Event Commences', arrow: true, key: 'eventCommences', width: '7%' },
                    { justify: 'center', name: 'Event Name', arrow: true, key: 'eventName', width: '7%' },
                    { justify: 'center', name: 'Invoice From', arrow: true, key: 'invoiceTo', width: '7%' },
                    { justify: 'center', name: 'Invoice Total', arrow: true, key: 'invoiceTotal', width: '7%' },
                    { justify: 'center', name: 'Total Discounts', arrow: true, key: 'totalDiscounts', width: '7%' },
                    { justify: 'center', name: 'Total Commission', arrow: true, key: 'totalCommDue', width: '7%' },
                    { justify: 'center', name: 'Total Gross Sales', arrow: true, key: 'totalSalesReceived', width: '7%' },
                    { justify: 'center', name: 'Date Received', width: '7%' },
                    { justify: 'center', name: 'Pay Invoice', width: '7%' },
                    { justify: 'center', name: 'Approve Invoice', width: '7%' },
                    { justify: 'center', name: 'View', width: '1fr' },
                    { justify: 'center', name: 'Action', width: '1fr' },
                ]
                }
                bgRow={2}
                pointer
                data={data?.getAllCommissionInvoiceReceived?.filter(x => x.bDescription !== 0 && x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section bgRow={1} padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state?.selectedIndex ? `${SVColor}` : 'transparent', borderBottom: 'border-bottom: 1px solid rgba(0, 0, 0, 0.05)' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    }
                }} >
                    <Wrapper>
                        <Text>{i + 1}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {(elem.eventCommences)}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{elem?.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem?.invoiceFrom}</Text>
                    </Wrapper>

                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem?.invoiceTotal), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem?.totalDiscounts), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{currencyFormatter.format((elem.totalCommDue), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {currencyFormatter.format((elem.totalSalesReceived), { code: elem?.currency ? elem?.currency : 'GBP' })}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {dateFormat(elem?.uploaded)}</Text>
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
                        <ContentTableItem padding='0px' direction='row'>
                            <TableButton backgroundColor={TBGAColor} color={SCColor} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { getOneCommissionInvoice: elem } })}>
                                Download
                            </TableButton>
                            <TableButton backgroundColor={TBGBColor} color={PVColor}>
                                <ActiveLink activeClassName="active" href={`/invoice/${elem._id}`}>
                                    <AnchorLink>
                                        View
                                    </AnchorLink>
                                </ActiveLink>
                            </TableButton>
                            <TableButton backgroundColor={TBGBColor} color={APColor} onClick={() => handleOpenLineItems(elem)}>
                                view tickets
                            </TableButton>
                        </ContentTableItem>
                    </Wrapper>
                    <Wrapper justifyContent='start'>
                        <ContentTableItem>
                            <TableButton backgroundColor={TBGBColor} color={APColor} onClick={() => handleRedoState(elem)}>
                                {elem.isRedo === false ? 'No Redo' : 'Redo'}
                            </TableButton>
                            {elem.isApprovedByInvoiceSender === true || elem.isRedo === false && <TableButton backgroundColor={TBGBColor} color={!elem?.isPaid ? EColor : APColor} onClick={() => handleClickAddInvoice(elem)}>
                                {!elem?.isPaid ? 'Mark Paid' : 'Mark Unpaid'}
                            </TableButton>}
                            <TableButton backgroundColor={!elem.isApprovedByInvoiceSender ? `${EColor}69` : TBGBColor} color={!elem.isApprovedByInvoiceSender ? EColor : APColor} onClick={() => handleApprovedInvoiceState(elem)}>
                                {elem.isApprovedByInvoiceSender ? 'Mark as not Approved' : 'Mark approved'}
                            </TableButton>
                        </ContentTableItem>
                    </Wrapper>
                </Section>)}
            />
            <AwesomeModal
                show={modalLineItems}
                backdrop
                onHide={() => setModalLineItems(false)}
                onCancel={() => false}
                btnCancel={false}
                btnConfirm={false}
                header={true}
                size="large"
                title='Invoice Stements From'
                height='60vh'
                width='100%'
                footer={false}
            >
                <ViewInvoiceItems
                    data={dataInvoiceLine}
                />
            </AwesomeModal>
            {/* <Pagination value={showMore} range={data?.getAllCommissionInvoiceSent?.length || 100} onChange={setShowMore} /> */}
            {<BlueButton onClick={() => setShowMore(s => s + 10)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}
        </div>
    )
}