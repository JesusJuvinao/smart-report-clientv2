import React, { useContext, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LoadEllipsis, Loading } from '../../components/Loading'
import { CREATE_ONE_MODULE, CREATE_ONE_ROLE, CREATE_ONE_USER_ADMIN, GET_ALL_ROLES, GET_MODULES } from './queries'
import { Context } from '../../context'
import { useUser } from '../Profile'
import { useFormTools } from '../../components/hooks/useForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Card, Container, ContainerCard } from './styled'
import { RippleButton } from '../../components/Ripple'
import { SCColor } from '../../public/colors'
import NewSelect from '../../components/NewSelectHooks'
export const DashboardAmin = () => {
  const { setAlertBox, company } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()

  const [dataUser] = useUser()
  const { data: dataHtml } = useQuery(GET_MODULES, { variables: { idComp: company.idLasComp ? company.idLasComp : dataUser?.lastCompany }, fetchPolicy: 'cache-and-network' })
  const [RegisterUserAdmin] = useMutation(CREATE_ONE_USER_ADMIN)
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
  const ref = useRef(null)
  return (<Container>
    <ContainerCard>
      <Card>
        <form onSubmit={(e) => (handleForm(e))}>
          <span> Add Module  </span>
          <InputHooks title='Path Name.' width='100%' required errors={errorForm?.mPath} value={dataForm?.mPath} disabled={false} onChange={handleChange} name='mPath' />
          <InputHooks title='Module Name.' width='100%' required errors={errorForm?.mName} value={dataForm?.mName} disabled={false} onChange={handleChange} name='mName' />
          <InputHooks title='Priority Module.' type='number' width='100%' required errors={errorForm?.mPriority} value={dataForm?.mPriority} disabled={false} onChange={handleChange} name='mPriority' />
          <InputHooks title='mIcon Module.' type='number' width='100%' required errors={errorForm?.mIcon} value={dataForm?.mIcon} disabled={false} onChange={handleChange} name='mIcon' />
          <RippleButton bgColor={SCColor} margin='20px 0px' widthButton='100%' type='submit'>{loading ? <LoadEllipsis /> : 'Submit'}</RippleButton>
        </form>
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
      </Card>
    </ContainerCard>
  </Container>
  )
}
