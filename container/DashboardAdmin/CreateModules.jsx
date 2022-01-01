import React, { useState, useContext } from 'react'
import { useFormTools } from '../../components/hooks/useForm'
import { useMutation } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import { nanoid } from 'nanoid'
import { RippleButton } from '../../components/Ripple'
import { CREATE_ONE_LICENCE, CREATE_ONE_MODULE, GET_MODULES } from './queries'
import { BColor, EColor, TBGBColor } from '../../public/colors'
import { IconDelete } from '../../public/icons'
import { BGColor, SCColor } from '../../public/colors'
import { ContainerDinamic } from './styled'
import { EditableInput } from '../../components/common/EditableInput'
import { AwesomeModal } from '../../components/AwesomeModal'
import { LoadEllipsis } from '../../components/Loading'
import { Context } from '../../context'

export const CreateModules = ({ setShowModule, showModule }) => {
    var now = Date.now();
     const { setAlertBox, company } = useContext(Context)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
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

    const newData = Licence?.Lines?.map(x => ({ smName: x.smName, smPath: x.smPath, smState: 1 }))
    console.log(newData)
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
        <AwesomeModal zIndex='99' padding='20px' height='100%' show={showModule} onHide={() => setShowModule(!showModule)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={false} footer={false} borderRadius='0' >
            <div>
                <form onSubmit={(e) => (handleForm(e))}>
                    <span> Add Module  </span>
                    <InputHooks title='Path Name.' width='100%' required errors={errorForm?.mPath} value={dataForm?.mPath} disabled={false} onChange={handleChange} name='mPath' />
                    <InputHooks title='Module Name.' width='100%' required errors={errorForm?.mName} value={dataForm?.mName} disabled={false} onChange={handleChange} name='mName' />
                    <InputHooks title='Priority Module.' type='number' width='100%' required errors={errorForm?.mPriority} value={dataForm?.mPriority} disabled={false} onChange={handleChange} name='mPriority' />
                    <InputHooks title='mIcon Module.' type='number' width='100%' required errors={errorForm?.mIcon} value={dataForm?.mIcon} disabled={false} onChange={handleChange} name='mIcon' />
                    <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
                </form>
                <ContainerDinamic>
                    {Licence && Licence?.Lines?.map((salesLine, i) =>
                    (
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
