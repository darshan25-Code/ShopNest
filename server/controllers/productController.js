
const Product = require('../models/Product')

const getAllProducts =async (req,res)=>{
     try{
        const products = await Product.find()

     res.status(200).json({
        success : true,
        products
     })
     }
     catch(error){
        res.status(500).json({
        success : false,
      message: error.message,
    });
     }
}

const createProducts = async (req,res)=>{
    try{ 
        const product = await Product.create(req.body)

        res.status(200).json({
            message : "Product Created successfully",
            success : true,
            product
        
        })
    }
    catch(error){
        res.status(500).json({
        success : false,
      message: error.message,
    });
     }
    
}

const getSingleProduct = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)

    if(!product){
            return res.status(404).json({
                message : "Product Not Found",
                success : fals
            })
        }
        res.status(200).json({
            message : "Product Found",
            success : true,
            product
        })
    }
    catch(error){
        res.status(500).json({
        success : false,
      message: error.message,
    });
     }
    
}

const updateProduct = async (req,res)=>{
    try{
           const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
        {
            new : true,
            runValidators: true,
        })
 if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

    }
    catch(error){
        res.status(500).json({
        success : false,
      message: error.message,
    });
     }
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports ={getAllProducts, createProducts, getSingleProduct, updateProduct, deleteProduct}