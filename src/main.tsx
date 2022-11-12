import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { setupStore } from 'src/store'
import 'src/index.css'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
