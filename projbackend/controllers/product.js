const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            res.status(400).json({
                error: "problem loading image"
            });
        }

        // de-structure te fields
        const {name, description, price, category, stock} = fields;

        if(!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all necessary fields"
            })
        }
        let product = new Product(fields)

        // handle the file here
        if(file.photo) {
            if(file.photo.size > 3000006) {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Not Able to save in DB"
                });
            }
            res.json(product);
        });
    });
}