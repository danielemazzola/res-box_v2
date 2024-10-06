import { createContext, useEffect, useContext, useState } from 'react'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../reducers/ReducersContext'
import { sizeImg } from '../../helpers/sizeImg'
import {
  handleInfoPartner,
  uploadImage
} from '../../reducer/auth-reducer/auth.action'
import useScrollToRef from '../../hooks/useScrollToRef'
import { ScrollRefContext } from '../scroll-ref/ScrollRefContext'
import { getOperationsByPartner } from '../../reducer/partner-reducer/partner.action'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [API_URL, setUrlImageChange] = useState({
    login: 'user/login-user',
    login_google: 'user/auth-google',
    register: 'user/register-user',
    recovery_password: 'user/recovery-password-user',
    new_password: 'user/new-password',
    user_avatar: 'user/update-avatar',
    partner_avatar: 'partner/update-avatar',
    partner_banner: 'partner/update-banner',
    user_add_more: 'box/buy-box',
    user_operation: 'operation/new-operation',
    my_operations: 'operation',
    operation_update: 'operation/update-operation',
    new_partner: 'partner/new-partner',
    like: 'user/add-favorite'
  })
  const [stateModal, setStateModal] = useState({
    infoPartner: false,
    infoOperations: false,
    redeem: false
  })

  const [stateBoxCard, setStateBoxCard] = useState({
    quantityRedeem: 1,
    modalState: false,
    secureTokenRedeem: 0,
    modalStatePartner: false,
    infoPartner: {},
    box:{}
  })

  const [token, setToken] = useState(localStorage.getItem('SECURE_CODE_RESBOX'))
  const useScrolltoRef = useScrollToRef()
  const {
    dispatchAuth,
    dispatchLoader,
    dispatchToast,
    dispatchPartners,
    statePartners: { operations },
    stateIsAuth: { user, partner }
  } = useContext(ReducersContext)
  const { refPartnerInfo, refOperations } = useContext(ScrollRefContext)

  const isAuth = async () => {
    if (token) {
      try {
        dispatchLoader({ type: 'SET_LOAD_TRUE' })
        const { response, data } = await fetchAuth(
          'user/profile-user',
          {},
          'GET',
          token
        )
        if (response.status !== 200) {
          dispatchToast({
            type: 'ADD_NOTIFICATION',
            payload: { msg: `Error: ${data.message}`, error: true }
          })
          localStorage.removeItem('SECURE_CODE_RESBOX')
          dispatchAuth({ type: 'SET_AUTH_FALSE' })
        } else {
          dispatchAuth({ type: 'SET_USER', payload: data.user })
          dispatchAuth({ type: 'SET_AUTH_TRUE' })
        }
      } catch (error) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Error: ${error.message}`, error: true }
        })
      } finally {
        setTimeout(() => {
          dispatchLoader({ type: 'SET_LOAD_FALSE' })
        }, 1500)
      }
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const size = sizeImg(file)
    if (file && !size) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: {
          msg: 'El archivo es demasiado grande. El tamaño máximo es 5MB',
          error: true
        }
      })
      return
    }
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await uploadImage(
      token,
      formData,
      API_URL.user_avatar,
      dispatchLoader,
      dispatchToast
    )
    dispatchAuth({ type: 'SET_USER', payload: data.avatar })
    const updatedUsers = partner.users?.map((user) => {
      if (user._id === data.avatar._id) {
        return {
          ...user,
          avatar: data.avatar.avatar
        }
      }
      return user
    })
    dispatchAuth({
      type: 'SET_PARTNER',
      payload: {
        ...partner,
        users: updatedUsers
      }
    })
  }

  const handlePartner = async () => {
    if (Object.keys(partner).length <= 0) {
      const { data } = await handleInfoPartner(
        user,
        token,
        dispatchToast,
        dispatchLoader
      )
      dispatchAuth({ type: 'SET_PARTNER', payload: data.partner })
    }
    setTimeout(() => {
      useScrolltoRef(refPartnerInfo)
    }, 500)
    setStateModal((prev) => ({
      ...prev,
      infoPartner: !stateModal.infoPartner
    }))
  }

  const handleOperations = async (modal = true) => {
    if (operations.length <= 0 && !stateModal.infoOperations) {
      await getOperationsByPartner(
        token,
        API_URL.my_operations,
        dispatchToast,
        dispatchLoader,
        dispatchPartners
      )
    }
    setTimeout(() => {
      useScrolltoRef(refOperations)
    }, 500)
    if (modal) {
      setStateModal((prev) => ({
        ...prev,
        infoOperations: !stateModal.infoOperations
      }))
    }
  }

  const handleCloseModalInfoPartner = () => {
    setStateBoxCard((prevState) => ({
      ...prevState,
      modalStatePartner: false,
      infoPartner: {}
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        API_URL,
        stateModal,
        setStateModal,
        token,
        setToken,
        handleImageChange,
        handlePartner,
        handleOperations,
        handleCloseModalInfoPartner,
        stateBoxCard,
        setStateBoxCard
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
