import React from 'react'
import { useState } from 'react'
import CreateArea from './CreateArea'
import Header from './Header'
import Note from './Note'
const Home = () => {
  const [notes, setNotes] = useState([]);

      function addNote(newNote) {
        setNotes((prevNotes) => {
          return [...prevNotes, newNote];
        })
  }
  
  function deleteNoteById(id) {
    
    setNotes((prevNotes) => {
      return prevNotes.filter((note, index) => index !== id);
    });
  }
  
  return (
    <div>
        <Header/>
      < CreateArea onAdd={addNote}/>
        {notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            description={note.description}
            onDelete={deleteNoteById}
          />
        ))}
    </div>
  )
}

export default Home
