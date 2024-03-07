import React, { useState,useEffect } from "react";
import axios from "axios";
function Show(){
    const [files, setFiles] = useState(null);
    const [titles, setTitles] = useState("")
    const [allPdf, setAllPdf] = useState(null)
    const [image, setImage] = useState();
    const [allImage , setAllImage] = useState();
        
    useEffect(()=>{
        getPdf();
    },[]);
    
    const getPdf = async()=>{
        const result = await axios.get("http://localhost:3001/get-files");
        console.log(result.data.data);
        setAllPdf(result.data.data)
    
    };

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
          formData.append("title", titles[i]);
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
    
    const showPdf = (pdf)=>{
        window.open(`http://localhost:3001/files/${pdf}`, "_blank", "noreferrer")
    }



    return(
        <form onSubmit={submitPdf}>
            
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="application/pdf"
                    multiple 
                    required
                    
                    onChange={(e)=> { 
                      console.log("files",e.target.files)
                      setFiles(e.target.files)
                    }} 
                />
            
            <input 
                className="form-control w-6/12 flex flex-row justify-center items-center "
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
            
                
                    <table className="border border-gray-500 border-separate">
                        <thead className="bg-gray-50">
                            <tr>
                            <th scope="col" className="border border-gray-200 px-4 py-2" >
                                Title
                            </th>
                            <th scope="col" className="border border-gray-200 px-4 py-2" >
                                Preview
                            </th>
                            </tr>
                        </thead>
                        {allPdf == null? "" : allPdf.map((data,index)=>{
                            return(
                                <tbody className="bg-yellow-200 divide-y divide-yellow-600 border p-9">
                                {/* PDF files */}
                            
                                    <tr>
                                        <td className='p-2'key={index} >{data.title}</td>
                                        <td >
                                        <button
                                            onClick={()=>showPdf(data.pdf)}
                                        >View</button>
                                        </td>
                                    </tr>
                            
                                </tbody>
                            )
                        })}
                            
                    </table>
                
            
            
        </form>
    )   
}

export default Show;