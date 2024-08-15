const db = require('../config/db.config.js');
const Employee = db.Employee;

exports.create = (req, res) => {
    let employee = {};
    try {
        employee.nombre = req.body.nombre;
        employee.apellido = req.body.apellido;
        employee.direccion = req.body.direccion;
        employee.telefono = req.body.telefono;
        employee.email = req.body.email;
        employee.cargo = req.body.cargo;
        employee.edad = req.body.edad;

        Employee.create(employee).then(result => {
            res.status(200).json({
                message: 'Empleado creado exitosamente',
                employee: result
            });
        });
    }catch(error) {
        res.status(500).json({
            message: 'Error al crear empleado',
            error: error
        });
    }
}

exports.getEmployeeById = (req, res) =>{
    let employeeId = req.params.id;
    Employee.findByPk(employeeId)
        .then(employee =>{
            res.status(200).json({
                message: 'Empleado encontrado con id='+employeeId,
                employee: employee
            });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar empleado',
            error: error
        });
    });
}

exports.UpdatebyId = async (req, res) =>{
    try {
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            return res.status(404).json({
                message: 'Empleado no encontrado con id='+employeeId,
                employee:"",
                error: '404'
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido ,
                direccion: req.body.direccion ,
                telefono: req.body.telefono ,
                email: req.body.email ,
                cargo: req.body.cargo,
                edad: req.body.edad 
            }
            let result = await Employee.update(updatedObject, {returning: true, where: {id: employeeId}});

            if (!result) {
                res.status(500).json({
                    message: 'Error al actualizar empleado con id =' +req.params.id,
                    error: "no se puede actualizar empleado"
                });
            }  
            res.status(200).json({
                message: 'Empleado actualizado con id='+employeeId,
                employee: result[0]
            });
        }   
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar al empleado con el id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "No existe el empleado con el id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Se ha eliminado el Empleado con id = " + employeeId,
                employee: employee,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> no se puede eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
}