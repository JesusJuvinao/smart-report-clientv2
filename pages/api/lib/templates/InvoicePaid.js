export const TemplateInvoicePaid = ({ invoiceRef, uEmail, statusInvoice, date, hour }) => {
	return `
    <!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
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

		@media (max-width:670px) {
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
<body style="background-color: #fbfbfb; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fbfbfb;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="padding-bottom:20px;padding-left:10px;width:100%;padding-right:0px;">
<div align="center" style="line-height:10px"><img src="https://www.spiceuk.com/Images/Spice-Logo.jpg" alt="SpiceLogo" style="display: block; height: auto; border: 0; width: 130px; max-width: 100%;" title="Logo" width="130"/></div>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d12432;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td style="padding-left:10px;padding-right:10px;padding-top:25px;">
<div style="font-family: sans-serif">
<div style="font-size: 14px; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 16.8px; color: #ffffff; line-height: 1.2;">
<p style="margin: 0; font-size: 30px; text-align: center;"><strong><span style="font-size:38px;">Hi!</span></strong></p>
</div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td style="padding-left:10px;padding-right:10px;padding-top:10px;">
<div style="font-family: sans-serif">
<div style="font-size: 14px; mso-line-height-alt: 21px; color: #ffffff; line-height: 1.5; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 33px;"><span style="font-size:22px;color:#fff;">The  user   <span>${uEmail} </span> has confirmed the status of the invoice event ${invoiceRef} as ${statusInvoice}</span></p>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d12432;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="color:#ffffff;font-family:inherit;font-size:21px;text-align:center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="text-align:center;">
<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
<!--<![endif]-->
<tr>
<td style="font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:21px;color:#ffffff;vertical-align:middle;letter-spacing:undefined;text-align:center;">${date}</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="color:#ffffff;font-family:inherit;font-size:20px;padding-bottom:15px;text-align:center;">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td style="text-align:center;">
<!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
<!--<![endif]-->
<tr>
<td style="font-family:Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:20px;color:#ffffff;vertical-align:middle;letter-spacing:undefined;text-align:center;">${hour}</td>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d12432;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
<tbody>
<tr>
<td class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="empty_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td>
<div></div>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px;" width="650">
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

export const isApprovedInvoiceSenderStatement = ({ invoiceRef, uEmail, statusInvoice, date, hour }) => {
	return `<!DOCTYPE html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Simple Transactional Email</title>
		<style>
		  /* -------------------------------------
			  GLOBAL RESETS
		  ------------------------------------- */
	
		  /*All the styling goes here*/
	
		  img {
			border: none;
			-ms-interpolation-mode: bicubic;
			max-width: 100%;
		  }
	
		  body {
			background-color: #f6f6f6;
			font-family: sans-serif;
			-webkit-font-smoothing: antialiased;
			font-size: 14px;
			line-height: 1.4;
			margin: 0;
			padding: 0;
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		  }
	
		  table {
			border-collapse: separate;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
			width: 100%;
		  }
		  table td {
			font-family: sans-serif;
			font-size: 14px;
			vertical-align: top;
		  }
	
		  /* -------------------------------------
			  BODY & CONTAINER
		  ------------------------------------- */
	
		  .body {
			background-color: #f6f6f6;
			width: 100%;
		  }
	
		  /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
		  .container {
			display: block;
			margin: 0 auto !important;
			background: white
			/* makes it centered */
			max-width: 580px;
			padding: 10px;
			width: 580px;
		  }
	
		  /* This should also be a block element, so that it will fill 100% of the .container */
		  .content {
			box-sizing: border-box;
			display: block;
			margin: 0 auto;
			max-width: 580px;
			
			background: white;
		  }
	
		  /* -------------------------------------
			  HEADER, FOOTER, MAIN
		  ------------------------------------- */
		  .main {
			background: #ffffff;
			border-radius: 3px;
			width: 100%;
		  }
	
		  .wrapper {
			box-sizing: border-box;
			padding: 20px;
		  }
	
		  .content-block {
			padding-bottom: 10px;
			padding-top: 10px;
		  }
	
		  .footer {
			background-color: #263238;
			clear: both;
			margin-top: 10px;
			text-align: center;
			width: 100%;
		  }
		  .footer td,
		  .footer p,
		  .footer span,
		  .footer a {
			color: #ffffff;
			font: Arial;
			font-size: 12px;
			font-weight: 400;
			text-align: left;
			margin: 8px 0px;
			font-size: 16px;
			line-height: 143%;
			margin-left: 20px;
		  }
	
		  /* -------------------------------------
			  TYPOGRAPHY
		  ------------------------------------- */
		  h1,
		  h2,
		  h3,
		  h4 {
			color: #000000;
			font-family: sans-serif;
			font-weight: 400;
			line-height: 1.4;
			margin: 0;
			margin-bottom: 30px;
		  }
	
		  h1 {
			font-size: 35px;
			font-weight: 300;
			text-align: center;
			text-transform: capitalize;
		  }
	
		  p,
		  ul,
		  ol {
			font-family: sans-serif;
			font-size: 14px;
			font-weight: normal;
			margin: 0;
			margin-bottom: 15px;
		  }
		  p li,
		  ul li,
		  ol li {
			list-style-position: inside;
			margin-left: 5px;
		  }
	
		  a {
			color: #3498db;
			text-decoration: underline;
		  }
	
		  /* -------------------------------------
			  BUTTONS
		  ------------------------------------- */
		  .btn {
			box-sizing: border-box;
			width: 100%;
		  }
		  .btn > tbody > tr > td {
			padding-bottom: 15px;
		  }
		  .btn table {
			width: auto;
		  }
		  .btn table td {
			background-color: #ffffff;
			border-radius: 5px;
			text-align: center;
		  }
		  .btn a {
			background-color: #ffffff;
			
			border-radius: 5px;
			box-sizing: border-box;
		   
			cursor: pointer;
			display: inline-block;
			font-size: 14px;
			font-weight: bold;
			margin: 0;
			padding: 12px 25px;
			text-decoration: none;
			text-transform: capitalize;
		  }
	
		  .btn-primary table td {
			background-color: #90C928;
		  }
	
		  .btn-primary a {
			background-color: #90C928;
			color: #263238;
	
		  }
			/* -------------------------------------
			  LIST VIEW DISPLAY 
		  ------------------------------------- */
		  * {
		
		box-sizing: border-box;
	  }
	  
	  .row {
			  border: 1px solid #ddd;
		  margin-bottom: -1px;
	  }
	  .outerBox {
		
		  border-radius: 6px;
		box-sizing: border-box;
		
		
	  }
	  .outerBox1 {
		
		border-radius: 6px;
	  box-sizing: border-box;
	  background:#FAFAFA;
	  
	  
	}
	  .top {
		  border-top-right-radius: 4px;
		  padding:10px;
		  border-top-left-radius: 4px;
	  }
	  .bottom {
		  border-bottom-right-radius: 4px;
		  border-bottom-left-radius: 4px;
	  }
	  /* Create two equal columns that floats next to each other */
	  .column {
		float: left;
		
		width: 50%;
		padding: 10px;
	  }
	  
	  /* Clear floats after the columns */
	  .row:after {
		content: "";
		display: table;
		
		clear: both;
	  }
	
	
	/* Create two equal columns that floats next to each other */
	.column {
	  float: left;
	  
	  width: 50%;
	  padding: 24px;
	}
	.column1 {
	  float: left;
	  
	  width: 10%;
	  padding: 8px;
	  height: 60px;
	  
	}
	.column2 {
	  float: left;
	  
	  width: 40%;
	  padding: 10px;
	  
	}
	.column3 {
	  float: left;
	  
	  width: 80%;
	  padding: 10px;
	  
	}
	.column4 {
	  float: left;
	  
	  width: 20%;
	  padding: 10px;
	  
	}
	
	/* Clear floats after the columns */
	.row:after {
	  content: "";
	  display: table;
	  
	  clear: both;
	}
	
	/*Styles the labels*/
	.fbOrderNo{
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	
	margin-left:10px;
	font-size: 16px;
	line-height: 137.5%;
	color: #263238;
	}
	.fbTitle{
	position: static;
	width: 239px;
	height: 20px;
	
	margin-top:4px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 142.86%;
	/* identical to box height, or 20px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	
	
	}
	.fbTitle2{
	position: static;
	width: 239px;
	height: 20px;
	
	margin-top:26px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 142.86%;
	/* identical to box height, or 20px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	
	
	}
	.fbTitle1{
	position: static;
	width: 239px;
	height: 20px;
	
	margin-top:4px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 142.86%;
	/* identical to box height, or 20px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	
	
	}
	.fbSubTitle{
	
	position: static;
	width: 239px;
	height: 22px;
	left: 0px;
	top: 28px;
	margin-top:8px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 137.5%;
	/* identical to box height, or 22px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	}
	
	.sbTitle{
	position: static;
	width: 239px;
	height: 20px;
	
	margin-top:4px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 142.86%;
	/* identical to box height, or 20px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	
	
	}
	.sbTitle1{
	position: static;
	width: 239px;
	height: 20px;
	
	margin-top:24px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
	line-height: 142.86%;
	/* identical to box height, or 20px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	
	
	}
	.sbSubTitle{
	
	position: static;
	width: 239px;
	height: 22px;
	left: 0px;
	top: 28px;
	margin-top:4px;
	margin-left:24px;
	font-family: Arial;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 137.5%;
	/* identical to box height, or 22px */
	
	display: flex;
	align-items: center;
	
	/* text / primary */
	
	color: #263238;
	}
	.fbOrderImg{
	
	margin-top:1px;
	}
	.sbOriginImg{
	
	margin-top:10px;
	}
	.sbOrigin{
	
	font-family: Arial;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	
	line-height: 137.5%;
	/* or 19px */
	
	
	/* text / secondary */
	
	color: rgba(38, 50, 56, 0.69);
	}
	
	.sbOriginDetail{
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 137.5%;
	
	/* identical to box height, or 22px */
	
	
	/* text / primary */
	
	color: #263238;
	}
	
	
		 /* -------------------------------------
			  OTHER FORMS DATA
		  ------------------------------------- */
		  .subject{
			 font-family: Arial;
			 font-style: normal;
			 font-weight: bold;
			 font-size: 24px;
			 line-height: 133.33%;
			 margin-top:72px;
	
			 color: #263238;
			   
		  }
	
		  .emailBody{
			font-family: Arial;
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			line-height: 137.5%;
			margin-top:24px;
			margin-bottom:24px;
			 color: #263238;
		  }
		  .emailButton{
			border:none;
			margin-top:24px;
			display: flex;
			cursor:pointer;
	flex-direction: column;
	align-items: center;
	padding: 10px 22px;
	font-family: Arial;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 150%;
	/* identical to box height, or 24px */
	
	
	/* primary v1/contrastText */
	
	color: #263238;
	position: static;
	left: 0%;
	right: 0%;
	top: 0%;
	bottom: 52.17%;
	
	/* primary v1 / main */
	
	background: #90C928;
	border-radius: 4px;
		  }
		  /* -------------------------------------
			  OTHER STYLES THAT MIGHT BE USEFUL
		  ------------------------------------- */
		 
	
		  .last {
			margin-bottom: 0;
		  }
	
		  .first {
			margin-top: 0;
		  }
	
		  .align-center {
			text-align: center;
		  }
	
		  .align-right {
			text-align: right;
		  }
	
		  .align-left {
			text-align: left;
		  }
	
		  .clear {
			clear: both;
		  }
	
		  .mt0 {
			margin-top: 0;
		  }
	
		  .mb0 {
			margin-bottom: 0;
		  }
	
		  .preheader {
			color: transparent;
			display: none;
			height: 0;
			max-height: 0;
			max-width: 0;
			opacity: 0;
			overflow: hidden;
			mso-hide: all;
			visibility: hidden;
			width: 0;
		  }
	
		  .powered-by a {
			text-decoration: none;
		  }
	
		  hr {
			border: 0;
			border-bottom: 1px solid #f6f6f6;
			margin: 20px 0;
		  }
	
		  /* -------------------------------------
			  RESPONSIVE AND MOBILE FRIENDLY STYLES
		  ------------------------------------- */
		  @media only screen and (max-width: 620px) {
			table[class="body"] h1 {
			  font-size: 28px !important;
			  margin-bottom: 10px !important;
			}
			table[class="body"] p,
			table[class="body"] ul,
			table[class="body"] ol,
			table[class="body"] td,
			table[class="body"] span,
			table[class="body"] a {
			  font-size: 16px !important;
			}
			table[class="body"] .wrapper,
			table[class="body"] .article {
			  padding: 10px !important;
			}
			table[class="body"] .content {
			  padding: 0 !important;
			}
			table[class="body"] .container {
			  padding: 0 !important;
			  width: 100% !important;
			}
			table[class="body"] .main {
			  border-left-width: 0 !important;
			  border-radius: 0 !important;
			  border-right-width: 0 !important;
			}
			table[class="body"] .btn table {
			  width: 100% !important;
			}
			table[class="body"] .btn a {
			  width: 100% !important;
			}
			table[class="body"] .img-responsive {
			  height: auto !important;
			  max-width: 100% !important;
			  width: auto !important;
			}
		  }
	
		  /* -------------------------------------
			  PRESERVE THESE STYLES IN THE HEAD
		  ------------------------------------- */
		  @media all {
			.ExternalClass {
			  width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div {
			  line-height: 100%;
			}
			.apple-link a {
			  color: inherit !important;
			  font-family: inherit !important;
			  font-size: inherit !important;
			  font-weight: inherit !important;
			  line-height: inherit !important;
			  text-decoration: none !important;
			}
			#MessageViewBody a {
			  color: inherit;
			  text-decoration: none;
			  font-size: inherit;
			  font-family: inherit;
			  font-weight: inherit;
			  line-height: inherit;
			}
			.btn-primary table td:hover {
			  background-color: #34495e !important;
			}
			.btn-primary a:hover {
			  background-color: #34495e !important;
			  border-color: #34495e !important;
			}
		  }
		</style>
	  </head>
	  <body class="">
		<table
		  role="presentation"
		  border="0"
		  cellpadding="0"
		  cellspacing="0"
		  class="body"
		>
		  <tr>
			<td>&nbsp;</td>
			<td class="container">
			  <div class="content">
				<!-- START CENTERED WHITE CONTAINER -->
				<table role="presentation" class="main">
				  <!-- START MAIN CONTENT AREA -->
				  <tr>
					<td class="wrapper">
					  <table
						role="presentation"
						border="0"
						cellpadding="0"
						cellspacing="0"
					  >
						<tr>
							<img src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/pc.png"/>
						  <td>
							<div class="subject">
							  Transport Booking  updated
							 <div>                           
								<div class="emailBody">
									Hi user, This booking has been updated. Please check all details carefully. Something not right? Contact us on 1800 774 6279.
								   <div>                              
									  <Button class="emailButton">
										  Manage Booking
									  </Button>       
							<div style="margin-top: 84px;">       
							  </div>
	
			 <!-- First List View-->
			 <div class="outerBox">
				<div class="row top">
					<div class="column3" >
					<div class="fbOrderNo">
					  jhajhaksdkja9387283
					 </div>
					</div>
					<div class="column4" >
					 <div class="fbOrderImg">
					<img  src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/submitted.png"/>
					</div>
					 
					</div>
				  </div>
				
	 <div class="row bottom">
				  <div class="column" >
				  
				  <div class="fbTitle">
					Customer ref.
				   </div>
					<div class="fbSubTitle">
					 Subtitle
				   </div>
		
					
					<div class="fbTitle2">
				  Delivery Date / Time
				   </div>
					<div class="fbSubTitle">
				   DeliveryDateTime
				   </div>
	
				   <div class="fbTitle2">
					Load Id
					 </div>
					  <div class="fbSubTitle">
					 LoadId
					 </div>
	
					 <div class="fbTitle2">
					  Temperature
					   </div>
						<div class="fbSubTitle">
					   Temperature
					   </div>
				  </div>
				  <div class="column" >
					 <div class="fbTitle1">
						Pallets / Spaces   </div>
					<div class="fbSubTitle">
				   Pallets
				   </div>
				   <div class="fbTitle2">
					Commodity Type  </div>
				<div class="fbSubTitle">
			   CommodityType
			   </div>
			   <div class="fbTitle2">
				Product   </div>
			<div class="fbSubTitle">
		   Product
		   </div>
				  </div>            
				</div>       
				<div style="margin-top: 24px;margin-bottom: 24px">
			 </div>
									  <!-- Second List View-->
	
									  <div class="outerBox1">
										  <div class="row top">
											  <div class="column1" >
											   <div class="sbOriginImg">
											   <img  src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/up.png"/>
											   </div>
												</div>
											 
											   <div class="column2">  
											   <div class="sbOrigin">
											   origin / Pickup
											   </div>
											   <div class="sbOriginDetail">
											   Origin
											   </div>
											   </div>
											 </div>
										  
										  <div class="row bottom">
											<div class="column">
											
											
											<div class="sbTitle">
											  Address
											 </div>
											  <div class="sbSubTitle">
											 OriginAddress
											 </div>
											 
											  <div class="sbTitle1">
											  Date Time
											 </div>
											  <div class="sbSubTitle">
											 OriginDateTime
											 </div>
											 
											</div>
										   
										  </div>
	
					<!-- third List View-->
					<div style="margin-top: 24px;margin-bottom: 24px">          
					</div>
					  <div class="outerBox1">
						  <div class="row top">
							  <div class="column1" >
							   <div class="sbOriginImg">
							   <img  src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/down.png"/>
							   </div>
								</div>                        
							   <div class="column2">  
							   <div class="sbOrigin">
							   Delivery
							   </div>
							   <div class="sbOriginDetail">
							   Destination
							   </div>
							   </div>
							 </div>
						  
						  <div class="row bottom">
							<div class="column">
													
							<div class="sbTitle">
							  Address
							 </div>
							  <div class="sbSubTitle">
							 DestinationAddress
							 </div>                         
							  <div class="sbTitle1">
							  Date Time
							 </div>
							  <div class="sbSubTitle">
							 DestinationDateTime
							 </div>                        
							</div>                      
						  </div>                    
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
	 
				  <!-- END MAIN CONTENT AREA -->
				</table>
				<!-- END CENTERED WHITE CONTAINER -->
			  
				<!-- START FOOTER -->
				<div class="footer">
				  <table
					role="presentation"
					border="0"
					cellpadding="0"
					cellspacing="0"
				  >
					<tr>
					  <td class="content-block">
						<span class="apple-link">Customer Service</span>
						<br />
						<p>
						  If you have any questions please contact MyPrimaryConnect
						  Customer Service on:
						</p>                   
						<p><img  src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/Phone_icon.png"/> 1800 PRIMARY</p>
						<p><img  src="https://cspdevazurestorageaae.blob.core.windows.net/azure-email-event-hub/Mail.png"/> info@primaryconnect.com.au</p>
						<p style="display: inline;">
						  Don't want to receive these emails?
						  <a href="">
						  Manage Preferences</a
						  >
						</p>
					  </td>
					</tr>
					<tr></tr>
				  </table>
				</div>
				<!-- END FOOTER -->
			  </div>
			</td>
			<td>&nbsp;</td>
		  </tr>
		</table>
	  </body>
	</html>
	 `
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
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/invoice/view/[0]" style="height:48px;width:161px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:3000/invoice/view/${ idComp }" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:25px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">View to Invoice Paid Report</span></span></a>
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
