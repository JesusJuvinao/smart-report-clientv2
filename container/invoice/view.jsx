import { useQuery } from "@apollo/client"
import { useContext } from "react"
import { Context } from "../../context"
import { Loading } from "../../components/Loading"
import { GET_ONE_PAY_INVOICE } from "./queries"
import reactElementToJSXString from 'react-element-to-jsx-string';
import { dateFormat } from "../../utils"
import { useCopy } from "../../components/hooks/useCopy"
import { IconCopy } from "../../public/icons"
import { BGColor, PColor, PVColor } from "../../public/colors"
import { Card, Container, Text, Title, FooterInfoCard, CntTextArea, Content, CardInner, flexCenter, Row, RowGrid } from "./styled"
import ActiveLink from "../../components/common/Link"
export const ViewComponentInvoice = ({ idInvoice }) => {
    console.log(idInvoice)
    const { company } = useContext(Context)

    const { data: dataInvoice, loading } = useQuery(GET_ONE_PAY_INVOICE, { variables: { idComp: company.idLasComp && company.idLasComp, idInvoice }, fetchPolicy: 'cache-and-network' })
    console.log(dataInvoice)
    // const [handleCopy, copiedText, copiedTextLength] = useCopy();
    const Copy = useCopy();
    const CopyDescription = useCopy();
    const data = dataInvoice?.getOneInvoicePay
    const handleCopyText = () => {
        Copy.handleCopy(data?.IdRef);
    };
    const handleCopyTextDescr = () => {
        CopyDescription.handleCopy(data?.Idescription);
    };
    // GET_ONE_PAY_INVOICE
    if (loading) return <Loading />
    console.log(reactElementToJSXString(<div a="1" b="2">{10 * 10}</div>));
    return (
        <Content>
            <Title size='30px'>View Invoice</Title>
            <Container justify='space-between' direction='row' display='flex'>
                <Card width='30%'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text margin='0' size='17px' color='#ccc'># {data?.IdRef}</Text>
                        <button style={{ backgroundColor: 'transparent' }} onClick={() => handleCopyText()}><IconCopy size='30px' color={Copy.copiedText ? PColor : ''} /></button>
                    </div>
                    <Text margin='10px 0' size='16px'>{dateFormat(data?.Date)}</Text>
                    <Text margin='30px 0 0 0' size='16px' >Description </Text>
                    <CntTextArea style={{ borderColor: CopyDescription.copiedText ? PColor : 'rgba(0,0,0,0.1)' }} onClick={() => handleCopyTextDescr()}>
                        {data?.Idescription}
                    </CntTextArea>
                </Card>
                <Card width='50%'>
                    <CardInner>
                        <RowGrid>
                            <Text margin='5px' size='18px' >Currency</Text>
                            <Text margin='5px' size='18px' >Email</Text>
                            <Text margin='5px' size='18px' ># Number</Text>
                            <Text margin='5px' size='18px' >Post Code</Text>
                            <Text margin='5px' size='18px' >View Invoice</Text>
                        </RowGrid>
                        {data ? data?.lineItemsInvoiceIsPay?.map(x => (
                            <Container key={x._id}>
                                <RowGrid>
                                    <Text overflow='hidden' margin='10px 5px' >{x.currency}</Text>
                                    <Text overflow='hidden' margin='10px 5px' >{x.agentDetails.agentEmail}</Text>
                                    <Text overflow='hidden' margin='10px 5px' >{x.agentDetails.agentCompanyNumber}</Text>
                                    <Text overflow='hidden' margin='10px 5px' >{x.agentDetails.agentPostCode}</Text>
                                    <ActiveLink activeClassName="active" href='/bills/invite'>
                                        <a>
                                            <Text>{x.idInvoice}</Text>
                                        </a>
                                    </ActiveLink>
                                </RowGrid>
                            </Container>
                        )) : <Title size='30px'>No data</Title>}
                        <FooterInfoCard>
                            <Text margin='0 35px' size='30px'>TOTAL</Text>
                            <Text margin='0 35px' color={PVColor} size='30px'>{data.totalInvoicePayment}</Text>
                        </FooterInfoCard>
                    </CardInner>
                </Card>
            </Container>
        </Content>
    )
}