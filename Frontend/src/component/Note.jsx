import React from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import axios from "axios";

function Note({title, description, onDelete, _id, onUpdate }) {

  
  const handleUpdate = () => {
    onUpdate(title, description,_id);
  };


  

  function handleDelete() {
    // Make an HTTP DELETE request to delete the note
    const token = localStorage.getItem("token");
    const noteId = localStorage.getItem("noteId")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      // userId: userId
    };
    axios.delete(`http://localhost:3001/note/${noteId}`, {
        headers: headers
    })
      .then(response => {
        // If the deletion was successful, call the onDelete callback to update the UI
        onDelete(id);
      })
      .catch(err=>{
        console.log("error deleting note",err)
      })
      
  }
    
  

  return (
    <div className="bg-white w-64 rounded-lg shadow-md p-4 m-4 float-left mr-0 ">
  
        <h1 className="text-base font-bold mb-2">{title}</h1>
        <p className="text-base text-red-700 mb-4">{description}</p>
        <button 
            // onClick={() => onDelete(id)}
            onClick={handleDelete}
            className="relative float-right text-orange-400 border-none bg-transparent cursor-pointer outline-none"
        >  
          <MdDelete size={25} />
        </button>

        <button
          className="relative float-right text-blue-400 border-none bg-transparent cursor-pointer outline-none ml-2"
          onClick={handleUpdate}
        >
          <MdUpdate size={25}/>
        </button>
        
        
            
        
    </div>
  );
}

export default Note;