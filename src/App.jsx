import React, { useContext } from 'react'
import { ChatContext } from './pages/ChatContext'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

function App() {
  const {currentUser} = useContext(ChatContext)
  return (
    <div className="w-full h-full">
      {currentUser ? <Dashboard /> : <Login />}
    </div>
  )
}

export default App
