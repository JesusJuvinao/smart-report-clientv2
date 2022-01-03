import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useApolloClient, useQuery } from '@apollo/client'
import { Header, HeaderPublic, Footer } from '../../components/Layout'
import { useRouter } from 'next/router'
import { AlertBox } from '../../components/AlertBox'
import useFullscreenMode from '../../components/hooks/useFullScreenMode'
import { Context } from '../../context'
import Aside from '../../components/Layout/Aside'
import { BGColor } from '../../public/colors'
import { URL_BASE } from '../../apollo/urls'
import { useUser } from '../Profile'
import { useCompanyHook } from '../dashboard'
import { ALL_COMPANIES_BY_USER } from '../Company/queries'
import { useFormTools } from '../../components/hooks/useForm'
import { Loading } from '../../components/Loading'
import { LateralMenu } from '../../components/common/LateralMenu'
import { Product, Iva, Accounts, Supplier, Class, NewCompany, Categories } from '../shared'
import { TopNavigation } from '../../components/Layout/TopNavigation'
import { RouterCrumbs } from '../../components/Breadcrumb'
import { useSetState } from '../../components/hooks/useState'
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const LayoutC = ({ keyTheme, handleTheme, children }) => {
    // STATES
    const { error, setAlertBox, authData, menu, handleMenu, isSession, setIsSession, company, setSessionActive } = useContext(Context)
    const BROWSER_API_KEY = "k6mBs3JggSu0q48OS7yz";
    const [visitorId, setVisitorId] = useState("");
    const [handleChange, handleSubmit, setDataValue, { dataForm }] = useFormTools()
    const [show, setShow] = useState(false)
    const [activeLogin, setActive] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const location = useRouter()
    const [elementRef, FullscreenIcon] = useFullscreenMode()
    const [active, setActiveMenu] = useState(false)
    const [modal, setModal] = useState(1)
    const [data, { loading, error: errorUser }] = useUser()
    const { data: allCompany } = useQuery(ALL_COMPANIES_BY_USER)
    const client = useApolloClient()
    useEffect(() => {
        FingerprintJS.load({
            token: BROWSER_API_KEY,
        })
            .then((fp) => fp.get())
            .then((result) => {
                setVisitorId(result.visitorId);
            });
    }, []);
    // HANDLES
    const handleClick = index => {
        setShow(index === show ? false : index)
    }
    const handleClickMap = index => {
        setModal(index === modal ? false : index)
    }
    // Handle to MenuLateral
    const handleClickMenu = index => setActiveMenu(index === active ? false : index)
    const activeSettings = () => {
        setActive(!activeLogin)
    }
    // EFFECTS
    useEffect(() => {
        const body = document.body
        body.addEventListener(
            'keyup',
            e => e.code === 'Escape' && setShow(false)
        )
        return () => body.removeEventListener('keyup', () => setShow)
    }, [setShow])

    useEffect(() => {
        setShow(false)
    }, [location])

    useEffect(() => {
        setShow(false)
    }, [location])
    const [loadingLogout, setLoadingLogout] = useState(false)
    const closeSession = useCallback(async () => {
        setLoadingLogout(true)
        setSessionActive({})
        await window
            .fetch(`${URL_BASE}auth/logout/`, {})
            .then(res => res.json())
            .catch(() => {
                setAlertBox({
                    message: 'Se ha producido un error.',
                    duration: 30000,
                    color: 'error'
                })
            }).finally(() => {
            location.push('/')
            window.localStorage.clear();
            setSessionActive(null)
            setIsSession(null)
            client.cache.reset()
            location.push('/')
            })
            setTimeout(() => {
                location.push('/')
                setSessionActive(null)
                setIsSession(null)
                location.push('/')
                setLoadingLogout(false)

            }, 300);
            location.push('/')
            setSessionActive(null)
            setIsSession(null)
            location.push('/')
    }, [])

    const [timer, setTimer] = useState(0)
    const [isOn, setIsOn] = useState(false)
    useEffect(() => {
        let interval
        if (process.env === 'production' && isOn && !!isSession) {
            interval = setInterval(() => setTimer(timer => timer + 1), 1000)
        }
        window.addEventListener('focus', () => {
            setIsOn(false)
            clearInterval(interval)
        })
        window.addEventListener('blur', () => {
            setIsOn(true)
            if (timer >= 700) {
                closeSession()
            } else {
                clearInterval(interval)
            }
        })

        return () => {
            clearInterval(interval)
            window.removeEventListener('focus', () => { })
            window.removeEventListener('blur', () => { })
        }
    }, [authData, isOn])

    // const { authState, setAuthToken } = useAuth()
    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     const fetchAccessToken = async () => {
    //       if (authState?.userId) {
    //         // no need to refresh if userId is not defined
    //         const now = Date.now().valueOf() / 1000
    //         if (typeof authState !== 'undefined' && jwt.decode(authState?.token)?.exp < now) {
    //           await fetchJson(`${URL_BASE}graphql`, {
    //             method: 'POST',
    //             headers: {
    //               'content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //               query: `mutation {
    //                 refreshUserToken(userId: "${authState?.userId}", refreshToken: "${authState?.refreshToken}" ) {
    //                   userId
    //                   token
    //                   newRefreshToken
    //                 }
    //               }`
    //             })
    //           }).then(res => {
    //             if (res) {
    //               signIn(res?.data?.refreshUserToken?.userId, res?.data?.refreshUserToken?.token, res?.data?.refreshUserToken?.newRefreshToken)
    //             }
    //           })
    //         } else {
    //           return null
    //         }
    //       }
    //     }
    //     fetchAccessToken()
    //   }
    // }, [authState, setAuthToken])
    const [dataCompany] = useCompanyHook(dataForm !== 'undefined' && dataForm)
    if (loadingLogout || loading) return <Loading />
    // if (errorUser) return <span>Error</span>
    return (
        <div style={{ background: BGColor }} ref={elementRef}>
            <AlertBox err={error} />
            <App>
                <Main
                    aside={
                        !['/', '/login', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => x === location.pathname)}
                >
                    {!['/', '/login', '/register', '/terms_and_conditions', '/varify-email', '/checkout/[id]', '/add-payment-method', '/teams/invite/[id]', '/forgotpassword', '/autho', '/contact-us', '/email/confirm/[code]', '/switch-options', '/contact', '/teams/invite/[id]'].find(x => x === location.pathname) && (
                        <Aside handleClickMenu={handleClickMenu} active={active} allCompany={allCompany?.getAllCompanyById} dataCompany={dataCompany} handleMenu={handleMenu} onChange={handleChange} dataForm={dataForm} />
                    )}
                    {!['/login', '/', '/register', '/forgotpassword', '/checkout/[id]', '/teams/invite/[id]', '/varify-email', '/terms_and_conditions', '/email/confirm/[code]', '/autho', '/contact'].find(x => x === location.pathname) && (
                        <Header
                            activeSettings={activeSettings}
                            setShowModal={setShowModal}
                            // UseFullScreen
                            FullscreenIcon={FullscreenIcon}
                            dataCompany={dataCompany}
                            handleClickMap={handleClickMap}
                            closeSession={closeSession}
                            data={data}
                            isSession={isSession}
                            showModal={showModal}
                            handleClick={handleClick}
                            show={show}
                            modal={modal}
                            setShow={setShow}
                            setShow={setShow}
                            handleTheme={handleTheme}
                            authData={authData}
                            keyTheme={keyTheme}
                            location={location}
                        />
                    )}
                    {['/',].find(x => x === location.pathname) && (
                        <HeaderPublic closeSession={closeSession} />
                    )}
                    <div style={{ gridArea: 'main', overflowY: 'auto' }}>
                        {children}
                    </div>
                    <LateralMenu
                        show={menu}
                        title={
                            menu === 1
                                ? 'New Supplier'
                                : menu === 2
                                    ? 'New Iva'
                                    : menu === 3
                                        ? 'New Accounts'
                                        : menu === 4
                                            ? 'New Product'
                                            : menu === 5
                                                ? 'New Company'
                                                : menu === 6
                                                    ? 'New Categories'
                                                    : menu === 7
                                                        ? 'New Class'
                                                        : null
                        }
                        onHide={() => {
                            handleMenu(false)
                            location.replace(location.pathname)
                        }}
                        onCancel={() => false}
                        btnCancel={false}
                        btnConfirm={false}
                        header={true}
                        footer={false}
                        borderRadius="0"
                    >
                        {menu === 1
                            ? (<Supplier />)
                            : menu === 2
                                ? (
                                    <Iva />
                                )
                                : menu === 3
                                    ? (
                                        <Accounts />
                                    )
                                    : menu === 4
                                        ? (
                                            <Product />
                                        )
                                        : menu === 5
                                            ? (
                                                <NewCompany />
                                            )
                                            : menu === 6
                                                ? (
                                                    <Categories />
                                                )
                                                : menu === 7
                                                    ? (
                                                        <Class />
                                                    )
                                                    : null}
                    </LateralMenu>
                    {!['/login', '/register', '/varify-email', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => x === location.pathname) && <Footer />}
                </Main>
            </App>
        </div>
    )
}

const App = styled.div`
    height: 100vh;
`
const Main = styled.main`
    display: grid;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    grid-template-rows: 50px 1fr;
    grid-template-columns: min-content 1fr;
    grid-template-areas:
        'aside head head'
        'aside main main'
        'aside main main';
    text-align: center;
    grid-gap: 0.25rem;
    /* grid-gap: 10px; */
    @media (min-width: 960px) {
        ${props => !props.aside &&
        css`
                /* grid-template-columns: 1fr; */
                display: flex;
                flex-direction: column;
                height: 100%;
            ` };
    }
`

LayoutC.propTypes = {
    props: PropTypes.object,
    keyTheme: PropTypes.string,
    children: PropTypes.object,
    useCompany: PropTypes.object,
    handleTheme: PropTypes.func
}
