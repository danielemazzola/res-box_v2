import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { buttonsConfig, getButtonText, renderFields } from './helpers'
import logo from '/images/logo.png'
import './Form.css'
import FormButton from './FormButton'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { fetchSubmit } from '../../reducer/auth-reducer/auth.action'
const Form = ({ handleCloseModal }) => {
  const [fadeClass, setFadeClass] = useState('')
  const [formType, setFormType] = useState({
    login: true,
    register: false,
    forgot: false,
    recovery: false
  })
  const [formFields, setFormFields] = useState({})
  const { dispatchLoader, dispatchToast, dispatchAuth } =
    useContext(ReducersContext)
  const {
    handleSubmit,
    reset,
    register: registerInput,
    formState
  } = useForm({
    defaultValues: formFields
  })

  const getFormFields = () => {
    if (formType.login) {
      return { email: '', password: '' }
    }
    if (formType.register) {
      return { name: '', lastname: '', email: '', password: '' }
    }
    if (formType.forgot) {
      return { email: '' }
    }
    if (formType.recovery) {
      return { password: '' }
    }
    return {}
  }

  useEffect(() => {
    setFadeClass('fadeIn')
    setTimeout(() => setFadeClass(''), 500)
  }, [formType])

  useEffect(() => {
    const newFormFields = getFormFields()
    setFormFields(newFormFields)
  }, [formType, handleCloseModal])

  const onSubmit = async (formFields) => {
    let token
    const response = await fetchSubmit(
      formType,
      formFields,
      handleCloseModal,
      dispatchLoader,
      dispatchToast,
      dispatchAuth,
      token
    )
    if (response) {
      if (formType.register) {
        const loginFormType = { login: true, register: false }
        const loginResponse = await fetchSubmit(
          loginFormType,
          formFields,
          handleCloseModal,
          dispatchLoader,
          dispatchToast,
          dispatchAuth,
          token
        )
        if (loginResponse) {
          reset()
        }
      }
      reset()
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
              : formType.recovery && 'Guardar contraseña'}
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
