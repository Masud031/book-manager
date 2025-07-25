import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Provider } from 'react-redux'
import {store} from './app/store.ts'

import router from './routs/index.tsx'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
  <RouterProvider router={router} />
    </Provider>
   </StrictMode>,
)
