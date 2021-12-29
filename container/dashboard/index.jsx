import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_ONE_COMPANY_BY_ID } from './queries'
import { Context } from '../../context'
import { useUser } from '../Profile'
import { CHANGE_COMPANY_STATE } from '../Profile/queries'
import { BColor, PColor, TBGBColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import { HorizontalBarChart } from '../../components/Chart'
import { RippleButton } from '../../components/Ripple'
import { dateFormat } from '../../utils'
import Link from 'next/link'
import { useFormTools } from '../../components/hooks/useForm'
import { Section } from '../../components/Table/styled'
import { Table } from '../../components/Table'
import { GET_ALL_BILL } from '../Bills/queries'
import { SUPPLIER_FOR_COMPANY } from '../Supplier/queries'
import { IconPromo } from '../../public/icons'
import { GET_ALL_ATTACHMENTS } from '../Attachments/queries'
import { ALL_COMPANIES_BY_USER } from '../Company/queries'
import { Avatar, Card, CardPrimary, Container, Content, Text, Wrapper, WrapperRow, CircleCompany, ButtonTheme, SwitchButton, ContentToggle } from './styled'
import router, { useRouter } from 'next/router'
import { useSetState } from '../../components/hooks/useState'
// import { LineChart } from '@/components/Chart/multiAxis'

export const CompanyC = () => {
    // STATE
    const location = useRouter()
    const [baseHandle, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const { setAlertBox, handleMenu, menu, company, useCompany } = useContext(Context)
    const [dataUser] = useUser()
    const [getAllAttachment, { data: dataFiles }] = useLazyQuery(GET_ALL_ATTACHMENTS, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
    const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER, { fetchPolicy: 'network-only', variables: { search: '' } })
    const [getAllBill, { data: dataBill, loading: loadingBills }] = useLazyQuery(GET_ALL_BILL, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: navigator.onLine ? 'network-only' : 'cache-only' })
    const [getSuppliersForCompany, { data: dataSupplier }] = useLazyQuery(SUPPLIER_FOR_COMPANY, {
        variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
        fetchPolicy: 'cache-and-network'
    })
    const [dataComp, dataTeam, { loading }] = useCompanyHook()
    const [lastCompanyMutation] = useMutation(CHANGE_COMPANY_STATE)
    const handleCompany = async index => {
        const { _id } = index
        const id = _id
        await lastCompanyMutation({ variables: { lastCompany: _id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
        useCompany(id)
    }
    useEffect(() => {
        getAllBill()
        getSuppliersForCompany()
    }, [company.idLasComp])
    useEffect(() => getAllAttachment(), [company.idLasComp, getAllAttachment])

    const HandleClickEdit = item => {
        // create func
        if (item.view === 1) {
            // setModal(true)
            // setDisable(true)
            // edit func
        } else if (item.view === 2) {
            // setDisable(false)
            // View func
        } else if (item.view === 3) {
            // isEdit.setState(true)
        }
        setDataValue({
            idBill: item._id,
            bDescription: item.bDescription,
            billNo: item.billNo,
            refCode: item.bInvoiceRef,
            bDueDate: item.bDueDate,
            _id: item?.idSupplier?._id,
            items: item?.lineItems?.map(x => { return { id: x._id, bDescription: x.description, quantity: parseInt(x.quantity), idAccount: x.idAccount, idRef: x.idPro, rate: parseInt(x.rate), iPercentage: x.lineItemsBillIva } })
        })
    }
    const handleDelete = async elem => {
        const { _id } = elem
        const results = await null({
            variables: { id: _id },
            update(cache) {
                cache.modify({
                    fields: {
                        getAllBill(dataOld = []) {
                            return cache.writeQuery({ query: 'GET_ALL_BILL', data: dataOld })
                        }
                    }
                })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
    }
    // EFFECT
    const Switch = useSetState(0)
    return (<>
        <Wrapper>
            <ContentToggle>
                <div>
                    <Text style={{ margin: '0' }} size='13px' >PRIVACY</Text>
                    <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                        <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                    </ButtonTheme>
                </div>
            </ContentToggle>
            <Container>
                {(loading || loadingBills) && <Loading />}
                <Content width="30%" direction="row">
                    <Card padding='0' width='97%'>
                        <CardPrimary radius='8px 8px 0px 0px' bgColor={TBGBColor} padding='30px 10px'>
                            <Text size='22px' >Welcome Back !</Text>
                            <Text size='20px' >{dataComp?.companyName}</Text>
                        </CardPrimary>
                        <CardPrimary padding=''>
                            <Avatar />
                            <Link activeClassName="active" href="/bills">
                                <a>
                                    <RippleButton margin='20px 0' widthButton='70px' size='10px' padding='5px'>View Bills</RippleButton>
                                </a>
                            </Link>
                            <WrapperRow margin='0px 0px 15px'>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >{!!dataBill && dataBill?.getAllBill?.length}</Text>
                                    <Text justify='center' align='center' size='14px' >Total Bills</Text>
                                </div>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >{!!dataSupplier && dataSupplier?.getSuppliersForCompany?.length}</Text>
                                    <Text justify='center' align='center' size='14px' >Vendors</Text>
                                </div>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >{dataFiles?.getAllAttachment?.length}</Text>
                                    <Text justify='center' align='center' size='14px' >Files</Text>
                                </div>
                            </WrapperRow>
                        </CardPrimary>
                    </Card>
                   {<Card wrap='no-wrap' width='97%' direction="row">
                        <Link activeClassName="active" href={`/companies/${encodeURIComponent(dataComp?._id)}}`}>
                            <a>
                                <RippleButton borderSolid={`.5px solid ${PColor}`} bgColor='transparent' color={BColor} widthButton='150px' size='9px' padding='5px'> <IconPromo color={PColor} size='30px' />Commission invoice</RippleButton>
                            </a>
                        </Link>
                    </Card>}
                    <Card overflow='auto' wrap='no-wrap' width='97%' direction="row">
                        {allCompany && allCompany?.getAllCompanyById?.map((x, i) => (
                            <div key={x._id} style={{ zIndex: '200', width: 'min-content' }}> <CircleCompany pulse={x._id === dataComp?._id} onClick={() => handleCompany({ ...x })} >{x.companyName.slice(0, 2).toUpperCase()}</CircleCompany> </div>
                        ))}
                    </Card>
                </Content>
                <Content width="70%">
                    <Content direction="row">
                        <Card onClick={() => location.push('/usermgt')} style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >{dataComp ? dataComp?.lineItemsTeam?.length : 0}</Text>
                            <Text size='14px' >Employees</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >0</Text>
                            <Text size='14px' >Vendors</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >{dataFiles?.getAllAttachment?.length}</Text>
                            <Text size='14px' >Files</Text>
                        </Card>
                    </Content>
                    <Card width='97%'>
                        <HorizontalBarChart />
                    </Card>
                </Content>
                <Content width="20%" direction="row">
                    <Card width='97%'>
                        Lorem
                    </Card>
                    <Card width='97%'>
                        Lorem
                    </Card>
                </Content>
                <Content width="80%">
                    <Content direction="row">
                        <Card width='30%'>
                            Lorem
                        </Card>
                        <Card width='30%'>
                            Lorem
                        </Card>
                    </Content>
                    <Card width='97%'>
                    </Card>
                </Content>

            </Container>

        </Wrapper>
    </>
    )
}
export const useCompanyHook = initialState => {
    const id = initialState?._id
    const [dataUser] = useUser()
    const { isCompany, setAlertBox, useCompany, company } = useContext(Context)
    const [lastCompanyMutation] = useMutation(CHANGE_COMPANY_STATE)

    useEffect(async () => {
        useCompany(id)
        if (id) {
            await lastCompanyMutation({ variables: { lastCompany: company.idLasComp !== undefined ? company.idLasComp : dataUser?.lastCompany } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
        }
    }, [id, dataUser])

    const [getOneCompanyById, { data, loading }] = useLazyQuery(GET_ONE_COMPANY_BY_ID, {
        variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true
        // onCompleted: data => {
        // }
    })
    useEffect(() => getOneCompanyById(), [isCompany, useCompany, id, initialState])
    return [data?.getOneCompanyById, data, { loading }]
}
CompanyC.propTypes = {
    id: PropTypes.string,
    setCompanyLink: PropTypes.func,
    isCompany: PropTypes.string,
    dataUser: PropTypes.array
}
