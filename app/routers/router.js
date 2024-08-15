
let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');
const employee = require('../controllers/controller_employee.js');
const product = require('../controllers/controller_product.js');
const sucursal = require('../controllers/controller_sucursal.js');
const libro = require('../controllers/controller_libro.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);


// Employee routes
router.post('/api/employee/create', employee.create);
router.get('/api/employee/onebyid/:id', employee.getEmployeeById);
router.put('/api/employee/update/:id', employee.UpdatebyId);
router.delete('/api/employee/delete/:id', employee.deleteById);

// Product routes
router.post('/api/product/create', product.create);
router.get('/api/product/onebyid/:id', product.getProductById);
router.put('/api/product/update/:id', product.UpdatebyId);
router.delete('/api/product/delete/:id', product.deleteById);

// Sucursal routes
router.post('/api/sucursal/create', sucursal.create);
router.get('/api/sucursal/onebyid/:id', sucursal.getSucursalById);
router.put('/api/sucursal/update/:id', sucursal.UpdatebyId);
router.delete('/api/sucursal/delete/:id', sucursal.deleteById);

// Libro routes
router.post('/api/libro/create', libro.create);
router.get('/api/libro/onebyid/:id', libro.getLibroById);
router.put('/api/libro/update/:id', libro.UpdatebyId);
router.delete('/api/libro/delete/:id', libro.deleteById);

module.exports = router;