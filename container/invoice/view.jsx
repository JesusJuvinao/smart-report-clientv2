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
import { Card, Container, Text, Title, FooterInfoCard, CntTextArea, Content } from "./styled"
export const ViewComponentInvoice = ({ idInvoice }) => {
    console.log(idInvoice)
    const { company } = useContext(Context)

    const { data: dataInvoice, loading } = useQuery(GET_ONE_PAY_INVOICE, { variables: { idComp: company.idLasComp && company.idLasComp, idInvoice }, fetchPolicy: 'cache-and-network' })
    console.log(dataInvoice)
    const [handleCopy, copiedText, copiedTextLength] = useCopy();
    const data = dataInvoice?.getOneInvoicePay
    const handleCopyText = () => {
        handleCopy(data?.IdRef);
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
                        <button style={{ backgroundColor: 'transparent' }} onClick={() => handleCopyText()}><IconCopy size='30px' color={copiedText ?  PColor : ''} /></button>
                    </div>
                    <Text margin='10px 0' size='16px'>{dateFormat(data?.Date)}</Text>
                    <Text margin='30px 0 0 0' size='16px' >Description </Text>
                    <CntTextArea>
                        {data?.Idescription}
                    </CntTextArea>
                </Card>
                <Card width='50%'>
                    {data ? data?.lineItemsInvoiceIsPay?.map(x => (
                        <li key={x._id}>Hi</li>
                    )) : <Title size='30px'>No data</Title>}
                    <FooterInfoCard>
                        <Text margin='0 35px' size='30px'>TOTAL</Text>
                        <Text margin='0 35px' color={PVColor} size='30px'>{data.totalInvoicePayment}</Text>
                    </FooterInfoCard>
                </Card>
            </Container>
        </Content>
    )
}