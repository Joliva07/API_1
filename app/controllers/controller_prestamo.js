const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
    let prestamo = {};
    try {
        prestamo.codigo_prestamo = req.body.codigo_prestamo;
        prestamo.codigo_usuario = req.body.codigo_usuario;
        prestamo.fecha_salida = req.body.fecha_salida;
        prestamo.fecha_max_devolucion = req.body.fecha_max_devolucion;
        prestamo.fecha_devolucion = req.body.fecha_devolucion;

        Prestamo.create(prestamo).then(result => {
            res.status(200).json({
                message: 'Prestamoo creado exitosamente',
                prestamo: result
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error al crear Prestamoo',
            error: error
        });
    }
}

exports.getPrestamoById = (req, res) =>{
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo =>{
            res.status(200).json({
                message: 'Prestamoo encontrado con id='+prestamoId,
                prestamo: prestamo
            });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar prestamo',
            error: error
        });
    });
}

exports.UpdatebyId = async (req, res) =>{
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if(!prestamo){
            return res.status(404).json({
                message: 'Empleado no encontrado con id='+prestamoId,
                prestamo:"",
                error: '404'
            });
        } else {
            let updatedObject = {
                codigo_prestamo : req.body.codigo_prestamo,
                codigo_usuario : req.body.codigo_usuario,
                fecha_salida : req.body.fecha_salida,
                fecha_max_devolucion : req.body.fecha_max_devolucion,
                fecha_devolucion : req.body.fecha_devolucion
            }
            let result = await Prestamo.update(updatedObject, {returning: true, where: {id: prestamoId}});

            if (!result) {
                res.status(500).json({
                    message: 'Error al actualizar prestamo con id =' +req.params.id,
                    error: "no se puede actualizar prestamo"
                });
            }  
            res.status(200).json({
                message: 'Prestamoo actualizado con id='+prestamoId,
                prestamo: result[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar al prestamo con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if(!prestamo){
            res.status(404).json({
                message: "No existe el prestamo con el id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Se ha eliminado el prestamo con id = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> no se puede eliminar el prestamo con id = " + req.params.id,
            error: error.message,
        });
    }
}