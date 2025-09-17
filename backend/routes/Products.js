const express = require('express');
const router = express.Router();
const {Products} = require('../models');

router.get('/',async(req,res)=>{
    const productList = await Products.findAll();
    res.json(productList);
});

router.post('/',async (req,res)=>{
    const products = req.body;
    await Products.create(products);
    res.json(products)
})

module.exports = router;
