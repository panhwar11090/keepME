import SignUp from './component/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'

import './App.css'
import Login from './component/Login'
import Home from './component/Home'


function App() {

  // const [notes, setNotes] = useState([]);

  //     function addNote(newNote) {
  //       setNotes((prevNotes) => {
  //         return [...prevNotes, newNote];
  //       })
  // }

  // function deleteNotes(id) {
  //   setNotes((preValue) => {
  //     return [...preValue.filter((note, index) => index !== id)];
  //   });
  // }

  return (
    <div className='p-0 m-0 box-border'>
      

      {/* <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>

          <ul className='navbar-nav'>
            <li className='nav-item'>
              <link>Home</link>
            </li>

          </ul>

        </nav>

      </div> */}
      <Router>
        <h1>huzaifas</h1>
        <Routes>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </Router>


      {/* <Header/>
      <CreateArea onAdd={addNote}/>
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
        />
      ))} */}
    </div>
  )
}

export default App
