import { dateFormat } from "../../utils"

export const TemplateInvoicePaid = ({ invoiceRef, uEmail, statusInvoice, date, hour, invoiceTo, invoiceFrom}) => {
    return `
    <!doctype html>
    <html><link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">body{display:flex !important;flex-direction:column !important;margin:0 !important;}</style>
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Invoice Dateils</title>
    
    </head>
    
    <body class="" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;background-color: #f6f6f6;font-family: Arial,sans-serif;-webkit-font-smoothing: antialiased;font-size: 14px;line-height: 1.4;height: 100% !important;width: 100% !important;">
    
        <span class="preheader" style="color: transparent;display: none;height: 0;max-height: 0;max-width: 0;opacity: 0;overflow: hidden;mso-hide: all;visibility: hidden;width: 0;">
            Invoice Dateils
        </span>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;background-color: #f6f6f6;">
            <tr>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">&nbsp;</td>
                <td class="container-ext" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; display: block;max-width: 650px;width: 650px;margin: 0 auto !important;">
                    <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                        <tr>
                            <td class="main-top-content" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; background: #ffffff;box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);border-radius: 3px;width: 100%;">
                                <!-- Header section starts -->
                                <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                    <tr>
                                        <td class="avianca-header" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; background-color: #ffffff;">
                                            <table width="100" class="table-desktop" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                <tr>
                                                    <td class="av-icon-desktop" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-top: 16px;padding-left: 16px;padding-right: 415px;padding-bottom: 16px;">
                                                        <img src="https://www.spiceuk.com/Images/Spice-Logo.jpg" alt="Avianca Logo" height="40" border="0" style="-ms-interpolation-mode: bicubic;border: none;line-height: 100%;outline: none;text-decoration: none;max-width: 100%;">
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- Header section ends -->
                                <!-- Banner section starts -->
                                <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                    <tr>
                                        <td style="background-size: cover;background-image: url('https://www.phpinvoicescript.com/wp-content/uploads/invoice-management.jpg');-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                            <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                <tr>
                                                    <td class="your-booking-has-been" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 24px;vertical-align: top;color: white; line-height:1;padding-left: 32px;padding-top:96px">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="your-booking-has-been" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 32px;vertical-align: top;font-weight: bold;color: white; line-height:1;padding-left: 32px;padding-top: 16px;padding-right: 330px;">
                                                        A change has been made to your invoice
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="thank-you-for-your" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: normal;color: white;padding-left: 32px;padding-bottom: 47px;">
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- Banner section ends -->
                                <!-- Payment section starts -->
                                <table class="table-desktop" width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                    <tr>
                                        <td class="purchase-info-container" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-top: 24px;padding-left: 24px;padding-right: 24px;padding-bottom: 32px;">
                                            <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                <tr>
                                                    <td class="purchase-satatus" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 30px;vertical-align: top;font-weight: bold;color: #313541;padding-bottom: 32px;">
                                                        Invoice Status
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="first-info-row" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-bottom: 24px;">
                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                            <tr>
                                                                <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;" width="320">
                                                                    Invoice Ref
                                                                </td>
                                                                    <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;">
                                                                        Invoices Status
                                                                    </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="booking-code" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 20px;vertical-align: top;font-weight: normal;color: #1b1b1b;">
                                                                    ${invoiceRef}
                                                                </td>                                                            
                                                                    <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                            <tr>
                                                                                <td class="payment-status-value" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 24px;vertical-align: top;font-weight: bold;color: #1b1b1b;">
                                                                                    ${statusInvoice.toUpperCase()}
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                    <tr>
                                                    <td class="first-info-row" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-bottom: 24px;">
                                                            <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                <tr>
                                                                    <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;" width="320">
                                                                        Invoice From:
                                                                    </td>
                                                                    <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;">
                                                                        Invoice To:
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                            <tr>
                                                                                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                                                    <span class="credit-card-value" style="font-size: 24px;font-weight: normal;color: #1b1b1b;vertical-align:bottom">${invoiceFrom}</span>
                                                                                </td>
                                                                            </tr>
                                                                         </table>
                                                                    </td>
                                                                    <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                            <tr>
                                                                                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                                                    <span class="credit-card-value" style="font-size: 24px;font-weight: normal;color: #1b1b1b;vertical-align:bottom">${invoiceTo}</span>
                                                                                </td>
                                                                            </tr>
                                                                         </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                            <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                <tr>
                                                                    <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;" width="320">
                                                                        Change Date
                                                                    </td>
                                                                    <td class="top-panel-subheader" style="padding-bottom: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;vertical-align: top;font-weight: bold;color: #505055;">
                                                                        Change Hour
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                            <tr>
                                                                                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                                                    <span class="credit-card-value" style="font-size: 24px;font-weight: normal;color: #1b1b1b;vertical-align:bottom">${dateFormat(date)}</span>
                                                                                </td>
                                                                            </tr>
                                                                         </table>
                                                                    </td>
                                                                    <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <table width="100" role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                                            <tr>
                                                                                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">
                                                                                    
                                                                                    <span class="credit-card-value" style="font-size: 24px;font-weight: normal;color: #1b1b1b;vertical-align:bottom">${hour}</span>
                                                                                </td>
                                                                            </tr>
                                                                         </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- Payment section ends -->
                            </td>
                        </tr>
                    </table>
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">&nbsp;</td>
            </tr>
        </table>
    
       
        <!-- Whats Next section ends -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;background-color: #f6f6f6;">
            <tr>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">&nbsp;</td>
                <td class="container" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-top: 24px;display: block;max-width: 650px;width: 650px;margin: 0 auto !important;">
                        <!-- BeforeFlight section starts -->
                        <table role="presentation" class="main-bottom-content" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;background: #ffffff;box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);border-radius: 3px;">
    
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;background-color: #f6f6f6;" width="100%">
                            <tr>
                                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">&nbsp;</td>
                                <td class="container" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; display: block;max-width: 650px;width: 650px;margin: 0 auto !important;">
                                    <!-- Need help section starts -->
                                    <table role="presentation" class="main-bottom-content" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;background: #ffffff;box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.08);border-radius: 3px;">
                                        <tr>
                                            <td class="wrapper-heading" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; padding-top: 24px;padding-left: 22px;padding-bottom: 19px;padding-right: 46px;">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                                                    <tr>
                                                        <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;">
                                                            <p class="heading-before-fligth" style="display: inline;font-size: 16px;font-weight: bold;font-stretch: normal;font-style: normal;line-height: 1.33;letter-spacing: normal;color: #313541;margin: 0 !important;">
                                                                Need help?
                                                            </p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <table role="presentation">
                                                            <tr>
                                                                <td>
                                                                    <img src="https://wftc1.e-travel.com/go/templateAssets/phone-icon.png?SITE=ADYOANEW" height="15"/>
                                                                </td>
                                                                <td>
                                                                    <p class="heading-before-fligth" style="display: inline;font-size: 16px;font-stretch: normal;font-style: normal;line-height: 1.33;letter-spacing: normal;color: #313541;margin: 0 !important;">
                                                                        You can call us at (+57) 00000-00-00.
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
    
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!-- NeedHelp section ends -->
                        <!-- Footer section starts -->
                        <table border="0" cellpadding="0" cellspacing="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-collapse: separate;width: 100%;">
                            <tr>
                                <td class="footer-text" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 12px;vertical-align: top;width: 481px;height: 16px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.33;letter-spacing: normal;text-align: center;color: #505055;padding-top: 16px;padding-bottom: 16px;padding-left: 85px;padding-right: 84px;">
                                    Smartreportz S.A – 2022 Copyright © All rights reserved
                                </td>
                            </tr>
                        </table>
                        <!-- Footer section ends -->
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 14px;vertical-align: top; ">&nbsp;</td>
            </tr>
        </table>
    `
}

