import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider } from "react-redux"
import { store } from './app/store'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

ReactDOM.createRoot
  (document.getElementById('root') as HTMLElement).render(
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
