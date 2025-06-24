const express = require("express")
const router = express.Router()
const db = require("../db")



//route to get employee 
router.get("/",async(req,res)=>{

    db.query(`select * from employees `,(err,result)=>{
        if(err){
            console.log(ree)
            res.send({success:false,msg:"error in finding employees",error:err})
            return;
        }

        res.send({success:true,msg:"heres the employee detail",result})

    })
})
//route to add employee 
router.post("/addEmp",async(req,res)=>{

    db.query(`insert into employees (name,email) values(?,?)`,[req.body.name , req.body.email],(err,result)=>{
        if(err){
            console.log(err)
            res.send({success:false,msg:"employee allready exist",error:err})
            return;
        }

        res.send({success:true,msg:"employee addeed ",result})

    })
})

router.delete("/delete/:name",(req,res)=>{
      let qry = `delete from employees where name='${req.params.name}'`
      let qry2 = `delete from task where employee='${req.params.name}'`
    db.query(qry2,(err)=>{
        if(err){
             console.log(err)
             res.send({success:false,msg:"error in deleting employee",Error:err})
              return
            }
                    db.query(qry,(err,result)=>{
                        if(err){
                            console.log(err)
                            res.send({success:false,msg:"error in deleting employee",Error:err})
                            return
                            }

                res.send({success:true,msg:"employee deleted ",result})
                    })

    })
})

router.put("/updateEmp" , (req,res)=>{
    const {name,title,status,id} = req.body
    let oldTask;
    db.query("select * from task where id=?",[id],(err,result)=>{
      
        oldTask = result[0]
        if(err) console.log(err) 
      
    
    let qry = "update task set title=? , status=? where employee=? and id=?"
    let qry2 = "update employees set completed=completed+1 where name=?"
    let qry3 = "update employees set completed=completed-1 where name=?"

    let data = [title,status,name,id]

    db.query(qry,data,(err,result)=>{
        if(err){
            res.send({success:false,msg:"Error happend",Error:err})
            console.log(err)
            return
        }

        if(oldTask.status == status){
            res.send({success:true,msg:"data updated",result})
            return 
        }else if(oldTask.status == "todo" && status == "completed"){
             db.query(qry2,[name],(err,result2)=>{
                 if(err){
                        res.send({success:false,msg:"Error happend",Error:err})
                        console.log(err)
                        return
                    }
                      res.send({success:true,msg:"data updated",result2})
             })
        }else if(oldTask.status === "completed" && status === "todo"){
              db.query(qry3,[name],(err,result3)=>{
                 if(err){
                        res.send({success:false,msg:"Error happend",Error:err})
                        console.log(err)
                        return
                    }
                      res.send({success:true,msg:"data updated",result3})
             })
        }

    })
    
   
        })
  
})
module.exports = router