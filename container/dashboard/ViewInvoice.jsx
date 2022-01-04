import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { AwesomeModal } from '../../components/AwesomeModal'
import { Loading } from '../../components/Loading'
import currencyFormatter from 'currency-formatter'
import styled, { css } from 'styled-components'
import { Section } from '../../components/Table/styled'
import { PLVColor, PVColor, SCColor, SEGColor, TBGAColor, BGColor, TBGBColor, TBGDColor, TBGVColor, TFBColor, EColor } from '../../public/colors'
import { Text, ContentTableItem, TableButton, ContainerStatements, } from './styled'
import Link from 'next/link'
import ActiveLink from '../../components/common/Link'
export const ViewInvoiceItems = ({ data }) => {
    // return null
    return (
        <>
            {data !== {} && <div>
                <Text margin='20px 0' size='30px' >{data?.eventName}</Text>
                <SectionRow bgRow={2} columnWidth={['4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%']}>
                    <Content padding={'0'} >
                        <Text> AgentCode</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Balance Due</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Booked On</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Booking Ref</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Booking Status</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text>Client</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> clientOwnerAtPurchaseDate</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Commission Rate Percent</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Commission payable</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Discount Rate</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text>Discount Total</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Discounted Total Due</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Event Commences</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Event Name</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text>event Owner</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Event Ref</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Event Type</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Ticket Option</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Ticket price</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Ticket Quantity</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Total Due</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Total Due Calc</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Total Paid</Text>
                    </Content>
                    <Content padding={'0'} >
                        <Text> Action</Text>
                    </Content>
                </SectionRow>
                {data?.lineItemsArray && data?.lineItemsArray?.map(x => x.newArray?.map((z, i) => (
                    <div key={z.id}>{console.log(z)}
                        <SectionRow bgRow={2} columnWidth={['4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%', '4%']} key={i}>
                            <Content padding={'0'} >
                                <Text> {z.agentCode}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.balancedue}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.bookedOn}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.bookingRef}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.bookingStatus}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.client}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.clientOwnerAtPurchaseDate}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.commissionRatePercent}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.commissionpayable}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.discountRate}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.discountTotal}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.discountedTotalDue}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventCommences}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventName}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventOwner}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventRef}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventType}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.ticketoption}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.ticketprice}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.ticketquantity}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.totaldue}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.totaldueCalc}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.totalpaid}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <ActiveLink href={`/view-tickets/${z._id}`} >
                                    <a>
                                        <Text> View</Text>
                                    </a>
                                </ActiveLink>
                            </Content>
                        </SectionRow>
                    </div>
                )))}
            </div>}
            <div>  {currencyFormatter.format(data?.invoiceTotal, { code: data.currency || 'GBP' })}</div>
        </>
    )
}
const SectionRow = styled.div`
   display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x} `) : '1fr'}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }
`
export const Content = styled.div`
    margin: auto;
    ${props => props.center && css`
    display: grid;
    place-content: center;
    `}
    ${({ padding }) => padding && css`padding: ${padding};`}
    padding: ${({ padding }) => padding || '20px 0px'};
    margin: auto;
    height: 100%;
    display: grid;
    place-content: center;
    border-right: 1px solid #cccccc7a;
    &:last-child {
        border-right: none;
    }
    `