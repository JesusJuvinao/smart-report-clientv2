import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import { PLVColor, PVColor, SCColor, SEGColor, TBGAColor, BGColor, TBGBColor, TBGDColor, TBGVColor, TFBColor, EColor } from '../../public/colors'
import { Text, Content, ContentTableItem, TableButton, ContainerStatements, } from './styled'
import Link from 'next/link'
export const ViewInvoiceItems = ({ data }) => {
    console.log(data)
    // return null
    return (
        <>
            {data !== {} && <div>
                <>
                    <Table
                        titles={[
                            { name: 'Agent Code', key: 'eventCommences', justify: 'flex-start', width: '7%' },
                            { name: 'balancedue', key: 'eventName', justify: 'flex-start', width: '7%' },
                            { name: 'Events Ref', key: 'eventRef', justify: 'flex-start', width: '7%' },
                            { name: 'Events Type', key: 'eventType', justify: 'flex-start', width: '7%' },
                            { name: 'eventsMonth', key: 'eventsMonth', justify: 'flex-start', width: '7%' },
                            { name: 'has Invoice Been Opened By Recipient', key: 'hasInvoiceBeenOpenedByRecipient', justify: 'flex-start', width: '7%' },
                            { name: 'has Invoice Been Sent', key: 'hasInvoiceBeenSent', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice Date', key: 'invoiceDate', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice From', key: 'invoiceFrom', justify: 'flex-start', width: '7%' },
                            { name: 'Invoice To', key: 'invoiceTo', justify: 'flex-start', width: '7%' },
                            { name: 'InvoiceTotal', key: 'invoiceTotal', justify: 'flex-start', width: '7%' },
                            { name: 'Is On Statement', key: 'isOnStatement', justify: 'flex-start', width: '7%' },
                            { name: 'Action', key: 'Action', justify: 'flex-start', width: '2fr' },
                        ]}
                        bgRow={2}
                        pointer
                        data={data?.lineItemsArray}
                        renderBody={(dataB, titles) => dataB?.map((x, i) => <Section bgRow={2} columnWidth={titles} key={i}>
                            {x?.newArray?.map(z => (
                                <Content key={z._id}>
                                    <Content>
                                        <Text>{z.agentCode}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.balancedue}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.bookingRef}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.bookingStatus}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.client}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.clientOwnerAtPurchaseDate}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.commissionRatePercent}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.commissionpayable}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.discountRate}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.discountTotal}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.discountedTotalDue}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.eventCommences}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.eventName}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.eventOwner}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.eventRef}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.eventType}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.ticketoption}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.ticketprice}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.ticketquantity}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.totaldue}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.totaldueCalc}</Text>
                                    </Content>
                                    <Content>
                                        <Text>{z.totalpaid}</Text>
                                    </Content>
                                </Content>
                            ))}
                        </Section>)}
                    />
                </>
            </div>}
        </>
    )
}
