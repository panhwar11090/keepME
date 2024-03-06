// import React from 'react'
// import { useState, useEffect } from 'react';

// export const Uploads = () => {
//     const [file, setFile] = useState(null);
//     const [title, setTitle] = useState("")
//     const [allPdf, setAllPdf] = useState(null)
//     const [image, setImage] = useState();
//     const [allImage , setAllImage] = useState();

//     const onInputImageChange =(e) =>{
//         console.log(e.target.files[0]);
//         setImage(e.target.files[0]);
//     }
     
//     useEffect(()=>{
//         getImage();
//     },[])
    
    
//     useEffect(()=>{
//         getPdf();
//     },[]);
    
//     const getPdf = async()=>{
//         const result = await axios.get("http://localhost:3001/get-files");
//         console.log(result.data.data);
//         setAllPdf(result.data.data)
    
//     };

//     const submitPdf = async (e)=>{
//         e.preventDefault();
//         const formData = new FormData()
//         formData.append('title',title);
//         formData.append('file', file);
//         console.log(file)
//         const result = await axios.post(
//           "http://localhost:3001/upload-files", 
//           formData,
//           {
//             headers: {"Content-Type": "multipart/form-data"},
//           }
//         );
//           console.log(result)
//           if(result.data.status == "ok"){
//             alert('uploaded sucesfully');
//             getPdf()
//           }
//     }

//     const showPdf = (pdf)=>{
//         window.open(`http://localhost:3001/files/${pdf}`, "_blank", "noreferrer")
//     }
    
//     const showImage= (image)=>{
//         window.open(`http://localhost:3001/files/${image}`, "_blank", "noreferrer")
//     }

//     const submitImage = async (e)=>{
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image)
//         const result = await axios.post(
//           "http://localhost:3001/upload-image",
//           formData,
//           {
//             headers: {"Content-Type": "multiport/form-data"},
//           }
//         )
//         console.log(result)
//     }
    
//     const getImage = async()=>{
//         try {
//           const result = await axios.get("http://localhost:3001/get-image");
          
//           setAllImage(result.data.data);
          
//         } catch (error) {
//           console.error(error)
//         }
        
//     }

//   return (
//     <>
//         <div>
//             <form onSubmit={submitPdf}>
//             <label htmlFor="file-upload" className="cursor-pointer">
//                 Upload PDF

//                 <input
//                     id="file-upload"
//                     type="file"
//                     accept="application/pdf"
//                     required
//                     className="hidden"
//                     onChange={(e) => setFile(e.target.files[0])} />
//             </label>
//             <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Title"
//                 required
//                 onChange={(e) => setTitle(e.target.value)} />
//             {file && (
//                 <button
//                     className="bg-yellow-500 text-white py-2 px-4 rounded-md cursor-pointer"


//                 >
//                     submit
//                 </button>
//             )}
//             </form>
//         <div>
//               <h4>Uploaded PDF</h4>
//               <div>
//                   {allPdf == null ? "" : allPdf.map((data, index) => {
//                       return (
//                           <div>
//                               <h6 key={index}>Title:{data.title}</h6>
//                               <button
//                                   onClick={() => showPdf(data.pdf)}
//                               >
//                                   show pdf
//                               </button>
//                           </div>
//                       )
//                   })}
//               </div>
//           </div>
//           <div className="">
//               <form onSubmit={submitImage}>
//                   <input
//                       type="file"
//                       accept="image/*"
//                       onChange={onInputImageChange} />
//                   <button type="submit">Submit</button>
//               </form>
//               {allImage == null ? "" : allImage.map((data, index) => {
//                   console.log("IMAGE", data?.image)
//                   return (
//                       <>
//                           {/* <img key={data._id} src={data.image} height={200} width={200}/> */}
//                           <h6 key={index} onClick={() => showImage(data.image)}>Title:{data.image}</h6>
//                           <button onClick={() => showImage(data.image)}>view</button>
//                       </>
//                   )
//               })}
//           </div>
//         </div>
//     </>
//   )
// }

// export default Uploads;
