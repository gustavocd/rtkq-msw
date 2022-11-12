import { useGetPokemonByNameQuery } from 'src/services'

function App() {
  const pokemonQuery = useGetPokemonByNameQuery('pikachu')

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {pokemonQuery.error ? (
        <>Oh no, there was an error</>
      ) : pokemonQuery.isLoading ? (
        <>Loading...</>
      ) : pokemonQuery.data ? (
        <>
          <h3 style={{ textAlign: 'center' }}>
            {pokemonQuery.data.species.name}
          </h3>
          <img
            src={pokemonQuery.data.sprites.front_shiny}
            alt={pokemonQuery.data.species.name}
          />
        </>
      ) : null}
    </div>
  )
}

export default App
