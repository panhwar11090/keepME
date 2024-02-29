import SignUp from './component/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Login from './component/Login'
import Home from './component/Home'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
