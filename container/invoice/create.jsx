import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Container, Text, Title } from './styled'
import { useFormTools } from '../../components/hooks/useForm';
import { CREATE_ONE_MODULE, GET_MODULES } from '../DashboardAdmin/queries';
import { Context } from '../../context';
import { EditableInput } from '../../components/common/EditableInput';
import { ContainerDinamic } from '../DashboardAdmin/styled';
import { RippleButton } from '../../components/Ripple';
import { IconDelete } from '../../public/icons';
import { BColor, EColor } from '../../public/colors';
import { useMutation } from '@apollo/client';
import NewSelect from '../../components/NewSelectHooks';
import InputHooks from '../../components/InputHooks/InputHooks';

export const CreateInvoice = props => {
    var now = Date.now();
    const { setAlertBox, company } = useContext(Context)
    const [handleChangeStatics, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
   
   const [registerModule, { loading, data }] = useMutation(CREATE_ONE_MODULE, {
       onError: (error) => {
           setAlertBox({
               message: `${error}`,
               color: 'error'
           })
       },
       onCompleted: data => {
           setAlertBox({
               message: `Que pedo`,
               color: 'success'
           })
       },
       update(cache) {
           cache.modify({
               fields: {
                   getAllModules(dataOld = []) {
                       return cache.writeQuery({ query: GET_MODULES, data: dataOld })
                   }
               }
           })
       }
   })
   console.log(data)
   const initialLine = {
       smName: '',
       smPath: '',
       smState: 0,
   }
   const initialLicence = {
       logo: '',
       Lines: [
           {
               smName: '',
               smPath: '',
               smState: 0,
           },
           (initialLine)
       ],
   }
   const [Licence, setLicence] = useState(initialLicence)
   const handleAdd = () => {
       const Lines = [...Licence?.Lines, { ...initialLine }, { ...initialLine }]
       setLicence({ ...Licence, Lines })
   }
   const CleanLines = () => {
       setLicence(initialLicence)
   }
   const handleLineChange = (index, name, value) => {
       const Lines = Licence.Lines.map((salesLine, i) => {
           if (i === index) {
               const newLine = { ...salesLine }
               if (name === 'smName' && '_id' && 'smPath') {
                   newLine[name] = value
               } else {
                   newLine[name] = value
               }
               return newLine
           }
           return { ...salesLine }
       })
       setLicence({ ...Licence, Lines })
   }
   const handleRemove = i => {
       const Lines = Licence?.Lines?.filter((salesLine, index) => index !== i)
       setLicence({ ...Licence, Lines })
   }

   const handleChange = (e, error, item = {}) => {

    setForcedError({ ...errorForm, [e.target.name]: error })

    const { type, key, id, obj } = item
        if (!type) {
            setDataValue({ ...dataForm, [e.target.name]: e.target.value })
        }
        if (obj) {
            setDataValue({ ...dataForm, [obj]: { ...dataForm[obj], [e.target.name]: e.target.value } })
        }
        if (type) {
            setDataValue({
                ...dataForm, [type]: dataForm?.[type].map(x => (x[key] === id || x.id === id) ? { ...x, [e.target.name]: e.target.value } : x)
        })
    }
}

   const newData = Licence?.Lines?.map(x => ({ smName: x.smName, smPath: x.smPath, smState: 1 }))

   const handleForm = (e, show) => handleSubmit({
       event: e,
       action: () => {
           if (!show) {
               return registerModule({
                   variables: {
                       input: {
                           mPath: dataForm?.mPath,
                           mName: dataForm.mName,
                           mPriority: parseInt(dataForm.mPriority),
                           mIcon: parseInt(dataForm.mIcon)
                       },
                       //  Array
                       inputLineItemsMod: {
                           setDataModule: newData
                       }
                   }
               })
           } else if (show === 2) {
               console.log('')
           } else if (show === 3) {
               return null
           }
       },
       actionAfterSuccess: () => {
           setDataValue({})
       }
   })
    return (
        <Container>
            <Title size='30px'>New Invoice</Title>

            <Card width='100%' justify='flex-start' responsive>
                {/* <InputHooks title='Bill ref.' width='15%' required error={errorForm?.refCode} value={dataForm?.refCode} onChange={handleChange} name='refCode' /> */}
                <InputHooks title='Current date.' width='10%' type='date' required error={errorForm?.dateNow} value={dataForm?.dateNow} onChange={handleChange} name='dateNow' />
                <InputHooks title='Due date.' width='10%' required type='date' error={errorForm?.bDueDate} value={dataForm?.bDueDate} onChange={handleChange} name='bDueDate' />
                <InputHooks title='Bill no.' width='10%' required error={errorForm?.billNo} value={dataForm?.billNo} onChange={handleChange} numeric name='billNo' range={{ min: 0, max: 50 }} />      
            </Card>

            <Card width='100%' justify='flex-start' responsive>
                <InputHooks title='Invoice Date.' width='10%' type='date' required error={errorForm?.dateNow} value={dataForm?.dateNow} onChange={handleChange} name='invoiceDate' />
                <InputHooks title='Invoice Ref.' width='10%' required type='date' error={errorForm?.bDueDate} value={dataForm?.bDueDate} onChange={handleChange} name='invoiceRef' />
                <InputHooks title='Invoice To' width='10%' required error={errorForm?.billNo} value={dataForm?.billNo} onChange={handleChange} numeric name='invoiceTo' range={{ min: 0, max: 50 }} />      
                <InputHooks title='Invoice From' width='10%' required error={errorForm?.billNo} value={dataForm?.billNo} onChange={handleChange} numeric name='invoiceFrom' range={{ min: 0, max: 50 }} />      
                <InputHooks title='Event Type' width='10%' required error={errorForm?.billNo} value={dataForm?.billNo} onChange={handleChange} numeric name='eventType' range={{ min: 0, max: 50 }} />      
                <InputHooks title='Event Ref' width='10%' required error={errorForm?.billNo} value={dataForm?.billNo} onChange={handleChange} numeric name='eventRef' range={{ min: 0, max: 50 }} />      
            </Card>


            <ContainerDinamic>
                    {Licence && Licence?.Lines?.map((salesLine, i) => (
                        <div style={{ width: '100%', height: 'auto', display: 'flex' }} key={salesLine._id}>
                            <EditableInput
                                margin='10px 0'
                                value={salesLine.smName}
                                onChange={value => handleLineChange(i, 'smName', value)}
                                pdfMode={false}
                            />
                            <EditableInput
                                margin='10px 0'
                                value={salesLine.smPath}
                                onChange={value => handleLineChange(i, 'smPath', value)}
                                pdfMode={false}
                            />
                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemove(i)} >
                                <IconDelete size='25px' color={EColor} />
                            </RippleButton>
                        </div>
                    ))}
                </ContainerDinamic>
                <RippleButton style={{ border: '1px solid #ccc', padding: '5px', backgroundColor: 'transparent' }} color={BColor} type='button' className="link" onClick={handleAdd}>
                    <span className="icon icon-add bg-green mr-10"></span>
                    Add Line Item
                </RippleButton>
        </Container>
    )
}

CreateInvoice.propTypes = {

}
