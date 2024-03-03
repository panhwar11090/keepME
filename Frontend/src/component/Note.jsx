import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

function Note({title, description, onDelete, id }) {
    
    


  return (
    <div className="bg-white w-64 rounded-lg shadow-md p-4 m-4 float-left mr-0 ">
        
        <h1 className="text-base font-bold mb-2">{title}</h1>
        <p className="text-base text-red-700 mb-4">{description}</p>
        <button 
            onClick={() => onDelete(id)}
            className="relative float-right text-orange-400 border-none bg-transparent cursor-pointer outline-none"
        >  <MdDelete size={25} />
        
        </button>
            
        
    </div>
  );
}

export default Note;