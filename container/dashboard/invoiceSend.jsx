import { Checkbox } from '../../components/Checkbox'
import { Overline } from '../../components/common/Reusable'
import { LazyLoading, SpinnerColorJust } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import { Table } from '../../components/Table'
import { AwesomeModal } from '../../components/AwesomeModal'
import { IconCancel, IconDost } from '../../public/icons'
import { dateFormat } from '../../utils'
import { DocumentPdf } from './Document'
import { EColor, PColor, SVColor, SFVColor, BColor, BGColor, PVColor, APColor, BGAColor, PLColor } from '../../public/colors'
import ActiveLink from '../../components/common/Link'
import { Container, WrapperFilter, Button, Card, Text, Circle, Wrapper, LineItems, OptionsFunction, WrapperButtonAction, Current, Section, ArrowsLabel, InputFilterNumber, BoxArrow, InputHide, ButtonPagination, PageA4Format, DownLoadButton, Options, BlueButton, Toast, PaymentStatus, Clip, AnchorLink } from './styled'

export const SentBillComponent = ({ data, setShowMore, showInvoice, setShow, showDataToday, dispatch, handleChangeCheck, handleClickAddInvoice, dataInvoice, currencyFormatter, setOpen, disabledItems, openModal, state, checkedItems, openModalO, showMore, loading, invoicePayReducer, openModalPay, selectAll, clearAll, toggleAll, loadingApprove, createInvoicePaymentMutation, isPaidStateInvoice, show, isApprovedByInvoiceSenderMutation, handleClickchangePayAndApprove, handleApprovedInvoiceState, isRedoStateInvoice, handlePayState, handleRedoState }) => {
    return (
        <div>
            <Toast open={checkedItems?.size > 1}>
                <Text size='15px'> {checkedItems?.size} Object selected </Text>
                <DownLoadButton onClick={selectAll}>Select All</DownLoadButton>
                <DownLoadButton onClick={clearAll}>Clear All</DownLoadButton>
                <DownLoadButton onClick={toggleAll}>Toggle All</DownLoadButton>
                <DownLoadButton style={{ border: 'none' }} onClick={clearAll}><IconCancel size='20px' color={BGColor} /></DownLoadButton>
            </Toast>
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
                bgRow={2}
                pointer
                entryPerView
                buttonAdd={false}
                data={data?.getAllCommissionInvoiceSent?.filter(x => showInvoice ? x.isPaid === true : x)}
                renderBody={(dataB, titles) => dataB?.map((elem, i) => <Section bgRow={1} padding='1% 20px' onClick={e => { dispatch({ type: 'select', payload: i }) }} style={{ cursor: 'pointer', backgroundColor: i === state?.selectedIndex ? `${SVColor}` : 'transparent', borderBottom: 'border-bottom: 1px solid rgba(0, 0, 0, 0.05)' }} radius='3px' tabIndex={0} columnWidth={titles} key={i} onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        dispatch({ type: 'select', payload: i })
                        e.target.blur()
                    } }}>
                    <Wrapper>
                        <Checkbox id={elem} disabled={disabledItems.has(elem)} checked={checkedItems.has(elem)} onChange={handleChangeCheck} />
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem.eventCommences}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'>{elem?.eventName}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text size='15px'> {elem?.invoiceTo}</Text>
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
                        <WrapperButtonAction style={{ display: 'flex', justifyContent: 'flex-end', width: 'min-content' }}>
                            <div style={{ display: 'contents' }}><Button onClick={() => setShow(elem === show ? false : elem)}><IconDost size={30} color={show === elem ? PColor : '#000'} /></Button></div>
                        </WrapperButtonAction>
                        <OptionsFunction show={show === elem}>
                            <ActiveLink activeClassName="active" href={`/invoice/${elem._id}`}>
                                <AnchorLink>
                                    <Button border height='auto'><Text size='1.1em'>View Invoice</Text></Button>
                                </AnchorLink>
                            </ActiveLink>
                            <Button border height='auto' onClick={() => handleRedoState(elem)} ><Text size='1.1em'>Redo invoice</Text></Button>
                            {elem.isApprovedByInvoiceSender === true && <Button border onClick={() => handleClickAddInvoice(elem)}> <Text size='1.1em'>{!elem?.isPaid ? 'Mark Paid' : 'Mark Unpaid'}</Text></Button>}
                            <Button border onClick={() => handleApprovedInvoiceState(elem)}> <Text size='1.1em'>{elem.isApprovedByInvoiceSender ? 'Mark as not Approved' : 'Mark approved'}</Text></Button>
                        </OptionsFunction>
                    </Wrapper>
                </Section>)}
            />
            {/* <Pagination value={showMore} range={data?.getAllCommissionInvoiceSent?.length || 100} onChange={setShowMore} /> */}
            {<BlueButton style={{ width: '100%' }} onClick={() => setShowMore(s => s + 200)}>{loading ? <SpinnerColorJust /> : 'Load more'}</BlueButton>}
        </div>
    )
}