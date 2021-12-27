import { useContext, useState } from "react"
import { useQuery } from "@apollo/client"
import { Context } from "../../context"
import { Loading } from "../../components/Loading"
import { GET_ONE_PAY_INVOICE } from "./queries"
import reactElementToJSXString from 'react-element-to-jsx-string';
import { dateFormat } from "../../utils"
import { useCopy } from "../../components/hooks/useCopy"
import { IconCopy, IconExcel, IconPDF, IconShowEye, IconWord } from "../../public/icons"
import { BGColor, PColor, PVColor } from "../../public/colors"
import { Card, Container, Text, Title, FooterInfoCard, CntTextArea, Content, CardInner, flexCenter, Row, RowGrid, Anchor } from "./styled"
import { generatePdfDocument } from "./PdfInvoicePay"
import ActiveLink from "../../components/common/Link"
import { RippleButton } from "../../components/Ripple"
import { AwesomeModal } from "../../components/AwesomeModal"

export const ViewComponentInvoice = ({ idInvoice }) => {
    const { company } = useContext(Context)
    const [open, setOpen] = useState(false)
    const [openEx, setOpenopenEx] = useState(false)

    const { data: dataInvoice, loading } = useQuery(GET_ONE_PAY_INVOICE, { variables: { idComp: company.idLasComp && company.idLasComp, idInvoice }, fetchPolicy: 'cache-and-network' })
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
    const handleDownload = () => {
        setOpen(!open);
    };
    <></>
    // GET_ONE_PAY_INVOICE
    if (loading) return <Loading />
    console.log(reactElementToJSXString(<div a="1" b="2">{10 * 10}</div>));
    return (
        <Content>
            <AwesomeModal zIndex='88' padding='20px' height='200px' show={open} onHide={() => setOpen(false)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <Row>
                    <RippleButton widthButton={'100%'} bgColor={'transparent'} onClick={() => setOpenopenEx(!openEx)}><IconPDF size='50px' /></RippleButton>
                    <RippleButton widthButton={'100%'} bgColor={'transparent'} onClick={() => setOpenopenEx(!openEx)}><IconWord size='100px' /></RippleButton>
                    <RippleButton widthButton={'100%'} bgColor={'transparent'} onClick={() => setOpenopenEx(!openEx)}><IconExcel size='100px' /></RippleButton>
                </Row>
            </AwesomeModal>
            <AwesomeModal zIndex='88' padding='20px' height='200px' show={openEx} onHide={() => setOpenopenEx(false)} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
                <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => generatePdfDocument({ dataInvoice: { ...dataInvoice }  })}
                    type='button' width='40%' padding='6px 10px' margin='0 0 10px auto' >
                    Descargar
                </RippleButton>
            </AwesomeModal>
            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleDownload()}>DownLoad</RippleButton>
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
                                    <ActiveLink activeClassName="active" href={`/invoice/${x.idInvoice}`}>
                                        <Anchor>
                                            <IconShowEye size='18px' color={PVColor} />
                                        </Anchor>
                                    </ActiveLink>
                                </RowGrid>
                            </Container>
                        )) : <Title size='30px'>No data</Title>}
                        <FooterInfoCard>
                            <RippleButton widthButton={'100%'} bgColor={'#0069ff'} onClick={() => handleDownload()}>Done</RippleButton>
                            <Text margin='0 35px' size='30px'>TOTAL:</Text>
                            <Text margin='0 35px' color={PVColor} size='30px'>{data.totalInvoicePayment}</Text>
                        </FooterInfoCard>
                    </CardInner>
                </Card>
            </Container>
        </Content>
    )
}
