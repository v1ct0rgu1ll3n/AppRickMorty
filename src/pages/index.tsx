import { useState } from 'react'
import useSWR from 'swr'
import { fetchCharacters } from '@/services/rickAndMortyApi'
import CharacterCard from '@/components/CharacterCard'
import { Character } from '@/types/character'

export default function Home() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [gender, setGender] = useState('')

  // Query combinada, se concatena para que SWR vuelva a llamar cada vez que cambie algo
  const { data, error, isLoading } = useSWR([search, status, gender], () =>
    fetchCharacters(search, status, gender)
  )

  return (
    <main className="min-h-screen px-6 py-8 bg-background text-text">
      <h1 className="text-3xl font-bold text-center mb-6 text-accent">
        Explorador de personajes de Rick y Morty
      </h1>
      <br />
      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Div input busqueda por nombre */}
        <div>
          <label htmlFor="search-input" className="block text-white text-sm font-bold mb-2">Nombre del personaje:</label>
          <input
            id="search-input"
            className="w-full p-3 rounded bg-card text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Buscar personaje..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Div select estado del personaje */}
        <div>
          <label htmlFor="select-status" className="block text-white text-sm font-bold mb-2">Estado del personaje:</label>
          <select
            id="select-status"
            className="w-full p-3 rounded bg-card text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Div select género del personaje */}
        <div>
          <label htmlFor="select-gender" className="block text-white text-sm font-bold mb-2">Género del personaje</label>
          <select
            id="select-gender"
            className="w-full p-3 rounded bg-card text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Todos los géneros</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown"> Desconocido</option>
          </select>
        </div>
      </div>

      {/* Cargando busqueda */}
      {isLoading && <p className="text-center">Cargando...</p>}

      {/* Errores separados por tipo */}
      {error && (
        <div className="bg-red-900/60 border border-red-500 text-white p-4 rounded-lg text-center max-w-xl mx-auto">
          {error.response?.status === 404 ? (
            <>
              <h2 className="text-xl font-semibold">Sin resultados </h2>
              <p>No se encontraron personajes que coincidan con tu búsqueda.</p>
            </>
          ) : error.response?.status >= 500 ? (
            <>
              <h2 className="text-xl font-semibold">Error del servidor </h2>
              <p>Intenta de nuevo más tarde. Es posible que la API no esté disponible en este momento.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Algo salió mal </h2>
              <p>No se pudo cargar la información. Verifica tu conexión o intenta recargar la página.</p>
            </>
          )}

           {/* Boton para recargar pagina */} 
          <button
            onClick={() => location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition"
          >
            Reintentar
          </button>
        </div>
      )}


      {/* Importo la funcion de CharacterCard para mostrar cada personaje */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {data?.results?.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

    </main>
  )
}
