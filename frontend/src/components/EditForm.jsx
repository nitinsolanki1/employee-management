import axios from '../axiosConfig'
import React,{ useEffect, useState} from 'react'

const EditForm = ({showEditForm , getTask , getSummary, setShowEditForm,Editdetail}) => {
    const [values, setvalues] = useState({employee:"",title:""})
     useEffect(() => {
    if (Editdetail) {
      setvalues({...Editdetail})
    }
  }, [Editdetail])

  
    const handleChange = (e) =>{
        setvalues({
            ...values,
            [e.target.name]:e.target.value
        })
    }


    const hanldeUpdate = async(e)=>{
        e.preventDefault()
        if(!values.title) return
        const response = await axios.put("/employee/updateEmp",{name:values.employee , title:values.title, status:values.status , id:values.id})
        if(!response.data.success){
            console.log("error happend while updating")
            return
        }
        getTask()
        getSummary()
       setShowEditForm(!showEditForm)
       setvalues({})
        setShowEditForm(!showEditForm)
      }

      const handleClose = () =>{
        setvalues({})
        setShowEditForm(!showEditForm)
      }

        

    
  return (
      showEditForm && Editdetail && <form get="/" className={`flex flex-col gap-2 w-[50v] mx-auto formPop`}>
        <h1>Edit Form</h1>
            <input type="text" 
             required 
             name="employee"
            
             value={values.employee || ''}
             onChange={()=>{}} 
             />

             <input 
             type="text" 
             required
             name="title" 
             value={values.title }
             onChange={handleChange}/>

            <span className='flex w-[80%] '>

                <label htmlFor="status">
                todo
                <input type="radio" required name="status" value={"todo"}  checked={values.status === "todo"} onChange={handleChange}/>
                </label>
                <label htmlFor="status">
                completed
                <input type="radio" required name="status" value={"completed"}  checked={values.status === "completed"} onChange={handleChange}/>
                </label>
            </span>
            <div className="btns mt-2 ">

            <button type='submit' className='bg-orange-500 px-5 py-1 text-white rounded-xl mr-2' onClick={hanldeUpdate}>update</button>
            <button type='submit' className='bg-orange-800 px-5 py-1 text-white rounded-xl ' onClick={handleClose}>close</button>
            </div>
        </form> 
    
  )
}

export default EditForm