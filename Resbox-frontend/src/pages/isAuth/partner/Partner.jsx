import { useContext, useEffect, useState } from 'react'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import Modal from '../../../components/modal/Modal'
import { useForm } from 'react-hook-form'
import { arrayFormPartner } from './helpers'
import './Partner.css'
import Alert from '../../../components/alert/Alert'

const Partner = () => {
  const [openModal, setOpenModal] = useState(false)

  const { refNewPartner } = useContext(ScrollRefContext)
  const useScrolltoref = useScrollToRef()

  useEffect(() => {
    setTimeout(() => {
      useScrolltoref(refNewPartner)
    }, 1000)
  }, [])

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      cif: '',
      owner_name: '',
      owner_lastname: '',
      phone: '',
      email: '',
      bank_name: '',
      bank_number: '',
      country: '',
      address: ''
    }
  })

  const onSubmit = (formFields) => {
    console.log(formFields)
  }

  return (
    <>
      <section
        ref={refNewPartner}
        className='partner__container-information fadeIn'
      >
        <div className='partner__content'>
          <h2>¡Estás a un paso de convertirte en un colaborador! 🚀</h2>
          <p>
            Para nosotros, lo más importante es{' '}
            <span>✨¡crecer junto a ti!</span>
          </p>
          <p>
            Antes de continuar con el alta, es importante que sepas que,
            conforme recibamos tu solicitud, nos pondremos en contacto contigo
            lo antes posible para confirmar todos los datos del establecimiento.
          </p>
          <p>¿Estás listo? ¡Vamos a ello! 💪</p>
        </div>
        <div>
          <button
            className='button green'
            onClick={() => setOpenModal(!openModal)}
          >
            Comenzar
          </button>
        </div>
      </section>
      <Modal
        isModalOpen={openModal}
        handleCloseModal={() => setOpenModal(!openModal)}
      >
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={`partner__form`}>
            <h2>Formulario de alta:</h2>
            <div>
              {arrayFormPartner?.map((field, index) => (
                <div key={index}>
                  <label htmlFor={field.key}>{field.title}</label>
                  <input
                    className={`${
                      errors[field.key]?.type === 'required' ? 'error' : ''
                    }`}
                    placeholder={
                      field.key === 'name'
                        ? 'Restaurante El Faraón'
                        : field.key === 'cif'
                        ? 'X0000000Z'
                        : field.key === 'owner_name'
                        ? 'Juan Miguel'
                        : field.key === 'owner_lastname'
                        ? 'Mendoza'
                        : field.key === 'phone'
                        ? '622222222'
                        : field.key === 'email'
                        ? 'juan@email.com'
                        : field.key === 'bank_name'
                        ? 'Mi Banco'
                        : field.key === 'bank_number'
                        ? '1234123112311231'
                        : field.key === 'country'
                        ? 'Alicante'
                        : field.key === 'address' &&
                          'Av. la Estación 3, 03003 Alicante'
                    }
                    id={field.key}
                    {...register(field.key, {
                      required: {
                        value: true,
                        message: `Campo obligatorio`
                      }
                    })}
                  />
                  {errors[field.key]?.message && (
                    <Alert>{errors[field.key].message}</Alert>
                  )}
                </div>
              ))}
            </div>
            <button className='button green'>Enviar</button>
          </form>
        </>
      </Modal>
    </>
  )
}

export default Partner