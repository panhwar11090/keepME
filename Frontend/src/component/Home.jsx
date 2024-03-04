import React from 'react'
import { useState } from 'react'
import CreateArea from './CreateArea'
import Header from './Header'
import Note from './Note'
const Home = () => {
  const [notes, setNotes] = useState([]);
  
  const [updateContent, setUpdateContent] = useState({ title: '', description: '' });

  // useEffect(() => {
  //   // Fetch notes from the backend when the component mounts
  //   axios.get('http://localhost:3001/note')
  //     .then(response => {
  //       setNotes(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching notes:', error);
  //     });
  // }, [deleteNoteById]);


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

  const updateNote = (title, description) => {
    setUpdateContent({ title, description });
  };

  
  return (
    <div>
        <Header/>
      < CreateArea onAdd={addNote} title={updateContent.title} description={updateContent.description}/>
        {notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            description={note.description}
            onDelete={deleteNoteById}
            onUpdate={updateNote}
          />
        ))}
    </div>
  )
}

export default Home
