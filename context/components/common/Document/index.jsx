import React from 'react'
import PropTypes from 'prop-types'
import { Document as PdfDocument, View as PdfView, Text as PdfText } from '@react-pdf/renderer'
import styled from 'styled-components'
import { BColor } from '@/public/colors'
import styles from './styles'

export const Document = ({ pdfMode, children }) => {
    return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}
export const TextPdf = ({ className, pdfMode, children, color, size, bold }) => {
    return (
        <>
            {pdfMode
                ? (
                    <PdfText>{children}</PdfText>
                )
                : (
                    <TextSpan bold={bold} color={color} size={size} className={`span ${ className || '' }`}>{children}</TextSpan>
                )}
        </>
    )
}

export const View = ({ pdfMode, children, style }) => {
    return (
        <>
            {pdfMode
                ? (
                    <PdfView style={style}>{children}</PdfView>
                )
                : (
                    <div>{children}</div>
                )}
        </>
    )
}
export const compose = classes => {
    const css = {}
    const classesArray = classes.replace(/\s+/g, ' ').split(' ')
    classesArray.forEach(className => {
        if (typeof styles[className] !== 'undefined') {
            Object.assign(css, styles[className])
        }
    })
    return css
}
const TextSpan = styled.span`
  width: ${ ({ width }) => width || '100%' };
  font-family: PFont-Light;
  font-weight: ${ ({ bold }) => bold || 'inherit' };
  color: ${ ({ color }) => color || `${ BColor }` };
  font-size: ${ ({ size }) => size || '16px' };
`
Document.propTypes = {
    children: PropTypes.element,
    color: PropTypes.string,
    size: PropTypes.string,
    bold: PropTypes.string,
    className: PropTypes.string,
    pdfMode: PropTypes.bool

}
View.propTypes = {
    children: PropTypes.element,
    color: PropTypes.string,
    style: PropTypes.string,
    size: PropTypes.string,
    bold: PropTypes.string,
    className: PropTypes.string,
    pdfMode: PropTypes.bool

}
TextPdf.propTypes = {
    children: PropTypes.element,
    color: PropTypes.string,
    size: PropTypes.string,
    bold: PropTypes.string,
    className: PropTypes.string,
    pdfMode: PropTypes.bool

}
