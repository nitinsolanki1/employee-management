import React,{useState} from 'react'
import axios from '../axiosConfig'

const AddTask = ({showAddTask , setshowAddTask,getSummary,getTask,empData}) => {
 const getDate = () =>{
  let dt = new Date()
  let yyyy = dt.getFullYear()
  let mm = dt.getMonth().toString().padStart(2,'0')
  let dd = dt.getDate().toString().padStart(2,'0')
  return `${yyyy}-${mm}-${dd}`
 }
    const [values, setvalues] = useState({name:'', text:''})
    const handleChange = (e) =>{
        setvalues({
            ...values,
            [e.target.name]:e.target.value
        })
    }


    const handleAddTask = async(e)=>{
        e.preventDefault()
        if(!values.name || !values.text) {
            alert("provide credentials")
        return
        }
      const isEmp =  empData.filter((emp)=> emp.name.trim() == values.name.trim())
      // console.log(isEmp)
      if(isEmp.length <= 0){
        alert("employee dont exist")
        setvalues({name:"",email:""})
        setshowAddTask(false)
        return
      }

      
        const newTask = {
            title:values.text.trim(),
            status:"todo",
            employee:values.name.trim(),
            date:getDate()
        }
        
        
      const response = await axios.post("/task/addTask" , {...newTask})
        if(response.data.success){
          getSummary()
          getTask()
        }
        alert(response.data.msg)
        // console.log(response.data.Error)
        setvalues({name:'', text:''})
        setshowAddTask(!showAddTask)
    }
  return (
      showAddTask && <form get="/" className={`flex flex-col gap-2 w-[50v] mx-auto formPop`}>
            <input
               type="text" 
               required 
               name="name" 
               placeholder='enter user name' 
               value={values.name || '' }
               onChange={handleChange}/>

            <input 
               type="text"
               required
               name="text"
               placeholder='enter task detail' 
               value={values.text || ''} 
               onChange={handleChange}/>
           
            <div className="btns mt-2 ">
            <button type='submit' className='bg-orange-500 px-5 py-1 text-white rounded-xl mr-2' onClick={handleAddTask}>Add This Task</button>
            <button  className='bg-orange-800 px-5 py-1 text-white rounded-xl ' onClick={()=>setshowAddTask(!showAddTask)}>close</button>
            </div>
        </form> 
    
  )
}

export default AddTask