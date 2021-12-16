/* eslint-disable react/prop-types */
/* eslint-disable indent */
import { compose } from '../../components/common/Document'
import { dateFormat } from '../../utils'
import { Document as PdfDocument, Page, PDFDownloadLink, Text as PdfText, View as PdfView, StyleSheet, Font } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BGColor, BColor, SECColor } from '../../public/colors'
import { IconPDF, IconShowEye } from '../../public/icons'
export const DocumentPdf = ({ invoice }) => {
  const Menu = () => (
    <Container>
      <PDFDownloadLink document={<PDF pdfMode={true} invoice={invoice} />} fileName={invoice ? invoice.eventName : 'PDF'} >
        {({ url, loading }) => (loading ? 'Loading document...' : <div> <Link href={url}><IconShowEye size='80px' color='' /></Link> <Button type="button"><IconPDF size='80px' /></Button></div>)}
      </PDFDownloadLink>
    </Container>
  )

  return (
    <div>
      <Menu />
      {invoice
        ? (
          <>
            <PDF invoice={invoice} />
          </>
        )
        : null}
    </div>
  )
}

const PDF = ({ pdfMode, invoice }) => {
  const styles = StyleSheet.create({
    page: {
      color: '#000',
      padding: '30px'

    },
    section: { color: 'white', textAlign: 'center', margin: 30 },
    row: {
      display: 'flex',
      flexDirection: 'row'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      width: '100px'
    },
    header: {
      backgroundColor: '#0e8900',
      height: '40px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    },
    text: {
      fontSize: '10px'
    },
    title: {
      fontSize: '25px'
    },
    textCard: {
      fontSize: '10px'
    },
    cardInfo: {
      backgroundColor: '#000',
      fontSize: '25px'
    }
  })
  return (
    <Document pdfMode={pdfMode}>
      <Page style={styles.page}>
        <View pdfMode={pdfMode}>
          <View pdfMode={pdfMode} >
            <Text className="fs-20 bold" pdfMode={pdfMode} size="30px">INVOICE</Text>
            <Text className="fs-20 bold" pdfMode={pdfMode} size="30px">{invoice?.isPaid === true ? 'PAYMENT' : ' NO PAYMENT' }</Text>
          </View>
          <View margin='10px 0' pdfMode={pdfMode} >
            <Text className="fs-15 mb-5" pdfMode={pdfMode} color={BColor} size="14px">Event Name: {invoice?.eventName}</Text>
          </View>
          <View margin='10px 0' pdfMode={pdfMode} >
            <Text className="fs-15 mb-5" style={styles.text} pdfMode={pdfMode} color={BColor} size="14px">Event commences: {dateFormat(invoice?.eventCommences)}</Text>
          </View>
          <View margin='10px 0' pdfMode={pdfMode} >
            <Text className="fs-15 mb-5" style={styles.text} pdfMode={pdfMode} color={BColor} size="14px">Invoice From: {invoice?.invoiceFrom}</Text>
          </View>
          <View margin='10px 0' pdfMode={pdfMode} >
            <Text className="fs-15 mb-5" style={styles.text} pdfMode={pdfMode} color={BColor} size="14px">Invoice To: {invoice?.invoiceTo}</Text>
          </View>
          <View margin='10px 0' pdfMode={pdfMode} >
            <Text className="fs-15 mb-5" style={styles.text} pdfMode={pdfMode} color={BColor} size="14px">Invoice Date: {dateFormat(invoice?.uploaded)}</Text>
          </View>
        </View>
        <View direction="row" className="bg-dark flex" bgColor={SECColor} alignItems='center' justifyContent='center' display='flex' margin='10px 0' pdfMode={pdfMode} style={styles.header}>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">TICKET TYPE</Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">TICKET PRICE</Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">TICKET CATEGORY TOTAL DUE </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">TOTAL CATEGORY DISCOUNT </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">SUBTOTAL FOR TICKET  DISCOUNT </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">SUBTOTAL TICKET SOLD </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">SUBTOTAL SALES RECEIVED </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">SUBTOTAL COMMISSION DUE </Text>
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text className="fs-10 white bold" width="11%" pdfMode={pdfMode} color={BGColor} size="11px">SUBTOTAL INVOICE </Text>
          </View>
        </View>
        {invoice && invoice?.lineItemsArray?.map(x => (
          <View margin='10px 0' className="row flex" padding='10px 0' borderButton='1px solid' direction="row" pdfMode={pdfMode} key={x._id}>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.tickettype}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.ticketPrice}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.ticketcategorytotaldue}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.totalcategorydiscount}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.subtotalforticketypelessDiscount}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.subtotal_tickets_sold}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.subtotal_sales_received}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.subtotal_comm_due}</Text>
            </View>
            <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
              <Text className="fs-10 bold" width="11%" pdfMode={pdfMode} color={BColor} size="14px">{x.subinvoice_total}</Text>
            </View>
          </View>
        ))}
        <View direction="column" alignItems='flex-end' justifyContent='flex-end' display='flex' margin='20px 0' pdfMode={pdfMode} style={styles.cardInfo}>
          <View className="bg-dark" padding='20px' direction="column" width="300px" bgColor={SECColor} alignItems='flex-end' justifyContent='space-between' display='flex' margin='20px 0' pdfMode={pdfMode} style={styles.header}>
            <View justifyContent='space-between' direction="row" pdfMode={pdfMode} >
              <Text textAlign='start' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px" >INVOICE TOTAL: </Text>
              <Text textAlign='end' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px" >{invoice?.invoice_total ? invoice?.invoice_total : 0}</Text>
            </View>
            <View direction="row" pdfMode={pdfMode} >
              <Text textAlign='start' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px">TOTAL DISCOUNT: </Text>
              <Text textAlign='end' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px"> &nbsp;  &nbsp;{invoice?.totalDiscounts ? invoice?.totalDiscounts : 0}</Text>
            </View>
            <View direction="row" pdfMode={pdfMode} >
              <Text textAlign='start' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px">TOTAL COMMISSION DUE: </Text>
              <Text textAlign='end' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px"> &nbsp;  &nbsp;{invoice?.total_comm_due ? invoice?.total_comm_due : 0}</Text>
            </View>
            <View direction="row" pdfMode={pdfMode} >
              <Text textAlign='start' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px">TOTAL SALES RECEIVED: </Text>
              <Text textAlign='end' style={styles.text} pdfMode={pdfMode} color={BGColor} size="14px"> &nbsp;  &nbsp;{invoice?.total_sales_received ? invoice?.total_sales_received : 0}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export const Document = ({ pdfMode, children }) => {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}

