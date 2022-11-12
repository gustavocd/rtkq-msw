import { waitFor } from '@testing-library/react'
import { renderWithProviders } from 'src/testUtils'
import App from 'src/App'
import { server } from 'src/jestSetup'
import dummyPokemon from 'src/tests/dummyPokemon'
import { rest } from 'msw'

describe('App', function () {
  test('PokemonFinder should display image with proper source', async () => {
    const { getByText, getByAltText, queryByText } = renderWithProviders(
      <App />,
    )

    expect(queryByText(/loading.../i)).toBeInTheDocument()

    await waitFor(() => {
      const rgxName = new RegExp(dummyPokemon.name, 'i')
      const rgxAlt = new RegExp(dummyPokemon.species.name, 'i')
      expect(getByText(rgxName)).toBeInTheDocument()
      expect(getByAltText(rgxAlt)).toBeInTheDocument()
    })

    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  })

  test('PokemonFinder should display an error when the request fail', async () => {
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
        console.log('this is something...')
        return res(ctx.status(500), ctx.json('an error has occurred'))
      }),
    )

    const { getByText, queryByText } = renderWithProviders(<App />)

    expect(queryByText(/loading.../i)).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText(/oh no, there was an error/i)).toBeInTheDocument()
    })

    expect(queryByText(/loading.../i)).not.toBeInTheDocument()
  })
})
