import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import './index.css'

import { Provider } from 'react-redux'

import { store } from './store'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
)
