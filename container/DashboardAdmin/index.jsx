import React, { useContext, useRef, useState  } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { CREATE_ONE_LICENCE, CREATE_ONE_MODULE, CREATE_ONE_ROLE, CREATE_ONE_USER_ADMIN, GET_ALL_ROLES, GET_MODULES, GET_USER_INFO, GET_ALL_LICENCE } from './queries'
import { Context } from '../../context'
import { useUser } from '../Profile'
import { useFormTools } from '../../components/hooks/useForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Card, Container, ContainerCard, Form, Row } from './styled'
import { RippleButton } from '../../components/Ripple'
import { BGColor, SCColor } from '../../public/colors'
import { nanoid } from 'nanoid'
import NewSelect from '../../components/NewSelectHooks'
import { CreateLicence } from './CreateLicence'
import ViewUsers from './viewUsers'
import { CreateModules } from './CreateModules'
export const DashboardAmin = () => {
  const { setAlertBox, company } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [dataUser] = useUser();
  const { data: dataAllUser } = useQuery(GET_USER_INFO);
  const { data: dataHtml } = useQuery(GET_MODULES, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' });
  const [RegisterUserAdmin] = useMutation(CREATE_ONE_USER_ADMIN);
  const { data: allLicence } = useQuery(GET_ALL_LICENCE);
  
  const [registerModule, { loading, data }] = useMutation(CREATE_ONE_MODULE, {
    onError: (error) => {
      setAlertBox({
        message: `${error}`,
        color: 'error'
      })
    },
    onCompleted: data => {
      setAlertBox({
        message: `${data}`,
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
  const [registerGetLicences, { data: dataLicence }] = useMutation(CREATE_ONE_LICENCE)
  const [createRoleMutation, { data: dataRole }] = useMutation(CREATE_ONE_ROLE, {
    onError: (error) => {
      setAlertBox({
        message: `${error}`,
        color: 'error'
      })
    },
    // onCompleted: data => {
    //   setAlertBox({
    //     message: `${data}`,
    //     color: 'success'
    //   })
    // },
    update(cache) {
      cache.modify({
        fields: {
          getAllRoles(dataOld = []) {
            return cache.writeQuery({ query: GET_ALL_ROLES, data: dataOld })
          }
        }
      })
    }
  })
  const { data: allRoles } = useQuery(GET_ALL_ROLES)
  if (loading) return <Loading />
  // SUBMIT FUNC
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
              setDataModule: []
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

  // const newData = dataForm?.items?.map(x => ({ _id: x.id, lineItemsDescription: x.bDescription, lineItemsQuantity: x.quantity ? parseFloat(x.quantity) : 0, lineItemsIdPro: x.idRef, lineItemsIdAccount: x.idAccount, lineItemsRate: x.rate ? parseFloat(x.rate) : 0, lineItemsIdClass: x.idClass, lineItemsIdVAT: x.idClass, lineItemsTotalVAT: dataForm.tax === 'NO_TAX' ? 0 : dataForm.tax === 'INCLUSIVE' ? (parseFloat(x.rate) * parseFloat(x.quantity)) / (100 + parseFloat(x.iPercentage && x.iPercentage)) * parseFloat(x.iPercentage) : dataForm.tax === 'EXCLUSIVE' ? ((parseFloat(x.rate) * parseFloat(x.quantity)) * parseFloat(x.iPercentage)) / 100 : 0, lineItemsSubTotal: (parseFloat(x.rate) * parseFloat(x.quantity)) ? (parseFloat(x.rate) * parseFloat(x.quantity)) : 0, lineItemsBillIva: x.iPercentage  }))
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
              Date:now,
              EndDate: '2021-12-22T20:29:04.462Z',
              Active: true,
            },
            //  Array
            inputLineItems: {
              setDataLicence: []
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
  const handleFormRole = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (!show) {
        return createRoleMutation({
          variables: {
            input: {
              name: dataForm?.namaRole,
            },
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
  const handleFormUserCreate = (e, show) => handleSubmit({
    event: e,
    action: () => {
      return RegisterUserAdmin({
        variables: {
          userName: dataForm.Username,
          uEmail: dataForm.Email,
          uPassword: dataForm.PassWord
        }
      })
    },
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })
  const [show, setShow] = useState(false)
  const [showModule, setShowModule] = useState(false)

  const ref = useRef(null)
  return (<Container>
    <ContainerCard>
      <button onClick={() => setShow(!show)}>Open</button>
      <button onClick={() => setShowModule(!showModule)}>Open Module</button>
      <Card>
        {/* <form onSubmit={(e) => (handleForm(e))}>
          <span> Add Module  </span>
          <InputHooks title='Path Name.' width='100%' required errors={errorForm?.mPath} value={dataForm?.mPath} disabled={false} onChange={handleChange} name='mPath' />
          <InputHooks title='Module Name.' width='100%' required errors={errorForm?.mName} value={dataForm?.mName} disabled={false} onChange={handleChange} name='mName' />
          <InputHooks title='Priority Module.' type='number' width='100%' required errors={errorForm?.mPriority} value={dataForm?.mPriority} disabled={false} onChange={handleChange} name='mPriority' />
          <InputHooks title='mIcon Module.' type='number' width='100%' required errors={errorForm?.mIcon} value={dataForm?.mIcon} disabled={false} onChange={handleChange} name='mIcon' />
          <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
        </form> */}
      </Card>
      <Card>
        <form onSubmit={(e) => (handleFormRole(e))}>
          <span> Add Role  </span>
          <InputHooks title='Path Name.' reference={ref} width='100%' required errors={errorForm?.namaRole} value={dataForm?.namaRole} disabled={false} onChange={handleChange} name='namaRole' />
          <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
        </form>
        <NewSelect action top='120%' icon title='All roles.' width='100%' error={errorForm?._id} required search options={allRoles?.getAllRoles || []} id='_id' name='_id' value={dataForm?._id || ''} optionName={['name']} onChange={handleChange} onClick={(x) => ref.current.focus()} />
      </Card>
      <Card>
        <form onSubmit={(e) => (handleFormUserCreate(e))}>
          <span> Create User  </span>
          <InputHooks title='Username.' width='100%' required errors={errorForm?.Username} value={dataForm?.Username} disabled={false} onChange={handleChange} name='Username' />
          <InputHooks title='Email.' width='100%' required errors={errorForm?.Email} value={dataForm?.Email} disabled={false} onChange={handleChange} name='Email' />
          <InputHooks title='PassWord.' width='100%' required errors={errorForm?.PassWord} value={dataForm?.PassWord} disabled={false} onChange={handleChange} name='PassWord' />
          <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
        </form>
        <CreateLicence 
        setShow={setShow}
        show={show}
        />
        <CreateModules 
        setShowModule={setShowModule}
        showModule={showModule}
        />
      </Card>
    </ContainerCard>
    <ContainerCard>
      <Row>
        <Form>
          <InputHooks title='Name' width='33%' required errors={errorForm?.Name} value={dataForm?.Name} disabled={false} onChange={handleChange} name='Name' />
          <InputHooks title='Location' width='33%' required errors={errorForm?.Location} value={dataForm?.Location} disabled={false} onChange={handleChange} name='Location' />
          <RippleButton bgColor={BGColor} margin='20px 0px' widthButton='33%' type='submit'>{'Search'}</RippleButton>
        </Form>
      </Row>
     {dataAllUser && dataAllUser?.getAlUserLocation?.map(x => <div key={x._id}><ViewUsers data={x} /></div> )}
    </ContainerCard>

  </Container>
  )
}
