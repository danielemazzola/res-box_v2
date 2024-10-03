/* import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Comments = () => {
  const location = useLocation()
  const [idPartner, setIdPartner] = useState(location.pathname.split('/')[2])

  const getCommets = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/partner/comments/${idPartner}`
    )
    const data = await response.json()
    console.log(data)
  }, [idPartner])

  useEffect(() => {
    getCommets()
  }, [getCommets])

  return <div>Comments</div>
}

export default Comments
 */