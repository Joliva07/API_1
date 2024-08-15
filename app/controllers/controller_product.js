const db = require('../config/db.config.js');
const Product = db.Product;

exports.create = (req, res) => {
    let product = {};
    try {
        product.nombre = req.body.nombre;
        product.marca = req.body.marca;
        product.proveedor = req.body.proveedor;
        product.cantidad = req.body.cantidad;
        product.fecha_ingreso = req.body.fecha_ingreso;

        Product.create(product).then(result => {
            res.status(200).json({
                message: 'Producto creado exitosamente',
                product: result
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error al crear Producto',
            error: error
        });
    }
}

exports.getProductById = (req, res) =>{
    let productId = req.params.id;
    Product.findByPk(productId)
        .then(product =>{
            res.status(200).json({
                message: 'Producto encontrado con id='+productId,
                product: product
            });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar producto',
            error: error
        });
    });
}

exports.UpdatebyId = async (req, res) =>{
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if(!product){
            return res.status(404).json({
                message: 'Empleado no encontrado con id='+productId,
                product:"",
                error: '404'
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                marca: req.body.marca,
                proveedor: req.body.proveedor ,
                cantidad: req.body.cantidad ,
                fecha_ingreso: req.body.fecha_ingreso 
            }
            let result = await Product.update(updatedObject, {returning: true, where: {id: productId}});

            if (!result) {
                res.status(500).json({
                    message: 'Error al actualizar producto con id =' +req.params.id,
                    error: "no se puede actualizar producto"
                });
            }  
            res.status(200).json({
                message: 'Producto actualizado con id='+productId,
                product: result[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar al producto con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if(!product){
            res.status(404).json({
                message: "No existe el producto con el id = " + productId,
                error: "404",
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Se ha eliminado el producto con id = " + productId,
                product: product,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> no se puede eliminar el producto con id = " + req.params.id,
            error: error.message,
        });
    }
}