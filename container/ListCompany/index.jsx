import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { Context } from '../../context'
import { ALL_COMPANIES_BY_USER, DELETE_ONE_COMPANY, GET_ALL_TEAM_COMPANY } from '../Company/queries'
import { CHANGE_STATE_COMPANY, CREATE_ONE_TEAM, LEAVE_TEAM_COMPANY } from './queries'
import { useRouter } from 'next/dist/client/router'
import { CHANGE_COMPANY_STATE } from '../Profile/queries'
import { Loading } from '../../components/Loading'
import { useFormTools } from '../../components/hooks/useForm'
import { dateFormat, updateCacheMod } from '../../utils'
import { useContextMenu } from '../../components/hooks/usePosition'
import InputHook from '../../components/InputHooks/InputHooks'
import { BColor, BGColor, PColor, PVColor } from '../../public/colors'
import { IconDelete, IconEdit, IconPromo, IconSearch } from '../../public/icons'
import Link from 'next/link'
import { Card, Container, Menu, Option, Text, WrapInfo, Button, ButtonCard, ActionName, Title, NameCompany, Content, Active, ContainerFilter, SearchButton, ContentSearch, SearchFilterOption, CtnSearch } from './styled'
import { RippleButton } from '../../components/Ripple'
import styled from '@emotion/styled'
import { css, keyframes } from 'styled-components'
import { useUser } from '../../container/Profile'
import { onPulses, OnShowSwich } from '../../components/animations'
import { useCompanyHook } from '../dashboard'

export const ListCompanyC = ({ isCompany, useCompany }) => {
    const { handleMenu } = useContext(Context)
    const router = useRouter()
    const [active, setActive] = useState(1)
    const handleClick = index => {
        setActive(index === active ? true : index)
    }
    // Filtrar
    const [search, setSearch] = useState('')
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const { data: dataCompany } = useQuery(ALL_COMPANIES_BY_USER, { fetchPolicy: 'network-only', variables: { search } })
    const { data: dataTeamCompany } = useQuery(GET_ALL_TEAM_COMPANY, { fetchPolicy: 'network-only', variables: { search } })
    const [showMore, setShowMore] = useState(0)
    const [dataComp, setData] = useState([])
    useEffect(() => {
        dataCompany?.getAllCompanyById && setData([...dataCompany?.getAllCompanyById])
    }, [dataCompany])
    return (
        <Content>
            <RippleButton onClick={() => handleMenu(5)} >Register one company</RippleButton>
            {<ContentSearch>
                <CtnSearch>
                    <SearchButton>
                        <IconEdit size='20px' />
                        <Text margin='30px 5px' size='12px' font='PFont-Regular' color={BColor}>Select a company</Text>
                        <SearchFilterOption>
                            <Option onClick={() => active !== 1 && handleClick(1)}>My Companies</Option>
                            <Option onClick={() => active !== 2 && handleClick(2)}>Team Company</Option>
                            <Option onClick={() => router.push('/dashboard')}>Dashboard</Option>
                        </SearchFilterOption>
                    </SearchButton>
                    <SearchButton>
                        <IconSearch size='30px' color={`${BColor}98`} />
                    </SearchButton>
                    <InputHook label='Busca los usuarios dados de baja' name='search' value={search} title='filter company' onChange={handleChangeFilter} type='text' range={{ min: 0, max: 200 }} />
                </CtnSearch>
            </ContentSearch>
            }
            {active === 1
                ? <ListCompany
                    dataComp={dataComp}
                    handleClick={handleClick}
                    active={active}
                    search={search}
                    isCompany={isCompany}
                    useCompany={useCompany}
                /> : <TeamListCompany
                    dataTeamCompany={dataTeamCompany}
                    handleClick={handleClick}
                    active={active}
                    search={search}
                    isCompany={isCompany}
                    useCompany={useCompany}
                />}
            {dataComp.length > 0 && <RippleButton onClick={() => setShowMore(s => s + 5)}>Load more </RippleButton>}

        </Content>
    )
}

ListCompanyC.propTypes = {

}

/**
 *
 * @param {*} param0
 * @returns  TeamComList
 */
