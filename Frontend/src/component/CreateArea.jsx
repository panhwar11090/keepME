import React, { } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect } from 'react';


function CreateArea({ onAdd , title: initialTitle, description: initialDescription }) {
  const [isExpanded, setExpanded] = useState(false);
  const [files, setFiles] = useState(null);
  const [titles, setTitles] = useState("")
  const [allPdf, setAllPdf] = useState(null)
  const [image, setImage] = useState();
  const [allImage , setAllImage] = useState();

  const [note, setNote] = useState({
    title: initialTitle || '',
    description:initialDescription || '',
  });

  const onInputImageChange =(e) =>{
    const files = e.target.files
    const selectedImages = Array.from(files)
    // console.log(e.target.files[0]);

    setImage(selectedImages);
  }


  useEffect(()=>{
    getImage();
  },[])


  useEffect(()=>{
    getPdf();
  },[]);

  const getPdf = async()=>{
    const result = await axios.get("http://localhost:3001/get-files");
    console.log(result.data.data);
    setAllPdf(result.data.data)

  };



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


  // const submitPdf = async (e)=>{
  //   e.preventDefault();
  //   const formData = new FormData()
  //   formData.append('title',title);
  //   formData.append('file', file);
  //   console.log(file)
  //   const result = await axios.post(
  //     "http://localhost:3001/upload-files", 
  //     formData,
  //     {
  //       headers: {"Content-Type": "multipart/form-data"},
  //     }
  //   );
  //     console.log(result)
  //     if(result.data.status == "ok"){
  //       alert('uploaded sucesfully');
  //       getPdf()
  //     }
  // }


  const submitPdf = async (e) => {
    e.preventDefault();
    console.log("filesfiles",files)
    const formData = new FormData();

    // Append all selected files to the FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    // Append titles to the FormData
    for (let i = 0; i < titles.length; i++) {
      formData.append("title", titles);
    }

    try {
      const result = await axios.post(
        "http://localhost:3001/multi-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      if (result.data.status === "ok") {
        alert('uploaded successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };





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

  const showPdf = (pdf)=>{
    window.open(`http://localhost:3001/files/${pdf}`, "_blank", "noreferrer")
  }

  const showImage= (image)=>{
    window.open(`http://localhost:3001/files/${image}`, "_blank", "noreferrer")
  }


  const submitImage = async (e)=>{
    e.preventDefault();
    console.log("image",image)
    const formData = new FormData();
    // formData.append("image", image)

    for (let i = 0; i < image.length; i++) {
      formData.append("file", image[i]);
    }

    const result = await axios.post(
      "http://localhost:3001/multi-image",
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"},
      }
    )
    console.log(result)
  }

  const getImage = async()=>{
    try {
      const result = await axios.get("http://localhost:3001/get-image");
      
      setAllImage(result.data.data);
      
    } catch (error) {
      console.error(error)
    }
    
  }




  return (
    <div className="relative mx-auto mt-32 bg-white p-7 rounded-lg shadow-md w-full" style={{width:"600px", height:"200px", marginTop:"20px"}}>
      <form onSubmit={submitPdf}>
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
        {/* <label for="file-upload" className="flex items-center justify-center w-32 h-12 bg-blue-500 text-white rounded-md cursor-pointer">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Upload PDF
        </label> */}


              <label htmlFor="file-upload" className="cursor-pointer">
                Upload PDF
                
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="application/pdf"
                    multiple 
                    required
                    className="hidden"
                    onChange={(e)=> { 
                      console.log("files",e.target.files)
                      setFiles(e.target.files)
                    }
                    } 
                />
              </label>
              <input 
                  className="form-control"
                  type="text"
                  placeholder="Title"
                  required
                  onChange={(e)=> setTitles(e.target.value)} 
                
                />
              {
                files && (
                  <button 
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md cursor-pointer"
                  
                
                  >    
                    submit 
                  </button>
                )
              }
              

        
        
        
        {/* <input 
          type="file" 
          accept="application/pdf"
          required  
        /> */}

        {/* <button
         className="bg-blue-500 text-white  mr-10 flex justify-center items-center rounded-full w-9 h-9 shadow-md absolute bottom-1 right-1 focus:outline-none"
          
        >
          <IoIosAdd size={35}/>
        </button> */}

      </form>
      <div>
        <h4>Uploaded PDF</h4>
        <div>
          {allPdf == null? "" : allPdf.map((data,index)=>{
            return(
              <div>
                <h6 key={index}>Title:{data.title}</h6>
                <button
                  onClick={()=>showPdf(data.pdf)}
                >
                  show pdf
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <div className="">
        <form onSubmit={submitImage}>
            <input 
              type="file" 
              accept="image/*"
              multiple
              onChange={onInputImageChange} 
            />
            <button type="submit">Submit</button>
        </form>
        {allImage == null? "" : allImage.map((data,index)=>{
          console.log("IMAGE", data?.image)
          return (
            <>
            {/* <img key={data._id} src={data.image} height={200} width={200}/> */}
            <h6 key={index} onClick={()=>showImage(data.image)}>Title:{data.image}</h6>
            <button onClick={()=>showImage(data.image)}>view</button>
          </>
        )
        })}
      </div>
    </div>
  );
}

export default CreateArea;