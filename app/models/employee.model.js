
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{ 
           type: Sequelize.STRING
        },
        apellido:{ 
            type: Sequelize.STRING
         },
        direccion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        cargo:{ 
            type: Sequelize.STRING
         },  
        edad:{ 
           type: Sequelize.INTEGER
        }, 
        copyrigth:{
            type: Sequelize.STRING,
            defaultValue: "UMG Antigua"
        }
    }) 
    return Employee;
}