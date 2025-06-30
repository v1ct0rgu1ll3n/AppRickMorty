import { Character } from '@/types/character'

interface Props {
  character: Character
}

// Tarjeta donde muestro cada personaje por nombre, estado y género
export default function CharacterCard({ character }: Props) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 max-w-sm w-full mx-auto">

      {/* Imagen */}
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-72 object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-accent mb-1">{character.name}</h2> {/* Nombre */}
        <p className="text-sm text-gray-300">Estado: {character.status}</p> {/* Estado */}
        <p className="text-sm text-gray-400">Género: {character.gender}</p>{/* Género */}
        <p className="text-sm text-gray-400">Especie: {character.species}</p>{/* Especie */}
      </div>
    </div>
  )
}
