import Alert from '../alert/Alert'

export const renderFields = (formFields, formState, register) => {
  return Object.keys(formFields).map((field) => {
    const isPassword = field === 'password'
    const isEmail = field === 'email'
    const isName = field === 'nombre'
    const isLastname = field === 'apellido'
    const isCode = field === 'codigo'

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
              : isCode
              ? '0123'
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
            }),
            ...(isCode && {
              minLength: { value: 4, message: 'Son 4 dígitos' }
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
        recovery: false,
        code: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false,
        code: false
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
        recovery: false,
        code: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false,
        code: false
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
        recovery: false,
        code: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Registrarme',
      formType: {
        login: false,
        register: true,
        forgot: false,
        recovery: false,
        code: false
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-options)' }
    },
    {
      label: 'Tengo mi código',
      formType: {
        login: false,
        register: false,
        forgot: false,
        recovery: false,
        code: true
      },
      style: { color: 'white', backgroundColor: 'var(--rb-bg-secondary)' }
    }
  ]
}
