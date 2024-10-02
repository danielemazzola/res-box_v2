// Función para buscar un usuario por email
export const findUserByEmail = async (email) => {
  const user_email = email.toLowerCase()
  try {
    const exist = await User.findOne({ email: user_email })
    return exist
  } catch (error) {
    throw new Error('Error al buscar el usuario en la base de datos')
  }
}