export const isApprovedInvoiceSenderStatement = ({ invoiceRef, uEmail, statusInvoice, date, hour }) => {
    return `<!DOCTYPE html>
    <html lang="es">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet" />
    <style type="text/css">
        body {
            display: flex !important;
            flex-direction: column !important;
            margin: 0 !important;
        }
    </style>
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Email</title>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
    
            img {
                border: 0 none;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            a img {
                border: 0 none;
            }
    
            .imageFix {
                display: block;
            }
    
            table,
            td {
                border-collapse: collapse;
            }
    
            #bodyTable {
                height: 100% !important;
                margin: 0;
                padding: 0;
                width: 100% !important;
            }
    
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
    
            @media only screen and (max-device-width: 480px) {
                .block {
                    display: block;
                    border: 1px solid red;
                }
            }
        </style>
    </head>
    
    <body style="color: #595756">
        <table role="presentation" min-width="400px" max-width="700px" border="0" bgcolor="#ffffff" cellpadding="0"
            cellspacing="0" style="margin: 0 auto">
            <tr>
                <td height="40px">&nbsp;</td>
            </tr>
            <tr>
                <td align="center" cellpadding="0"> <a href="#" aria-label="Go to website">
                        <img src="https://www.spiceuk.com/Images/Spice-Logo.jpg"
                            style="margin: 0 auto;" /> </a> </td>
            </tr>
            <tr>
                <td align="center"> <span style="text-align: center; font-size: 30px; font-weight: bold;">
                        <p style="margin: 40px 0 0;"> Status Redo</p>
                    </span>  </td>
            </tr>
			<tr>
                <td align="center"> 
                    <span style="text-align: center; font-size: 30px; font-weight: bold;">
                        <p style="margin: 40px 0 0;"> 
                            Invoice From
                        </p>
                    </span> 
                    <span style="text-align: center; font-size: 18px; margin: 5px 60px 30px; display: block;"> 
                        This is the code to access your account: 
                    </span> 
                </td>
            </tr>
            
            <tr>
                <td align="center"> 
                    <span style="text-align: center; font-size: 30px; font-weight: bold;">
                        <p style="margin: 40px 0 0;"> 
                            Invoice From
                        </p>
                    </span> 
                    <span style="text-align: center; font-size: 18px; margin: 5px 60px 30px; display: block;"> 
                        This is the code to access your account: 
                    </span> 
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center"> <span
                                    style="text-align: center; font-size: 16px; margin: 20px 0 40px; display: block; color: #A6A29F;">
                                    This code is valid for 15 minutes, counted from the receipt of this email </span> </td>
                        </tr>
                    </table>
                </td>
            </tr>
           
            <tr>
                <td>
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="10"
                        style="margin: 60px auto 0">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" align="center" cellpadding="0" cellspacing="10">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="10">
                        <tr>
                            <td height="1" bgcolor="#F5F0EB"></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td heigth="40px">&nbsp;</td>
            </tr>
            <tr>
                <td> <span style="text-align: center; font-size: 14px; color: #A6A29F; line-height: 18px;">
                        <p style="margin: 0;"> &copy; 2022 Smart Accounting - All rights reserved. </p>
                        <p style="margin: 0;"> This is an automatic email </p>
                    </span> </td>
            </tr>
        </table>
    </body>
    
    </html> `
}

export const InvoicePaidTemplate = ({ idComp, today, hour, uEmail }) => {
    return `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
<!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		@media (max-width:700px) {
			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}
		}
	</style>
</head>
<body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>

<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ede1ff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ede1ff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<div class="spacer_block" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<div style="font-size: 11px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 11px; text-align: center;"><span style="font-size:90;"><strong><span style=""> Hi, ${uEmail}</span></strong></span></p>
</div>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #4d36f8;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:45px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:20;"><strong><span style="">${today}</span></strong></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:45px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:20px;"><strong><span style="">${hour}</span></strong></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:45px;">
<div style="font-family: sans-serif">
<div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:20;"><strong><span style=""></span></strong></span></p>
</div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #4d36f8;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 45px; padding-bottom: 30px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="10" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td>
<div align="center">
<td style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/invoice/view/[0]" style="height:48px;width:161px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/invoice/view/${idComp}" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">View to Invoice Paid Report</span></span></a>
<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="width:100%;padding-right:0px;padding-left:0px;">
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="text-align:center;">
<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
<!--<![endif]-->
<tr>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>
    `
}
