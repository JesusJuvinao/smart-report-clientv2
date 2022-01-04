import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from './styled'
import { useQuery } from '@apollo/client'
import { GET_ONE_EVENT_TICKET } from './queries'
import { Loading } from '../../components/Loading'

export const ViewOneTickes = ({ eventName }) => {
    const { data, loading } = useQuery(GET_ONE_EVENT_TICKET, { variables: { eventName: eventName }, fetchPolicy: 'cache-and-network' })
    if (loading) return <Loading />
    return (
        <Container>
            <span>{data?.getOneEventsalesdata?.eventName}</span>
        </Container>
    )
}

ViewOneTickes.propTypes = {
    setAlertBox: PropTypes.func
}
