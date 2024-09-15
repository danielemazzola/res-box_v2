import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { buttonsConfig, renderFields } from './helpers'
import logo from '/images/logo.png'
import './Form.css'
import FormButton from './FormButton'
const Form = ({ handleCloseModal }) => {
  const [fadeClass, setFadeClass] = useState('')
  const [formType, setFormType] = useState({
    login: true,
    register: false,
    forgot: false,
    recovery: false,
    code: false
  })
  const [formFields, setFormFields] = useState({})
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
      return { nombre: '', apellido: '', email: '', password: '' }
    }
    if (formType.forgot) {
      return { email: '' }
    }
    if (formType.recovery) {
      return { password: '' }
    }
    if (formType.code) {
      return { codigo: '' }
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
    reset(newFormFields)
  }, [formType, reset, handleCloseModal])

  const onSubmit = async (values) => {
    console.log(values)
  }

  const getButtonText = () => {
    if (formType.login) return 'Iniciar sesión'
    if (formType.register) return 'Registrar'
    if (formType.forgot) return 'Recuperar contraseña'
    if (formType.recovery) return 'Nueva contraseña'
    if (formType.code) return 'Enviar'
    return ''
  }

  return (
    <div className={`container-form-groups ${fadeClass}`}>
      <div className='container-img-formGroup'>
        <div className='contain-img-title'>
          <img src={logo} alt='Logo Res-Box' className='waveEffect' />
          <h1>RES-BOX</h1>
        </div>
        <div className='target-description-form'>
          <p>Usuario</p>
          <p>
            {formType.login
              ? 'Login'
              : formType.register
              ? 'Registro'
              : formType.forgot
              ? 'Olvidó Contraseña'
              : formType.recovery
              ? 'Guardar contraseña'
              : formType.code && 'Consultar codigo'}
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
            {getButtonText()}
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
              handleCloseModal()
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
