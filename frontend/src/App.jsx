import { useState, useEffect } from 'react'
import axios from "./axiosConfig"
import AddTask from './components/AddTask'
import './App.css'
import EditForm from './components/EditForm'
import AddEmployee from './components/AddEmployee'

function App() {

  const [empData, setEmpData] = useState([])
  const [task, setTask] = useState([])
  const [Editdetail, setEditDetail] = useState()
  const [showAddEmp, setShowAddEmp] = useState(false)
  const [showAddTask, setshowAddTask] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)


  const deleteTask = async (id) => {
    const response = await axios.delete(`/task/delete/task/${id}`)
    if (!response.data.success) {
      alert("error happend while deletion user")
      console.log(response.data.Error)
    }
    getSummary()
    getTask()
  }
  const handleEdit = async (e, tsk) => {
    setEditDetail(tsk)
    setShowEditForm(!showEditForm)
  }
  const getSummary = async () => {
    const response = await axios.get("/employee")
    setEmpData(response.data.result)
  }
  const getTask = async () => {
    const response = await axios.get("/task")
    console.log("response" ,response)
    setTask(response.data.result)

  }
  const deletEmployee = async (e, name) => {
    e.preventDefault()
    const response = await axios.delete(`/employee/delete/${name.trim()}`)
    if (!response.data.success) {
      alert("error happend while deletion user")
      console.log(response.data.Error)

    }
    getSummary()
    getTask()

  }
  useEffect(() => {
    getSummary()
    getTask()
  }, [])




  return (
    <div className='h-screen w-screen bg-white-100 grid grid-flow-col grid-row-6 '>
      <AddTask showAddTask={showAddTask} setshowAddTask={setshowAddTask} getSummary={getSummary} getTask={getTask} empData={empData} />
      <EditForm showEditForm={showEditForm} setShowEditForm={setShowEditForm} getSummary={getSummary} getTask={getTask} Editdetail={Editdetail} />
      <AddEmployee setShowAddEmp={setShowAddEmp} showAddEmp={showAddEmp} getSummary={getSummary} />

      <div className='col-span-3 bg-zinc-300 gap-3 flex justify-center flex-col items-center'>
        <button className='bg-green-500 px-5 py-2 mb-2 text-white rounded-xl ' onClick={() => setShowAddEmp(!showAddEmp)}>Add Employee</button>
        <div className=' w-[50%] '>
          <h1 className='bg-blue-700 rounded-lg text-white px-4 py-3'>Employees</h1>
          <div className='employee'>
            {empData && empData.map((e, i) => {
              return (
                <div key={i} className='border border-bottom-black flex justify-between w-full py-2 px-4'>
                  <h3>{e.name} </h3> <button onClick={(event) => deletEmployee(event, e.name)} className=" rounded-lg px-2 py-1 bg-red-300">delet</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>


      <div className='col-span-5 flex flex-col justify-evenly items-center'>
        <div className="task">
          <button className='bg-orange-500 px-5 py-2 mb-2 text-white rounded-xl ' onClick={() => setshowAddTask(!showAddTask)}>Add Task</button>
          <h1 className='mb-2'>Tasks</h1>
          <table className="table w-[700px] border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border">Task</th>
                <th className="px-4 py-2 text-left border">EmpName</th>
                <th className="px-4 py-2 text-left border">Status</th>
                <th className="px-4 py-2 text-left border">Date</th>
                <th className="px-4 py-2 text-left border">Update</th>
                <th className="px-4 py-2 text-left border">Delet</th>
              </tr>
            </thead>
            <tbody>
              {task.map((tsk, index) => {
                return <tr key={index}>
                  <td className="px-4 py-2 border">{tsk.title}</td>
                  <td className="px-4 py-2 border">{tsk.employee}</td>
                  <td className="px-4 py-2 border">{tsk.status}  </td>
                  <td className="px-4 py-2 border">{tsk.date.split("T")[0]}</td>
                  <td className="px-4 py-2 border"><button className='bg-yellow-400 rounded-lg px-3 py-2 ' onClick={(e) => handleEdit(e, tsk)}>Edit</button></td>
                  <td className="px-4 py-2 border"><button className='bg-red-400 rounded-lg px-3 py-2 ' onClick={() => deleteTask(tsk.id)}>delete</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>


        <div className="summary">
          <h1 className='mb-2'>Summary</h1>
          <table className="table w-[700px] border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border">name</th>
                <th className="px-4 py-2 text-left border">totaltask</th>
                <th className="px-4 py-2 text-left border">completed</th>
              </tr>
            </thead>
            <tbody>
              {empData?.map((emp, index) => {
                return <tr key={index}>
                  <td className="px-4 py-2 border">{emp.name}</td>
                  <td className="px-4 py-2 border">{emp.total_task}</td>
                  <td className="px-4 py-2 border">{emp.completed}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
