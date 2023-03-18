import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Result from './pages/result'
import Error from './pages/error'

import { ThemeProvider } from '@mui/material/styles'
import { muiTheme } from './services/theme'
import { Layout } from './components'

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
