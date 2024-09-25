import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormButton from './FormButton'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { fetchSubmit } from '../../reducer/auth-reducer/auth.action'
import {
  buttonsConfig,
  getButtonText,
  getFormFields,
  renderFields
} from './helpers'
import { AuthContext } from '../../context/auth/AuthContext'
import logo from '/images/logo.png'
import './Form.css'
import AuthGoogle from '../auth-google/AuthGoogle'

const Form = ({ handleCloseModal, recovery = false }) => {
  const [fadeClass, setFadeClass] = useState('')
  const [formType, setFormType] = useState(
    !recovery
      ? {
          login: true,
          register: false,
          forgot: false,
          recovery: false
        }
      : {
          login: false,
          register: false,
          forgot: false,
          recovery: true
        }
  )
  const [formFields, setFormFields] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatchLoader, dispatchToast, dispatchAuth } =
    useContext(ReducersContext)
  const { setToken } = useContext(AuthContext)
  const {
    handleSubmit,
    reset,
    register: registerInput,
    formState
  } = useForm({
    defaultValues: formFields
  })

  useEffect(() => {
    setFadeClass('fadeIn')
    setTimeout(() => setFadeClass(''), 500)
  }, [formType])

  useEffect(() => {
    const newFormFields = getFormFields(formType)
    setFormFields(newFormFields)
  }, [formType, handleCloseModal])

  const onSubmit = async (formFields) => {
    let token
    if (formType.recovery) {
      token = location.pathname.split('/')[2]
    }
    const response = await fetchSubmit(
      formType,
      formFields,
      handleCloseModal,
      dispatchLoader,
      dispatchToast,
      dispatchAuth,
      token,
      setToken
    )
    if (response) {
      let loginResponse
      if (formType.register) {
        const loginFormType = { login: true, register: false }
        loginResponse = await fetchSubmit(
          loginFormType,
          formFields,
          handleCloseModal,
          dispatchLoader,
          dispatchToast,
          dispatchAuth,
          token,
          setToken
        )
      }
      if (formType.login || loginResponse) {
        navigate('./dashboard')
        reset()
      }
      reset()
    } else if (formType.recovery) {
      closeModal()
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }

  const closeModal = () => {
    setFormFields({})
    handleCloseModal()
    reset()
  }

  return (
    <div className={`container-form-groups ${fadeClass}`}>
      <div className='container-img-formGroup'>
        <div className='contain-img-title'>
          <img src={logo} alt='Logo Res-Box' className='waveEffect' />
          <h1>RES-BOX</h1>
        </div>
        <div className='target-description-form'>
          <p>
            {formType.login
              ? 'Iniciar sesión'
              : formType.register
              ? 'Registro'
              : formType.forgot
              ? 'Olvidó Contraseña'
              : formType.recovery && 'Nueva contraseña'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={`formGroup`}>
        <div className='container-form'>
          {renderFields(formFields, formState, registerInput)}
        </div>
        <div className='container_btn_option'>
          {buttonsConfig[
            Object.keys(formType).find((key) => formType[key])
          ]?.map((button, index) => (
            <FormButton
              key={index}
              isActive={formType[button.formType]}
              onClick={() => setFormType(button.formType)}
              style={button.style}
            >
              {button.label}
            </FormButton>
          ))}
        </div>
        <div className='container-btn-forms'>
        <AuthGoogle />
          <button type='submit' className='button green'>
            {getButtonText(formType)}
          </button>
          <button
            type='button'
            className='button cancel'
            onClick={() => {
              setFormType({
                login: true,
                register: false,
                forgot: false,
                recovery: false
              })
              closeModal()
              reset()
            }}
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
