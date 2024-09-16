const express = require('express')
const router = express.Router()
const Task = require('./models/Tasks')

// here is the reference for post request
router.post('/',(req,resp)=>{
    const newTask = new Task({
        name:req.body.name,
        completed:req.body.completed || false
    })
    newTask.save()

    .then((task)=>resp.status(201).send(`Task created successfully${task}`))
    .catch(err=>resp.status(401).send(`Error in creating task:${err}`))
})

// here is the reference for get request
router.get('/',(req,resp)=>{
    const tasks = Task.find()
    .then(tasks => resp.status(200).json(tasks))
    .catch(err => resp.status(500).send('Error fetching tasks:', err));  
})

// here is the reference for put request
router.put('/',(req,resp)=>{
    resp.status(200).send('Put request successfull!!')
})

// here is the reference for delete request
router.delete('/:id',(req,resp)=>{
    Task.findByIdAndDelete(req.params.id)
    .then(task=>{
        if(!task){
            return resp.status(404).send('Task with this ID does not exist!!');
        }
        resp.send('Task deleted successfully!');
    })
    .catch(err=>{
        console.error(err);
      resp.status(500).send('Error occurred while deleting the task');
    })
})

module.exports = router;

