import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Context } from '../../context'
import { ALL_COMMISSION_STATEMENT } from './queries'
import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table'
import { Section } from '../../components/Table/styled'
import Link from 'next/link'
import { ViewCommissionStatements } from './ViewCommission'
import { RippleButton } from '../../components/Ripple'
import { PVColor, SCColor, SEGColor, TBGAColor, TBGBColor, TBGDColor, TBGVColor, TFBColor } from '../../public/colors'
import { Container, Card, Text, Content, ContentTableItem, TableButton, Options } from './styled'
import { AwesomeModal } from '../../components/AwesomeModal'

export const CommissionStatements = () => {
  // STATES
  const [modal, setModal] = useState(false)
  const [dataStatement, setDataStatement] = useState({})
  const { setAlertBox, handleMenu, company } = useContext(Context)
  // QUERIES
  const { data, loading } = useQuery(ALL_COMMISSION_STATEMENT, {
    variables: {
      idComp: company.idLasComp ? company.idLasComp : null,
      company: '',
      search: '',
      min: 12,
      max: 100
    },
    fetchPolicy: 'cache-and-network'
  })
  console.log(data)
  const handlePreview = (data) => {
    setModal(!modal)
    setDataStatement(data)
  }
  return (
    <Container>
      {loading && <Loading />}
      <Options>
        <Link href={'/invoice/commission-statement/create'}>
          <RippleButton onClick={() => setModal(!modal)}>Create</RippleButton>
        </Link>
      </Options>
      <Table
        titles={[
          { name: '#', key: '', key: 'emailedDate', justify: 'flex-start', width: '2%' },
          { name: 'Emailed Date', key: 'emailedDate', justify: 'flex-start', width: '7%' },
          { name: 'Events Month', key: 'eventsMonth', justify: 'flex-start', width: '7%' },
          { name: 'Invoice Type', key: 'invoiceType', justify: 'flex-start', width: '7%' },
          { name: 'Statement Date', key: 'statementDate', justify: 'flex-start', width: '7%' },
          { name: 'Statement From', key: 'statementFrom', justify: 'flex-start', width: '7%' },
          { name: 'Statement To', key: 'statementTo', justify: 'flex-start', width: '7%' },
          { name: 'Statement To Email', key: 'statementToEmail', justify: 'flex-start', width: '7%' },
          { name: 'Commission Payable ToYou', key: 'totalCommissionPayableToYou', justify: 'flex-start', width: '7%' },
          { name: 'Gross Sales', key: 'totalGrossSalesReceivedByYou', justify: 'flex-start', width: '7%' },
          { name: 'VATOnComms', key: 'totalVATOnComms', justify: 'center', width: '7%' },
          { name: 'Discounts', key: 'totalDiscounts', justify: 'center', width: '7%' },
          { name: 'Amount To Pay', key: 'totalAmountToPay', justify: 'center', width: '7%' },
          { name: 'Action', justify: 'center', width: '2fr' }
        ]}
        bgRow={2}
        pointer
        handleAdd={() => handleMenu(4)}
        // data={data?.filter(x => x.pName !== 0 && x)}
        data={data?.getAllCommissionStatementsFrom}
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
              <TableButton backgroundColor={TBGAColor} color={SCColor}>
                Download
              </TableButton>
              <TableButton backgroundColor={TBGBColor} color={PVColor} onClick={() => handlePreview(x)}>
                View
              </TableButton>
              <TableButton backgroundColor={TBGBColor} color={TFBColor} onClick={() => handlePreview(x)}>
                Share
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
      <AwesomeModal
        show={modal}
        backdrop
        onHide={() => setModal(false)}
        onCancel={() => false}
        btnCancel={false}
        btnConfirm={false}
        header={true}
        size="large"
        height='100vh'
        width='100%'
        footer={false}
      >
        {modal && <ViewCommissionStatements
          data={dataStatement}
          loading={loading}
        />}
      </AwesomeModal>
    </Container>
  )
}