const View = ({ pdfMode, children, className, margin, display, direction, bgColor, justifyContent, alignItems, width, padding, border, borderButton }) => {
  return (
    <>
      {pdfMode
        ? (
          <PdfView style={compose(`span ${className ? className : ''}`)}>{children}</PdfView>
        )
        : (
          <Card border={border} borderButton={borderButton} margin={margin} display={display} direction={direction} width={width} padding={padding} alignItems={alignItems} justifyContent={justifyContent} bgColor={bgColor}>{children}</Card>
        )}
    </>
  )
}

const Text = ({ className, pdfMode, children, color, size, bold, margin, width, textAlign }) => {
  return (
    <>
      {pdfMode
        ? (
          <PdfText style={compose(`span ${className ? className : ''}`)}>{children}</PdfText>
        )
        : (
          <TextSpan className={`span ${className ? className : ''}`} bold={bold} textAlign={textAlign} color={color} size={size} margin={margin} width={width} >{children}</TextSpan>
        )}
    </>
  )
}

const Card = styled.div`
  width: ${({ width }) => width || '100%'};
  padding: ${({ padding }) => padding || '0'};
  display: ${({ display }) => display || 'flex'};
  ${({ bgColor }) => bgColor && css`background-color: ${bgColor};`}
  ${({ justifyContent }) => justifyContent && css`justify-content: ${justifyContent};`}
  ${({ margin }) => margin && css`margin: ${margin};`}
  ${({ alignItems }) => alignItems && css`align-items: ${alignItems};`}
  ${({ border }) => border && css`border: ${border};`}
  ${({ borderButton }) => borderButton && css`border-bottom: ${borderButton};`}
  flex-direction: ${({ direction }) => direction || 'column'};
`
const TextSpan = styled.span`
  width: ${({ width }) => width || '100%'};
  ${({ textAlign }) => textAlign && css`text-align: ${textAlign};`}
  font-family: PFont-Light;
  font-weight: ${({ bold }) => bold || 'inherit'};
  color: ${({ color }) => color || `${BColor}`};
  margin: ${({ margin }) => margin || '0'};
  font-size: ${({ size }) => size || '16px'};
`
const Container = styled.div`
    position: fixed;
    top: 100px;
    width: 40px;
    left: -200px;
    height: 40px;
`
const Button = styled.button`
  background-color: transparent;
  position: relative;
  border-radius: 20px;
  `
const Link = styled.a`
  background-color: transparent;
`
DocumentPdf.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  optionName: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.array,
  accessor: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  pdfMode: PropTypes.bool
}
PDF.propTypes = {
  onChange: PropTypes.func,
  invoice: PropTypes.array,
  className: PropTypes.string,
  optionName: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.array,
  accessor: PropTypes.array,
  dataForm: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  pdfMode: PropTypes.bool
}
