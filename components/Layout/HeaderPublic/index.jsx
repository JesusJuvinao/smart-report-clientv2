/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { IconArrowBottom } from '../../../public/icons'
import { Context } from '../../../context'
import { AlertError } from '../AlertError/index'
import { useRouter } from 'next/router'
import { IconLogo } from '../../common/logo'
import { Container, NavLink, ContainerLink, Button, ContentLink, ContainerBurger, ContentLogo } from './styled'

export const HeaderPublic = ({ closeSession }) => {
    const { setCollapsed, collapsed, isSession } = useContext(Context)
    const router = useRouter()
    return (
        <Container>
            <AlertError />
            <ContainerLink>
                <ContentLink style={{ display: 'flex' }}>
                    <ContentLogo>
                        <NavLink href="/">
                            <a>
                                <IconLogo size='50px' />
                            </a>
                        </NavLink>
                    </ContentLogo>
                    <NavLink href='/'>
                        <a>
                            <Button>
                                Home
                            </Button>
                        </a>
                    </NavLink>
                    <NavLink href='/login'>
                        <a>
                            <Button login padding='0px 7px'>
                                Find
                                &nbsp;
                                <IconArrowBottom size='11px' />
                            </Button>
                        </a>
                    </NavLink>
                    <NavLink href='/login'>
                        <a>
                            <Button login padding='0px 7px'>
                                Plans
                                &nbsp;
                                <IconArrowBottom size='11px' />
                            </Button>
                        </a>
                    </NavLink>
                </ContentLink>
                {isSession?.data === null ?
                    <div style={{ width: 'min-content', display: 'flex' }}>
                        <NavLink href='/login'>
                            <a>
                                <Button login padding='0px 7px'>
                                    Login
                                    &nbsp;
                                    <IconArrowBottom size='11px' />
                                </Button>
                            </a>
                        </NavLink>
                        <NavLink href='/register'>
                            <a>
                                <Button login padding='0px 7px'>
                                    Register
                                    &nbsp;
                                    <IconArrowBottom size='11px' />
                                </Button>
                            </a>
                        </NavLink>
                    </div>
                    :
                    <div style={{ width: 'min-content', display: 'flex' }} >
                        <NavLink href='/dashboard'>
                            <a>
                                <Button login padding='0px 7px'>
                                    Dashboard
                                </Button>
                            </a>
                        </NavLink>
                        <Button login onClick={() => closeSession()} padding='0px 7px'>
                            Logout
                        </Button>
                    </div>
                }
            </ContainerLink>
        </Container >
    )
}

HeaderPublic.propTypes = {
    children: PropTypes.element,
    theme: PropTypes.string || PropTypes.object,
    props: PropTypes.object,
    displayMessage: PropTypes.string || PropTypes.func,
    activeSettings: PropTypes.func,
    handleClick: PropTypes.func,
    setShowModal: PropTypes.func,
    handleTheme: PropTypes.func,
    keyTheme: PropTypes.string,
    location: PropTypes.object,
    showModal: PropTypes.bool,
    onClickLogout: PropTypes.func,
    modal: PropTypes.number,
    setShow: PropTypes.func,
    handleClickMap: PropTypes.func,
    closeSession: PropTypes.func,
    FullscreenIcon: PropTypes.object,
    data: PropTypes.object,
    show: PropTypes.bool
}
