const productsController = {};

const Product = require('../models/Product');

productsController.renderProductForm = (req, res) => {
    res.render('products/newProduct', { currentUsername: req.user.username });
};

productsController.createNewProduct = async(req, res) => {
    const { prod_cod, prod_name, prod_price, prod_stock } = req.body;
    const newProduct = new Product({
        prod_cod,
        prod_name,
        prod_price,
        prod_stock
    });
    await newProduct.save();
    req.flash('success_msg', 'Product added successfully!');
    res.redirect('/products');
};

productsController.getAllProducts = async(req, res) => {
    const products = await Product.find().lean();
    res.render("products/list-products", {
        products: products,
        currentUsername: req.user.username,
    });
};

productsController.renderEditForm = async(req, res) => {
    const product = await Product.findById(req.params.id).lean();
    res.render('products/edit-product', {
        product,
        currentUsername: req.user.username
    });
};

productsController.updateProduct = async(req, res) => {
    const { prod_cod, prod_name, prod_price, prod_stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        prod_cod,
        prod_name,
        prod_price,
        prod_stock
    });
    req.flash('success_msg', 'Product updated successfully!');
    res.redirect('/products');
};

productsController.deleteProduct = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product removed successfully!');
    res.redirect('/products');
};

module.exports = productsController;