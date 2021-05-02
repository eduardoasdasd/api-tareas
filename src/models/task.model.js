import Sequelize from 'sequelize';
import { sequelize }  from '../database/database'

const TaskModel = sequelize.define('tasks', {
    responsable: {
        type:Sequelize.TEXT,
        allowNull:false,
        unique:true,
        validate: {
            notEmpty: true,
            len: [2,10]
        }
    },
    description: {type:Sequelize.TEXT}

}, { 
    timestamps: true // tema que se va a adicionar al modelo con 2 campos, createAt updateAt
})

export default TaskModel;