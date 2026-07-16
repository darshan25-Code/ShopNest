const express = require('express')
const router = express.Router()
const {protect, adminOnly} = require('../middleware/authMiddleware')
const {getAllProducts, createProducts, getSingleProduct, updateProduct, deleteProduct,addProductReview} = require('../controllers/productController')


router.get("/",getAllProducts)
router.post("/",protect, adminOnly,createProducts)
router.get("/:id",getSingleProduct)
router.put("/:id",protect, adminOnly,updateProduct)
router.delete("/:id",protect, adminOnly,deleteProduct)
router.post(
  "/:id/reviews",
  protect,
  addProductReview
);

module.exports = router