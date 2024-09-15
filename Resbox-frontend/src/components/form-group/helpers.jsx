import Alert from '../alert/Alert'

export const renderFields = (formFields, formState, register) => {
  return Object.keys(formFields).map((field) => {
    const isPassword = field === 'password'
    const isEmail = field === 'email'
    const isName = field === 'name'
    const isLastname = field === 'lastname'

    return (
      <div className='container-form' key={field}>
        <label htmlFor={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
        <input
          placeholder={
            isPassword
              ? '*******'
              : isName
              ? 'Juan'
              : isLastname
              ? 'Mendoza'
              : isEmail
              ? 'name@mail.com'
              : ''
          }
          type={isPassword ? 'password' : 'text'}
          className={`${
            formState.errors[field]?.type === 'required' ? 'error' : ''
          }`}
          id={field}
          {...register(field, {
            required: {
              value: true
            },
            ...(isPassword && {
              minLength: { value: 8, message: 'Mínimo 8 caracteres.' }
            }),
            ...(isEmail && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Formato invalido'
              }
            }),
            ...(isName && {
              minLength: { value: 2, message: 'Mínimo 2 caracteres.' }
            }),
            ...(isLastname && {
              minLength: { value: 2, message: 'Mínimo 2 caracteres.' }
            })
          })}
        />
        {formState.errors[field]?.message && (
          <Alert>{formState.errors[field].message}</Alert>
        )}
      </div>
    )
  })
}

export const buttonsConfig = {
  login: [
    {
      label: 'Registrarme',
      formType: {
        login: false,
        register: true,
        forgot: false,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    }
  ],
  register: [
    {
      label: 'Iniciar Sesión',
      formType: {
        login: true,
        register: false,
        forgot: false,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    }
  ],
  forgot: [
    {
      label: 'Iniciar Sesión',
      formType: {
        login: true,
        register: false,
        forgot: false,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Registrarme',
      formType: {
        login: false,
        register: true,
        forgot: false,
        recovery: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    }
  ]
}

export const getButtonText = (formType) => {
  if (formType.login) return 'Iniciar sesión'
  if (formType.register) return 'Registrar'
  if (formType.forgot) return 'Recuperar contraseña'
  if (formType.recovery) return 'Nueva contraseña'
  return ''
}
export const getFormFields = (formType) => {
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
