import SignUp from './component/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route,Router } from 'react-router-dom';


import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        {/* <Route path='/signup' element={<SignUp/>}></Route> */}
      </Routes>
    </Router>
  )
}

export default App
