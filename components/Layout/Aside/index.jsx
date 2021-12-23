/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Options from '../../Accordion/Options'
import { BColor, BGColor } from '../../../public/colors'
import { IconArrowBottom } from '../../../public/icons'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ONE_COMPANY_BY_ID } from '../../../container/dashboard/queries'
import { Context } from '../../../context'
import { useUser } from '../../../container/Profile'
import { Anchor, ButtonGlobalCreate, Card, ContainerAside, CtnAnchor, Info, LeftNav } from './styled'
import NewSelect from '../../NewSelectHooks'
import { ALL_COMPANIES_USER } from '../../../container/Company/queries'
import ActiveLink from '../../common/Link'
import { Overline } from '../../common/Reusable'
import { GET_MODULES } from '../../../container/DashboardAdmin/queries'
import { Loading } from '../../Loading'

const Aside = ({ onChange, handleMenu, dataForm }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const body = document.body
    body.addEventListener('keyup', e => e.code === 'Escape' && setShow(false))
    return () => body.removeEventListener('keyup', () => setShow)
  }, [setShow])
  const { company, useCompany, collapsed, setCollapsed } = useContext(Context)
  const { data: allCompany } = useQuery(ALL_COMPANIES_USER)
  const [dataUser] = useUser()
  const [getOneCompanyById, { data }] = useLazyQuery(GET_ONE_COMPANY_BY_ID, {
    variables: { idC: company.idLasComp ? company.idLasComp : dataUser?.lastCompany },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => getOneCompanyById(), [company, useCompany])
  const [active, setActive] = useState(false)
  const handleClick = index => setActive(index === active ? false : index)
  const { data: dataUPermits, error, loading } = useQuery(GET_MODULES, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  if (error) return <div />
  if (loading) return <Loading />
  const handleClose = () => {
    setShow(false)
    setCollapsed(false)
  }
  return (
    <>
      <Overline bgColor={`${BColor}69`} show={show || collapsed} onClick={handleClose} />
      <ContainerAside collapsed={collapsed}>
        <Card>
          <Info>
            <NewSelect noLabel icon action title={data?.getOneCompanyById?.companyName && data?.getOneCompanyById?.companyName} search options={allCompany?.getAllCompanyUser || []} id='_id' name='_id' value={dataForm?._id || ''} optionName={'companyName'} secOptionName={''} onChange={onChange} padding='0px' onClick={() => handleMenu(5)} />
          </Info>
          <Info>
            <ButtonGlobalCreate onClick={() => setShow(!show)}>
              Add new
            </ButtonGlobalCreate>
            <LeftNav show={show}>
              <Info>
                <h2>Customers</h2>
                <ActiveLink activeClassName="active" href="/sales-invoices">
                  <Anchor>Invoices</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/sales-invoices">
                  <Anchor>Sales Invoice</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Supplier</h2>
                <ActiveLink activeClassName="active" href="/bills">
                  <Anchor>Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/pay-bills">
                  <Anchor>Pay Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Purchase Orders</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Expenses</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Employees</h2>
                <ActiveLink activeClassName="active" href="/companies/dashboard">
                  <Anchor>Admin</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName="active" href="/">
                  <Anchor>Home</Anchor>
                </ActiveLink>
              </Info>
            </LeftNav>
          </Info>
          {!!dataUPermits && dataUPermits?.getAllModules?.map((x, i) => (
            <ActiveLink activeClassName="active"  key={x._id} onClick={e => e.stopPropagation()} href={`/${x.mPath}`} >
              <Anchor>
                {x.mPath}
              </Anchor>
            </ActiveLink>

          )
          )}
        </Card>
      </ContainerAside>
    </>
  )
}
export default React.memo(Aside, (prevProps, props) => {
  props.active !== prevProps.active
})

Aside.propTypes = {
  handleClickMenu: PropTypes.func,
  closeSession: PropTypes.func,
  filter: PropTypes.func,
  dataForm: PropTypes.object,
  currentUser: PropTypes.object,
  onChange: PropTypes.func,
  allCompany: PropTypes.array,
  dataCompany: PropTypes.object,
  active: PropTypes.bool,
  handleMenu: PropTypes.func
}