export const TeamListCompany = ({ isCompany, useCompany, handleClick, active, dataTeamCompany, search }) => {
    const router = useRouter()
    const { setAlertBox } = useContext(Context)

    const ChangeState = async ({ _id }) => {
        await ActiveCompany({ variables: { idComp: _id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
    }
    const [lastCompanyMutation, { loading: loadingCompany }] = useMutation(CHANGE_COMPANY_STATE)
    const [LeaveCompany, { loading: loadingLeaveCompany }] = useMutation(LEAVE_TEAM_COMPANY, {
        onCompleted: data => setAlertBox({ message: `${data?.LeaveCompany?.message}` }),
        update(cache) {
            cache.modify({
                fields: {
                    getAllCompanyById(dataOld = []) { return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld }) }
                }
            }),
                cache.modify({
                    fields: {
                        getAllTeamCompany(dataOld = []) { return cache.writeQuery({ query: GET_ALL_TEAM_COMPANY, data: dataOld }) }
                    }
                })
        }
    })
    const [ActiveCompany] = useMutation(CHANGE_STATE_COMPANY, {
        onCompleted: data => setAlertBox({ message: `${data?.ActiveCompany?.message}` }),
        update(cache) {
            cache.modify({
                fields: {
                    getAllTeamCompany(dataOld = []) { return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld }) }
                }
            })
        }
    })
    const [useAnimation, setUseAnimation] = useState(false)
    const [nameComp, setNameComp] = useState(false)
    const handleCompany = async index => {
        const { _id } = index
        console.log(index)
        // const id = _id
        // setNameComp(index)
        // await lastCompanyMutation({ variables: { lastCompany: _id } }).catch(err => setAlertBox({ message: `${ err }`, duration: 300000 }))

        setUseAnimation(true)
        // router.push('/dashboard')
        // useCompany(id)

    }
    const dataUser = useUser()
    const HandleLeaveCompany = async ({ id }) => {
        await LeaveCompany({ variables: { idTeamComp: id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
    }
    useEffect(() => lastCompanyMutation(), [])
    return (
        <Container data={dataTeamCompany?.getAllTeamCompany?.length > 0}>
            {useAnimation && <Animation />}
            {dataTeamCompany
                && dataTeamCompany.getAllTeamCompany?.map((x, i) => (
                    <Card key={x._id} ref={x.ref}>
                        <Active active={x.cState ? '#12d841' : '#ccc'} />
                        <WrapInfo bgColor={'#2A265F'} width={'30%'}>
                            <Title>Team Company</Title>
                            <NameCompany size='25px'>{x.companyName} </NameCompany>
                            <Text color={BGColor} size='12px' >{dateFormat(x.incorporatedOn)}</Text>
                            <Text color={BGColor} size='12px' >{x.natureOfBusiness}</Text>
                        </WrapInfo>
                        <WrapInfo width={'70%'}>
                            <Text animation size='20px'>{x.companyName} </Text>
                            <Text animation size='15px'>{x.registeredOfficeAddress}</Text>
                            <Text size='15px'>Employees:   {x?.lineItemsTeam && x.lineItemsTeam?.map((e, i) => <span key={e._id} >{i + 1}</span>)}</Text>
                            <Text>{x.natureOfBusiness}</Text>
                            <Button onClick={() => handleCompany({ ...x })} >View Company</Button>
                        </WrapInfo>
                        <ButtonCard onClick={() => HandleLeaveCompany({ id: x._id })}>
                            <IconDelete size={20} color={PColor} />
                            <ActionName >
                                Leave Company
                            </ActionName>
                        </ButtonCard>
                    </Card>
                ))}
        </Container>
    )
}
export const ListCompany = ({ useCompany, handleClick, active, dataComp, search }) => {
    // State
    const router = useRouter()
    const { xPos, yPos, showMenu } = useContextMenu()
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const [RegisterOneTeam, { loading }] = useMutation(CREATE_ONE_TEAM)
    const { setAlertBox } = useContext(Context)
    const [deleteCompany] = useMutation(DELETE_ONE_COMPANY, {
        update: (cache, { data: { getAllCompany } }) => updateCacheMod({
            cache,
            query: ALL_COMPANIES_BY_USER,
            nameFun: 'getAllCompanyById',
            dataNew: getAllCompany
        })
    })
    const [lastCompanyMutation, { loading: loadingCompany }] = useMutation(CHANGE_COMPANY_STATE)
    const [ActiveCompany] = useMutation(CHANGE_STATE_COMPANY, {
        onCompleted: data => setAlertBox({ message: `${data?.ActiveCompany?.message}` }),
        update(cache) {
            cache.modify({
                fields: {
                    getAllCompanyById(dataOld = []) { return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld }) }
                }
            })
        }
    })

    const [idUser, setIdUser] = useState({})
    const [idComp, setIdComp] = useState({})
    const handleForm = e => handleSubmit({
        event: e,
        action: () => RegisterOneTeam({
            variables: {
                idC: idComp,
                id: idUser,
                uEmail: dataForm.uEmail
            }
        }),
        actionAfterSuccess: () => {
            setDataValue({})
        }
    })

    const HandleClickEdit = async data => {
    }
    const ChangeState = async ({ _id }) => {
        await ActiveCompany({ variables: { idComp: _id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
    }
    const [useAnimation, setUseAnimation] = useState(false)
    const [companyName, setCompName] = useState('')
    const handleCompany = async index => {
        const { _id, companyName } = index
        const id = _id
        setCompName(companyName)
        setUseAnimation(true)
        await lastCompanyMutation({ variables: { lastCompany: _id } }).catch(err => setAlertBox({ message: `${err}`, duration: 300000 }))
        useCompany(id)
        setTimeout(() => {
            router.push('/dashboard')
        }, 3000);
    }
    useEffect(() => lastCompanyMutation(), [])
    // if (loading || loadingCompany) return <Loading />
    const handleDelete = async (_id, companyName) => {
        const results = await deleteCompany({
            variables: { id: _id, companyName },
            update(cache) {
                cache.modify({
                    fields: {
                        getAllCompanyById(dataOld = []) {
                            return cache.writeQuery({ query: ALL_COMPANIES_BY_USER, data: dataOld })
                        }
                    }
                })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
    }
    const [dataUser] = useUser()
    // console.log(dataCompany)
    return (
        <>
            {useAnimation && <Animation useAnimation={useAnimation} dataUser={dataUser} setUseAnimation={setUseAnimation} companyName={companyName} />}
            <Container data={dataComp.length > 0}>
                <Menu showMenu={showMenu} style={{ top: yPos, left: xPos }}>
                    <ul onClick={e => e.stopPropagation()}>
                        <Option>My Companies</Option>
                        <Option>Reload</Option>
                        <Option>Save</Option>
                        <Option>Save As</Option>
                        <Option>Inspect</Option>
                    </ul>
                </Menu>
                {dataComp.length > 0 && dataComp
                    ? active === 1 && dataComp?.map((x, i) => (
                        <Card key={x._id} ref={x.ref}>
                            <Active active={x.cState ? '#12d841' : '#ccc'} />
                            <WrapInfo bgColor={'#2A265F'} width={'30%'}>
                                <Title>Company</Title>
                                <NameCompany size='25px'>{x.companyName} </NameCompany>
                                <Text color={BGColor} size='12px' >{dateFormat(x.incorporatedOn)}</Text>
                                <Text color={BGColor} size='12px' >{x.natureOfBusiness}</Text>
                            </WrapInfo>
                            <WrapInfo width={'70%'}>
                                <Text animation size='20px'>{x.companyName} </Text>
                                <Text animation size='15px'>{x.registeredOfficeAddress}</Text>
                                <Text size='15px'>Employees:   {x?.lineItemsTeam && x.lineItemsTeam?.map((e, i) => <span key={e._id} >{i + 1}</span>)}</Text>
                                <Text>{x.natureOfBusiness}</Text>
                                <Button onClick={() => handleCompany({ ...x })} >View CompanyZXCKJZNXCKJZXN</Button>
                            </WrapInfo>
                            <ButtonCard onClick={() => handleDelete(x._id, x.companyName)}>
                                <IconDelete size={20} color={PColor} />
                                <ActionName >
                                    Delete
                                </ActionName>
                            </ButtonCard>
                            <Link href={{ pathname: 'new-company', query: { companyName: x.companyName, accounts: x.accounts, companyLegalStatus: x.companyLegalStatus, dissolvedOn: x.dissolvedOn, incorporatedOn: x.incorporatedOn, id: x._id, natureOfBusiness: x.natureOfBusiness, registeredOfficeAddress: x.registeredOfficeAddress, edit: true } }}>
                                <ButtonCard delay='.1s' top={'60px'} color={1} onClick={() => HandleClickEdit({ _id: x._id })}>
                                    <IconEdit size={20} color={PColor} />
                                    <ActionName>
                                        Edit
                                    </ActionName>
                                </ButtonCard>
                            </Link>
                            <ButtonCard delay='.2s' top={'100px'} onClick={() => ChangeState({ _id: x._id })}>
                                <IconPromo size={20} color={PColor} />
                                <ActionName>
                                    Change State
                                </ActionName>
                            </ButtonCard>
                        </Card>
                    ))
                    : <Text size='30px'> There is no company registered  </Text>}
            </Container>
        </>

    )
}
export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const AnimationLeft = keyframes`
0% {
    transform: translateX(-50vw);
    opacity: 0;
}

100% {
    transform: translateY(0);
    opacity: 1;
}
`
const ContainerAnimation = styled.div`
${props => props.active === 1 ? css`animation: ${AnimationRight} 200ms;` : css`animation: ${AnimationRight} 200ms;`}

`
ListCompany.propTypes = {
    setCompanyLink: PropTypes.func,
    useCompany: PropTypes.func,
    isCompany: PropTypes.string
}

export const Animation = ({ useAnimation, setUseAnimation, dataUser, companyName }) => {
    return (
        <ContainerAnimationSw>
            <button onClick={() => setUseAnimation(!useAnimation)}>clic</button>
            <CtnTitle>
                <Text style={{ marginLeft: '-80px' }} size='2.125rem' margin='0 0 16px'>Switching Company</Text>

            </CtnTitle>
            <ContentComToUser>
                <Circle useAnimation={useAnimation}>
                    <Text size='30px'>{dataUser.uEmail?.slice(0, 2).toUpperCase() || null}</Text>
                </Circle>
                <Circle2 useAnimation={useAnimation}>
                    <Text size='30px' color={BGColor}>{companyName?.slice(0, 2).toUpperCase() || null}</Text>
                    <CircleUser>
                        <Text size='18px' color={BColor} >{dataUser.uEmail?.slice(0, 2).toUpperCase() || null}</Text>
                    </CircleUser>
                </Circle2>
            </ContentComToUser>
        </ContainerAnimationSw>
    )
}
const CtnTitle = styled.div`
    position: fixed;
    right: 0;
    margin: auto;
    display: flex;
    width: 100%;
    z-index: 9999;
    top: 20%;
    left: 44%;
    transform: translate(0, -20%);
`
const ContainerAnimationSw = styled.div`
    height: 100vh;
    width: 100%;
    transition: all 2s ease;
    background-color: ${BGColor};
    z-index: 999999999999;
    position: fixed;
    left: 0;
    top: 0;
`
const ContentComToUser = styled.div`
    position: relative;
    cursor: pointer;
    animation: ${onPulses} 1s infinite;
    animation-timing-function: ease-in-out;
    display: flex;
    place-content: center;
    align-items: center;
    height: 100%;

`
export const iTnNnx = keyframes`
0% {
    transform: scale3d(1, 1, 1) translate3d(0px, 0px, 0px);
}

100% {
    transform: scale3d(0.7, 0.7, 0.7) translate3d(-125px, 10px, 0px);
}
`

const CircleUser = styled.div`
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 25%) 0px 14px 28px, rgb(227 210 210 / 22%) 0px 10px 10px;
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: white;
    place-content: center;
    display: grid;
    right: -22px;
    transform: translateX(-9%);
    bottom: -0.1rem;
`
const Circle = styled.div`
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${PVColor};
    height: 100px;
    place-content: center;
    display: grid;
    width: 100px;    
    opacity: 0.5;
    z-index: 201;
    @keyframes backInLeft {
  0% {
    -webkit-transform: translateX(-2000px) scale(0.7);
    transform: translateX(-2000px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateX(0px) scale(0.7);
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
    
${({ useAnimation }) => useAnimation ? css` 
    animation-name: backInLeft;
    ` : css``};
    animation-duration: 2s;
    animation-duration: 2s;
    animation-fill-mode: both;

    `
const Circle2 = styled.div`
    border-radius: 50%;
    border: 2px solid ${PVColor};
    height: 100px;
    position: relative;
    place-content: center;
    cursor: pointer;
    display: grid;
    width: 100px;    
    opacity: 0.5;
    margin-left: -100px;
    z-index: 401;
    background-color: ${PVColor};
 @keyframes backInRight {
  0% {
    -webkit-transform: translateX(2000px) scale(0.7);
    transform: translateX(2000px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateX(0px) scale(0.7);
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
    ${({ useAnimation }) => useAnimation ? css` 
    animation-name: backInRight;
    ` : css``};
    animation-duration: 2s;
    animation-duration: 2s;
    animation-fill-mode: both;

`