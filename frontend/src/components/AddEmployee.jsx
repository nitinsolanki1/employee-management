import axios from '../axiosConfig'
import React,{useState} from 'react'

const AddEmployee = ({setShowAddEmp,getSummary , showAddEmp}) => {
    const [values, setvalues] = useState({name:'', email:''})
    
const handleChange = (e) =>{
        setvalues({
            ...values,
            [e.target.name]:e.target.value
        })
    }
    
const handleAddEmployee = async (e) => {
    e.preventDefault()
    if(!values.name || !values.email ) return
    const response =  await axios.post("employee/addEmp",{name:values.name.trim(),email:values.email.trim()})
    if(!response.data.success){
      alert("username or email taken")
      console.log(response.data.Error)
    }
    setShowAddEmp(false)
    getSummary()
  }

  return (
    

    showAddEmp &&   <form get="/" className={`flex flex-col gap-2 w-[50v] mx-auto formPop`}>
            <input type="text" required name="name" placeholder='enter user name' value={values.name} onChange={handleChange}/>
            <input type="email" required name="email" placeholder='enter email' value={values.email} onChange={handleChange}/>
            <div className="btns mt-2 ">

            <button type='submit' className='bg-orange-500 px-5 py-1 text-white rounded-xl mr-2' onClick={handleAddEmployee}>Add user</button>
            <button type='submit' className='bg-orange-800 px-5 py-1 text-white rounded-xl ' onClick={()=>setShowAddEmp(false)}>close</button>
            </div>
        </form> 
    
    
  )
}

export default AddEmployee

