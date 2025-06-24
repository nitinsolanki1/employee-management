const express = require("express")
const router = express.Router()
const db = require("../db")


router.get("/",(req,res)=>{
      let qry = "select * from task"
    db.query(qry,(err,result)=>{
        if(err){
             console.log(err)
             res.send({success:false,msg:"error in finding task",Error:err})
              return
            }

        res.send({success:true,msg:"heres the task",result})
    })
})


router.delete("/delete/task/:id",(req,res)=>{
      let qry2 = `delete from task where id='${req.params.id}'`
    db.query(qry2,(err,result)=>{
        if(err){
             console.log(err)
             res.send({success:false,msg:"error in deleting task",Error:err})
              return
            }
                 

        res.send({success:true,msg:"task deleted ",result})
                

    })
})

router.post("/addTask",(req,res)=>{

    const {title,employee,date,status} = req.body;
    let qry = "insert into task (employee,title,date) values(?,?,?)"

    let arr = [employee,title,date]
    
    db.query(qry,arr,(err,result)=>{
        if(err)
        {
            console.log("error",err)
            res.send({success:false,msg:"enter valid employee",Error:err})
            return; 
        }
    let qry2 = `update employees set total_task=total_task+1 where name='${employee}'`
        db.query(qry2 ,(err)=>{
            if(err) {
                console.log(err)
            res.send({success:false,msg:"error in adding task",Error:err})

                return
            }
        })
    res.send({success:true,msg:"task added successfully" ,result})    })
})
module.exports = router