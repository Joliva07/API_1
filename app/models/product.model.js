
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{ 
           type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING
        },
        proveedor: {
            type: Sequelize.STRING
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        fecha_ingreso: {
            type: Sequelize.STRING
        },  
        copyrigth:{
            type: Sequelize.STRING,
            defaultValue: "UMG Antigua"
        }
    }) 
    return Product;
}