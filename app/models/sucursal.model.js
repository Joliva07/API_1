
module.exports = (sequelize, Sequelize) => {
    const Sucursal = sequelize.define('sucursal',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{ 
           type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.INTEGER
        }, 
        copyrigth:{
            type: Sequelize.STRING,
            defaultValue: "UMG Antigua"
        }
    }) 
    return Sucursal;
}