import SignUp from './component/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'

import './App.css'
import Login from './component/Login'
import Home from './component/Home'


function App() {

  return (
    <>
      <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>

          <ul className='navbar-nav'>
            <li className='nav-item'>
              <link>Home</link>
            </li>

          </ul>

        </nav>

      </div>
      <Router>
        <h1>huzaifas</h1>
        <Routes>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
