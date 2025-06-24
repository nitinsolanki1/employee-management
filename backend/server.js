const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8000
const mysql = require("mysql2/promise")
const db = require("./db")
const bodyParser = require("body-parser")
const employeeController = require("./controller/empController")
const taskController = require("./controller/taskController")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/task",taskController)
app.use("/api/employee",employeeController)


// //route to get employee 
// app.get("/emp",async(req,res)=>{

//     db.query(`select * from employees `,(err,result)=>{
//         if(err){
//             console.log(ree)
//             res.send({success:false,msg:"error in finding employees",error:err})
//             return;
//         }

//         res.send({success:true,msg:"heres the employee detail",result})

//     })
// })
// //route to add employee 
// app.post("/addEmp",async(req,res)=>{

//     db.query(`insert into employees (name,email) values(?,?)`,[req.body.name , req.body.email],(err,result)=>{
//         if(err){
//             console.log(err)
//             res.send({success:false,msg:"employee allready exist",error:err})
//             return;
//         }

//         res.send({success:true,msg:"employee addeed ",result})

//     })
// })
//route to get task 
// app.get("/task",(req,res)=>{
//       let qry = "select * from task"
//     db.query(qry,(err,result)=>{
//         if(err){
//              console.log(err)
//              res.send({success:false,msg:"error in finding task",Error:err})
//               return
//             }

//         res.send({success:true,msg:"heres the task",result})
//     })
// })

//route to deleye employee by name
// app.delete("/delete/:name",(req,res)=>{
//       let qry = `delete from employees where name='${req.params.name}'`
//       let qry2 = `delete from task where employee='${req.params.name}'`
//     db.query(qry2,(err)=>{
//         if(err){
//              console.log(err)
//              res.send({success:false,msg:"error in deleting employee",Error:err})
//               return
//             }
//                     db.query(qry,(err,result)=>{
//                         if(err){
//                             console.log(err)
//                             res.send({success:false,msg:"error in deleting employee",Error:err})
//                             return
//                             }

//                 res.send({success:true,msg:"employee deleted ",result})
//                     })

//     })
// })
//route to delete task by id
// app.delete("/delete/task/:id",(req,res)=>{
//       let qry2 = `delete from task where id='${req.params.id}'`
//     db.query(qry2,(err,result)=>{
//         if(err){
//              console.log(err)
//              res.send({success:false,msg:"error in deleting task",Error:err})
//               return
//             }
                 

//         res.send({success:true,msg:"task deleted ",result})
                

//     })
// })
//route to update employee
// app.put("/updateEmp" , (req,res)=>{
//     const {name,title,status,id} = req.body
//     let oldTask;
//     db.query("select * from task where id=?",[id],(err,result)=>{
      
//         oldTask = result[0]
//         if(err) console.log(err) 
      
    
//     let qry = "update task set title=? , status=? where employee=? and id=?"
//     let qry2 = "update employees set completed=completed+1 where name=?"
//     let qry3 = "update employees set completed=completed-1 where name=?"

//     let data = [title,status,name,id]

//     db.query(qry,data,(err,result)=>{
//         if(err){
//             res.send({success:false,msg:"Error happend",Error:err})
//             console.log(err)
//             return
//         }

//         if(oldTask.status == status){
//             res.send({success:true,msg:"data updated",result})
//             return 
//         }else if(oldTask.status == "todo" && status == "completed"){
//              db.query(qry2,[name],(err,result2)=>{
//                  if(err){
//                         res.send({success:false,msg:"Error happend",Error:err})
//                         console.log(err)
//                         return
//                     }
//                       res.send({success:true,msg:"data updated",result2})
//              })
//         }else if(oldTask.status === "completed" && status === "todo"){
//               db.query(qry3,[name],(err,result3)=>{
//                  if(err){
//                         res.send({success:false,msg:"Error happend",Error:err})
//                         console.log(err)
//                         return
//                     }
//                       res.send({success:true,msg:"data updated",result3})
//              })
//         }

//     })
    
   
//         })
  
// })
//route to add new task
// app.post("/addTask",(req,res)=>{

//     const {title,employee,date,status} = req.body;
//     let qry = "insert into task (employee,title,date) values(?,?,?)"

//     let arr = [employee,title,date]
    
//     db.query(qry,arr,(err,result)=>{
//         if(err)
//         {
//             console.log("error",err)
//             res.send({success:false,msg:"enter valid employee",Error:err})
//             return; 
//         }
//     let qry2 = `update employees set total_task=total_task+1 where name='${employee}'`
//         db.query(qry2 ,(err)=>{
//             if(err) {
//                 console.log(err)
//             res.send({success:false,msg:"error in adding task",Error:err})

//                 return
//             }
//         })
//     res.send({success:true,msg:"task added successfully" ,result})    })
// })




app.listen(PORT,()=>{
    console.log(`server running om port ${PORT}`)
})