import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from '../../components/Table'
import { Container, Content, Text, ContentTableItem, TableButton } from './styled'
import { Section } from '../../components/Table/styled'
import Link from 'next/link'
import { PVColor, SCColor, TBGBColor, TBGVColor, TFBColor, TBGAColor } from '../../public/colors'
import { generatePdfTicket } from './PdfInvoiceStatement'

export const ViewTickes = ({ setAlertBox }) => {
    const handlePreview = (data) => {
    }

    const handleRedoStateStatementFrom = (data) => {
    }

    return (
        <Container>
            <Table
                titles={[
                    { name: '#', key: '', key: 'emailedDate', justify: 'flex-start', width: '2%' },
                    { name: 'Emailed Date', key: 'emailedDate', justify: 'flex-start', width: '6%' },
                    { name: 'Events Month', key: 'eventsMonth', justify: 'flex-start', width: '6%' },
                    { name: 'Invoice Type', key: 'invoiceType', justify: 'flex-start', width: '6%' },
                    { name: 'Statement Date', key: 'statementDate', justify: 'flex-start', width: '6%' },
                    { name: 'Statement From', key: 'statementFrom', justify: 'flex-start', width: '6%' },
                    { name: 'Statement To', key: 'statementTo', justify: 'flex-start', width: '6%' },
                    { name: 'Statement To Email', key: 'statementToEmail', justify: 'flex-start', width: '6%' },
                    { name: 'Commission Payable ToYou', key: 'totalCommissionPayableToYou', justify: 'flex-start', width: '6%' },
                    { name: 'Gross Sales', key: 'totalGrossSalesReceivedByYou', justify: 'flex-start', width: '6%' },
                    { name: 'VATOnComms', key: 'totalVATOnComms', justify: 'center', width: '6%' },
                    { name: 'Discounts', key: 'totalDiscounts', justify: 'center', width: '6%' },
                    { name: 'Amount To Pay', key: 'totalAmountToPay', justify: 'center', width: '6%' },
                    { name: 'View', justify: 'center', width: '1fr' },
                    { name: 'Action', justify: 'center', width: '1fr' }
                ]}
                bgRow={2}
                pointer
                // data={data?.filter(x => x.pName !== 0 && x)}
                data={[1, 2, 3, 4, 5, 6]}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section bgRow={2} columnWidth={titles} key={i}>
                    <Content>
                        <Text> {i + 1}</Text>
                    </Content>
                    <Content>
                        <Text> {x.emailedDate}</Text>
                    </Content>
                    <Content>
                        <Text> {x.eventsMonth}</Text>
                    </Content>
                    <Content>
                        <Text> {x.invoiceType}</Text>
                    </Content>
                    <Content>
                        <Text> {x.statementDate}</Text>
                    </Content>
                    <Content>
                        <Text> {x.statementFrom}</Text>
                    </Content>
                    <Content>
                        <Text> {x.statementTo}</Text>
                    </Content>
                    <Content>
                        <Text> {x.statementToEmail}</Text>
                    </Content>
                    <Content>
                        <Text> {x.totalCommissionPayableToYou}</Text>
                    </Content>
                    <Content>
                        <Text> {x.totalGrossSalesReceivedByYou}</Text>
                    </Content>
                    <Content>
                        <Text> {x.totalVATOnComms}</Text>
                    </Content>
                    <Content>
                        <Text> {x.totalDiscounts}</Text>
                    </Content>
                    <Content>
                        <Text> {x.totalAmountToPay}</Text>
                    </Content>
                    <Content>
                        <ContentTableItem padding='0px' direction='row'>
                            <TableButton backgroundColor={TBGAColor} color={SCColor} onClick={() => generatePdfTicket({ dataInvoice: { ...x } })}>
                                Download
                            </TableButton>
                            <TableButton backgroundColor={TBGBColor} color={PVColor} onClick={() => handlePreview(x)}>
                                View
                            </TableButton>
                        </ContentTableItem>
                    </Content>
                    <Content>
                        <ContentTableItem padding='0px' direction='row'>
                            <TableButton backgroundColor={TBGBColor} color={TFBColor} onClick={() => handleRedoStateStatementFrom(x)}>
                                Redo Invoice
                            </TableButton>
                            <TableButton backgroundColor={TBGBColor} color={TFBColor} onClick={() => handlePreview(x)}>
                                Share
                            </TableButton>
                            <TableButton backgroundColor={TBGBColor} color={TFBColor} onClick={() => console.log(x)}>
                                Aprove Statement
                            </TableButton>
                            <Link href={'/invoice/commission-statement/create'}>
                                <TableButton backgroundColor={TBGVColor} color={TFBColor}>
                                    Add
                                </TableButton>
                            </Link>
                        </ContentTableItem>
                    </Content>
                </Section>)}
            />
        </Container>
    )
}

ViewTickes.propTypes = {
    setAlertBox: PropTypes.func
}
