export const fetchAuth = async (
  urlApi,
  formFields = {},
  method = 'GET',
  token = null
) => {
  let url = `${import.meta.env.VITE_URL_API}/${urlApi}`

  try {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const options = {
      method,
      headers
    }
    if (method !== 'GET') {
      options.body = JSON.stringify(formFields)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}

export const fetchUpdateImg = async (formData, url, token) => {
  const urlApi = `${import.meta.env.VITE_URL_API}/${url}`
  try {
    const response = await fetch(urlApi, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    const data = await response.json()

    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}

export const fetchPartner = async (user, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/partner/${user.idPartner}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}

export const createPartner = async (url, token, formFields) => {
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields)
    })
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}
