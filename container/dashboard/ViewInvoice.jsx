import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { AwesomeModal } from '../../components/AwesomeModal'
import { LazyLoading, SpinnerColor, SpinnerColorJust } from '../../components/Loading'
import currencyFormatter from 'currency-formatter'
import styled, { css } from 'styled-components'
import { Section } from '../../components/Table/styled'
import { PLVColor, PVColor, SCColor, SEGColor, TBGAColor, BGColor, TBGBColor, TBGDColor, TBGVColor, TFBColor, EColor } from '../../public/colors'
import { Text, ContentTableItem, TableButton, ContainerStatements, CardDevice, Header, } from './styled'
import Link from 'next/link'
import ActiveLink from '../../components/common/Link'
export const ViewInvoiceItems = ({ ArrayTicket, totalEventSalesByTicketTypeParsed, infoInvoice, loading }) => {
    console.log(ArrayTicket)
    const arrayTicketTitle = [
        {
            title: 'Booked On',

        },
        {
            title: 'Booking Ref',
        },
        {
            title: 'Booked Status',

        },
        {
            title: 'Client',
        },
        {
            title: 'clientOwnerAtPurchaseDate',

        },
        {
            title: 'Commission Rate Percent',

        },
        {
            title: ' Commission payable',

        },
        {
            title: ' Commission payable',

        },
        {
            title: 'Discount Total',
        },
        {
            title: 'Event Name',
        },
        {
            title: 'Event Ref',
        },
        {
            title: 'Event Type',
        },
        {
            title: 'Ticket Option',
        },
        {
            title: 'Ticket price',
        },
        {
            title: 'Ticket Quantity',
        },
        {
            title: 'Total Due',
        },
        {
            title: 'Event Name',
        },
        {
            title: 'Total Paid',
        },
        {
            title: 'Action',
        }
    ]
    const { eventName, eventRef, eventType, invoiceFrom, invoiceRef, eventCommences } = infoInvoice || {}
    return (
        <>
            {ArrayTicket !== {} && <div>
               {/* {loading && <SpinnerColorJust />} */}
                <Header>
                    <Text color={BGColor} margin='20px 0' size='30px' >{eventName}</Text>
                    <Text color={BGColor} margin='5px 0' size='20px' >Ref:  {eventRef}</Text>
                    <Text color={BGColor} margin='5px 0' size='20px' >invoiceFrom:  {invoiceFrom}</Text>
                    <Text color={BGColor} margin='5px 0' size='20px' >eventType:  {eventType}</Text>
                </Header>
                <SectionRow bgRow={2} columnWidth={['5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%']}>
                    {arrayTicketTitle?.map(ticketTitle => (
                        <Content key={ticketTitle._id} padding={'0'} >
                            <Text>{ticketTitle.title}</Text>
                        </Content>
                    ))}
                </SectionRow>
                {ArrayTicket && ArrayTicket?.newArray?.map((z, i) => (
                    <div key={z.id}>
                        <SectionRow bgRow={2} columnWidth={['5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%', '5%']} key={i}>
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
                                <Text> {z.discountTotal}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.discountedTotalDue}</Text>
                            </Content>
                            <Content padding={'0'} >
                                <Text> {z.eventName}</Text>
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
                                <ActiveLink href={`/view-tickets/${z.eventName}`} >
                                    <a>
                                        <Text> View</Text>
                                    </a>
                                </ActiveLink>
                            </Content>
                        </SectionRow>
                    </div>
                ))}
                {totalEventSalesByTicketTypeParsed ? totalEventSalesByTicketTypeParsed?.map(ticketOption => (
                    <CardDevice key={ticketOption._id}>
                        <span className='device__icon'>
                            TICKET
                        </span>
                        <div class="device__info">
                            <div class="device__description-wrapper">
                                <span class="device__description"> {ticketOption.ticketOption}</span>
                                <span class="device__description">{ticketOption.totalSales} </span>
                            </div>
                        </div>
                    </CardDevice>
                )) : <div>  </div>}
            </div>}
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