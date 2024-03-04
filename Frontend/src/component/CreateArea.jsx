import React, { } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from 'react';

function CreateArea({ onAdd , title: initialTitle, description: initialDescription }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: initialTitle || '',
    description:initialDescription || '',
  });

  useEffect(() => {
    setNote({
      title: initialTitle || '',
      description: initialDescription || '',
    });
  }, [initialTitle, initialDescription]);

  

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }



  function submitButton(event) {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
    // const userId = localStorage.getItem("userId"); // Assuming you store the userId in localStorage after login  
    const noteId = localStorage.getItem("noteId")
    console.log(token)
      console.log("huzaifa")
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
      // userId: userId
    };

    if(initialTitle && initialDescription){
      axios.put(`http://localhost:3001/note/${noteId}`, {
        title: note.title,
        description: note.description
      }, { headers })
      .then(response =>{
        console.log('Sucess', response.data)
        onUpdate(response.data.title, response.data.description);
        setExpanded({
          title:"",
          description:"",
        })
      })
      .catch(error =>{
        console.error('Error', error)
      });
    }else{
      axios.post("http://localhost:3001/note/", {
      title: note.title,
      description: note.description
    }, {
      headers: headers
    })
    .then(response => {
      // Handle successful response
      console.log('Success:', response.data);
      const { _id } = response.data; // Assuming _id is directly available in response.data
      localStorage.setItem('noteId', _id); 
      // Clear the form fields after submission
      onAdd(note);
      setNote({
        title: "",
        description: "",
      });
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  

    }
  
    
    event.preventDefault();
  }

  // function submitButton(event) {
  //   onAdd(note);
  //   setNote({
  //     title: "",
  //     content: "",
  //   });
  //   event.preventDefault();
  // }

  return (
    <div className="relative mx-auto mt-32 bg-white p-7 rounded-lg shadow-md w-full" style={{width:"600px", height:"200px", marginTop:"20px"}}>
      <form>
        {isExpanded && (
          <input
            className="w-full p-2 outline-none text-base resize-none ml-0 mt-0 border-none "
            value={note.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
        )}
        <p>
          <textarea
            className="w-full border-none p-1 mb-20 outline-none text-base resize-none mt-1"
            value={note.description}
            onClick={handleExpanded}
            name="description"
            placeholder="Take a note..."
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
          ></textarea>
        </p>
        <button 
          className="bg-yellow-500 text-white flex justify-center items-center rounded-full w-9 h-9 shadow-md absolute bottom-1 right-1 focus:outline-none" 
          onClick={submitButton}>
          <IoIosAdd size={35}/>
        </button>

        {/* <button
         className="bg-blue-500 text-white  mr-10 flex justify-center items-center rounded-full w-9 h-9 shadow-md absolute bottom-1 right-1 focus:outline-none"
          
        >
          <IoIosAdd size={35}/>
        </button> */}

      </form>
    </div>
  );
}

export default CreateArea;