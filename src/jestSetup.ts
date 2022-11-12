import '@testing-library/jest-dom'
import { fetch, Headers, Request, Response } from 'cross-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import dummyPokemon from 'src/tests/dummyPokemon'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
    return res(ctx.json(dummyPokemon))
  }),
]

export const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())
