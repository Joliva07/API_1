const db = require('../config/db.config.js');
const Sucursal = db.Sucursal;

exports.create = (req, res) => {
    let sucursal = {};
    try {
        sucursal.nombre = req.body.nombre;
        sucursal.direccion = req.body.direccion;
        sucursal.telefono = req.body.telefono;

        Sucursal.create(sucursal).then(result => {
            res.status(200).json({
                message: 'sucursal creada exitosamente',
                sucursal: result
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error al crear sucursal',
            error: error
        });
    }
}

exports.getSucursalById = (req, res) =>{
    let sucursalId = req.params.id;
    Sucursal.findByPk(sucursalId)
        .then(sucursal =>{
            res.status(200).json({
                message: 'sucursal encontrada con id='+sucursalId,
                sucursal: sucursal
            });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar sucursal',
            error: error
        });
    });
}

exports.UpdatebyId = async (req, res) =>{
    try {
        let sucursalId = req.params.id;
        let sucursal = await Sucursal.findByPk(sucursalId);

        if(!sucursal){
            return res.status(404).json({
                message: 'sucursal no encontrada con id='+sucursalId,
                sucursal:"",
                error: '404'
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                direccion: req.body.direccion ,
                telefono: req.body.telefono ,
            }
            let result = await Sucursal.update(updatedObject, {returning: true, where: {id: sucursalId}});

            if (!result) {
                res.status(500).json({
                    message: 'Error al actualizar sucursal con id =' +req.params.id,
                    error: "no se puede actualizar sucursal"
                });
            }  
            res.status(200).json({
                message: 'sucursal actualizado con id='+sucursalId,
                sucursal: result[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la sucursal con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let sucursalId = req.params.id;
        let sucursal = await Sucursal.findByPk(sucursalId);

        if(!sucursal){
            res.status(404).json({
                message: "No existe la sucursal con el id = " + sucursalId,
                error: "404",
            });
        } else {
            await sucursal.destroy();
            res.status(200).json({
                message: "Se ha eliminado la sucursal con id = " + sucursalId,
                sucursal: sucursal,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> no se puede eliminar la sucursal con id = " + req.params.id,
            error: error.message,
        });
    }
}