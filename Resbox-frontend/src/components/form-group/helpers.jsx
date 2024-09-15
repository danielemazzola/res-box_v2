/* import Alert from '../../alert/Alert' */

export const renderFields = (formFields, formState, register) => {
  return Object.keys(formFields).map((field) => {
    const isPassword = field === 'password'
    const isEmail = field === 'email'
    const isName = field === 'nombre'
    const isLastname = field === 'apellido'

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
              minLength: { value: 8, message: 'Mín. 8 chars.' }
            }),
            ...(isEmail && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid format'
              }
            }),
            ...(isName && {
              minLength: { value: 2, message: 'Mín. 2 chars.' }
            }),
            ...(isLastname && {
              minLength: { value: 2, message: 'Mín. 2 chars.' }
            })
          })}
        />
        {formState.errors[field]?.message && (
          <p>{formState.errors[field].message}</p>
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
      }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false,
        code: false
      }
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
      }
    },
    {
      label: 'Recuperar Contraseña',
      formType: {
        login: false,
        register: false,
        forgot: true,
        recovery: false,
        code: false
      }
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
      }
    },
    {
      label: 'Registrarme',
      formType: {
        login: false,
        register: true,
        forgot: false,
        recovery: false,
        code: false
      }
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
