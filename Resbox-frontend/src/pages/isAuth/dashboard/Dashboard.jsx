import React, { useContext, useEffect, useState } from 'react'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import ProfileCard from '../../../components/profile-card/ProfileCard'
import './Dashboard.css'

const Dashboard = () => {
  const {
    stateIsAuth: { user }
  } = useContext(ReducersContext)

  const [selectedImage, setSelectedImage] = useState(user.avatar)
  const useScrolltoRef = useScrollToRef()
  const { refDashboardSection, fileInputRef } = useContext(ScrollRefContext)

  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refDashboardSection)
    }, 1000)
  }, [])

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      return
    }
  }
  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      await uploadImage(file)
    }
  }

  const uploadImage = async (file) => {
    console.log('Subiendo imagen:', file)
  }

  return (
    <div ref={refDashboardSection} className='dashboard__container'>
      <div className='dashboard__cards-container fadeIn'>
        <div className='dashboard__card'>
          <div>
            <h3>Hola👋🏼 ¡{user.name}!</h3>
            <form>
              <input
                id='changeImage'
                ref={fileInputRef}
                type='file'
                accept='.png, .jpeg, .jpg, .gif'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </form>
            <div className='dashboard__contain-avatar'>
              <img
                alt={user.name}
                src={selectedImage}
                width='50'
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <ProfileCard array={user} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
