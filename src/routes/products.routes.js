const { Router } = require('express');
const router = Router();

const {
    renderProductForm,
    createNewProduct,
    getAllProducts,
    renderEditForm,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controller');

const { isAuthenticated } = require('../helpers/auth');

// Crear nuevo producto
router.get('/products/add', isAuthenticated, renderProductForm);
router.post('/products/new-product', isAuthenticated, createNewProduct);

// Obtener todos los productos
router.get('/products', isAuthenticated, getAllProducts);

// Editar producto
router.get('/products/edit/:id', isAuthenticated, renderEditForm);
router.post('/products/edit/:id', isAuthenticated, updateProduct);

// Eliminar un producto
router.post('/products/delete/:id', isAuthenticated, deleteProduct);

module.exports = router;