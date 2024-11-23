import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import TableViewPage from './components/page/TableViewPage'
import Register from './components/Register'
import PrivateRoute from './components/authguard/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/table'
          element={
            <PrivateRoute>
              <TableViewPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
