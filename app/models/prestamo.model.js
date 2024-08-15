module.exports = (sequelize, Sequelize) => {
	const Prestamo = sequelize.define('prestamo', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  codigo_prestamo: {
			type: Sequelize.INTEGER
	  },
	  codigo_usuario: {
			type: Sequelize.INTEGER
  	},
	  fecha_salida: {
			type: Sequelize.STRING
	  },
	  fecha_max_devolucion: {
			type: Sequelize.STRING
    },
	  fecha_devolucion: {
        type: Sequelize.STRING
    }
	});
	
	return Prestamo;
}