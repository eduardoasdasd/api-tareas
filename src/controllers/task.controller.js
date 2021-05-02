import TaskModel from '../models/task.model'

export const getTasks = async (req, res) =>{
    const tasks = await TaskModel.findAll();
    return res.json(tasks);
}

export const getTaskById = async (req,res) => {
    const { id } = req.params
    const task = await TaskModel.findOne({
        where:{id}
    });
    if (task){
        return res.json(task);
    }
    else{
        return res.json({msg:'No hay resultados'})
    }
}

export const createTask = async (req, res) => {
    try{

    const { responsable, description } = req.body;
    const task = await TaskModel.create({
        responsable,
        description
     })
    return res.json({ 
        msg: 'Tarea creada con exito' 
    })
    }
    catch(error){
        return res.status(500).json({error})
    }     
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    const { responsable, description } = req.body
    const task = await TaskModel.findOne({
        where:{id}    
    })
    if (task){
        const updateTask = await task.update({
            responsable,
            description
        })
        return res.json({msg:"Tarea actualizada con exito", updateTask})
    }
    else{
        return res.json({msg:'No hay resultados'})
    } 

}

export const deleteTask = async (req, res) => {
    const {id} = req.params
    const task = await TaskModel.findOne({
        where:{id}    
    })

    if(task)
    {
        await TaskModel.destroy({
        where:{id}
        })
        return res.json({msg:"Tarea eliminada"})
    }
    else
        return res.json({msg:"Tarea no encontrada"})

}

export const deleteAllTask = async (req, res)=>{
    try{
        const tasks = await TaskModel.findAll();
    
        if(tasks.length > 0)
        {
            tasks.forEach(async(task)=>{
                await TaskModel.destroy({
                    where:{id:task.id}
                    })
            }) 
            
        }
        else{
            return res.status(404).json({msg:"No hay registros"})
        }
    }
    catch(error){
        return res.status(500).json({error})
    }
}
