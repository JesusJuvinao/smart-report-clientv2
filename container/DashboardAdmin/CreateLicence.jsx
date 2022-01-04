import React, { useState } from 'react'
import { useFormTools } from '../../components/hooks/useForm'
import { useMutation } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { nanoid } from 'nanoid'
import { RippleButton } from '../../components/Ripple'
import { CREATE_ONE_LICENCE } from './queries'
import { BColor, EColor, TBGBColor } from '../../public/colors'
import { IconDelete } from '../../public/icons'
import { BGColor, SCColor } from '../../public/colors'
import { ContainerDinamic } from './styled'
import { EditableInput } from '../../components/common/EditableInput'
import { AwesomeModal } from '../../components/AwesomeModal'

export const CreateLicence = ({ setShow, show }) => {
    var now = Date.now();
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
    const [registerGetLicences, { data: dataLicence }] = useMutation(CREATE_ONE_LICENCE)

    const initialLine = {
        description: '',
    }
    const initialLicence = {
        logo: '',
        Lines: [
            {
                description: '',
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
                if (name === 'description' && '_id' && 'idAccount') {
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
    const newData = Licence?.Lines?.map(x => ({ lineItemsDescription: x.description }))
    const HandleFormUpdateLicence = (e, show) => handleSubmit({
        event: e,
        action: () => {
            if (!show) {
                return registerGetLicences({
                    variables: {
                        input: {
                            idUser: dataForm?.mPath,
                            LName: dataForm.LName,
                            Ref: nanoid(),
                            LPrice: parseInt(dataForm.LPrice),
                            LDescuento: parseInt(dataForm.LDescuento),
                            Date: now,
                            EndDate: '2021-12-22T20:29:04.462Z',
                            Active: true,
                        },
                        //  Array
                        inputLineItems: {
                            setDataLicence: newData
                        }
                    }
                })
            } else if (show === 2) {
            } else if (show === 3) {
                return null
            }
        },
        actionAfterSuccess: () => {
            setDataValue({})
            CleanLines()
        }
    })
    return (
        <AwesomeModal zIndex='99' padding='20px' height='100%' show={show} onHide={() => setShow(!show)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
            <div>
                <form onSubmit={(e) => (HandleFormUpdateLicence(e))}>
                    <span> Create Licence  </span>
                    <InputHooks range={{ min: 0, max: 80 }} title='Licence Name.' width='100%' required errors={errorForm?.LName} value={dataForm?.LName} disabled={false} onChange={handleChange} name='LName' />
                    <InputHooks numeric range={{ min: 0, max: 80 }} title='Licence Descuento.' width='100%' required errors={errorForm?.LDescuento} value={dataForm?.LDescuento} disabled={false} onChange={handleChange} name='LDescuento' />
                    <InputHooks numeric range={{ min: 0, max: 80 }} title='Licence Price.' width='100%' required errors={errorForm?.LPrice} value={dataForm?.LPrice} disabled={false} onChange={handleChange} name='LPrice' />
                    <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>Submit</RippleButton>
                </form>
                <ContainerDinamic>
                    {Licence && Licence?.Lines?.map((salesLine, i) =>
                    (
                        <div style={{ width: '100%', height: 'auto', display: 'flex' }} key={salesLine._id}>
                            <EditableInput
                                margin='10px 0'
                                value={salesLine.description}
                                onChange={value => handleLineChange(i, 'description', value)}
                                pdfMode={false}
                            />
                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemove(i)} >
                                <IconDelete size='25px' color={EColor} />
                            </RippleButton>
                        </div>
                    )
                    )}
                </ContainerDinamic>
                <RippleButton style={{ border: '1px solid #ccc', padding: '5px', backgroundColor: 'transparent' }} color={BColor} type='button' className="link" onClick={handleAdd}>
                    <span className="icon icon-add bg-green mr-10"></span>
                    Add Line Item
                </RippleButton>
            </div>
        </AwesomeModal >
    )
}
