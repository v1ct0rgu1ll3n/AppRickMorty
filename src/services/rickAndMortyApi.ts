import axios from 'axios'

// Inicialización de la API
const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

// Llamado con filtro por nombre, estado y género.
export const fetchCharacters = async (
  name = '',
  status = '',
  gender = ''
) => {
  const response = await api.get('/character', { //Llamo especificamente a personajes
    params: {
      name,
      status,
      gender,
    },
  })
  return response.data
}
