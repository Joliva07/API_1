const db = require('../config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
    let libro = {};
    try {
        libro.nombre_libro = req.body.nombre_libro;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.pais_autor = req.body.pais_autor;
        libro.numero_paginas = req.body.numero_paginas;
        libro.anio_edicion = req.body.anio_edicion;
        libro.precio = req.body.precio;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: 'Libroo creado exitosamente',
                libro: result
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error al crear Libroo',
            error: error
        });
    }
}

exports.getLibroById = (req, res) =>{
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro =>{
            res.status(200).json({
                message: 'Libroo encontrado con id='+libroId,
                libro: libro
            });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar libro',
            error: error
        });
    });
}

exports.UpdatebyId = async (req, res) =>{
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if(!libro){
            return res.status(404).json({
                message: 'Empleado no encontrado con id='+libroId,
                libro:"",
                error: '404'
            });
        } else {
            let updatedObject = {
                nombre_libro : req.body.nombre_libro,
                editorial : req.body.editorial,
                autor : req.body.autor,
                genero : req.body.genero,
                pais_autor : req.body.pais_autor,
                numero_paginas : req.body.numero_paginas,
                anio_edicion : req.body.anio_edicion,
                precio : req.body.precio
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id: libroId}});

            if (!result) {
                res.status(500).json({
                    message: 'Error al actualizar libro con id =' +req.params.id,
                    error: "no se puede actualizar libro"
                });
            }  
            res.status(200).json({
                message: 'Libroo actualizado con id='+libroId,
                libro: result[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar al libro con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if(!libro){
            res.status(404).json({
                message: "No existe el libro con el id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Se ha eliminado el libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> no se puede eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}