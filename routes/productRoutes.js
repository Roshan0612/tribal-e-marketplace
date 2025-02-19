const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {createProductController  , getAllProductController ,
    getSingleProductController ,  getProductPhotoController ,
    deleteProductController , updateProductController,
    filterProductController,productListController,
    productCountController,categoryWiseProductController,
    searchProductController,
    similarProductController,
    }  = require("../controllers/productController")

    
   
    
        
const ExpressFormidable = require("express-formidable");

const router = express.Router();

router.post("/create-product",requireSignIn,isAdmin, ExpressFormidable() ,createProductController);
router.get("/get-all-product",requireSignIn,getAllProductController);

router.get("/get-single-product/:slug",requireSignIn,isAdmin,getSingleProductController);

router.get("/product-photo/:pid",getProductPhotoController);

router.delete("/delete-product/:pid",requireSignIn,isAdmin,deleteProductController);

router.put("/update-product/:pid",requireSignIn,isAdmin, ExpressFormidable() , updateProductController);
router.post("/filter-product",filterProductController)
router.get("/product-count",productCountController)
router.get("product-list/:page",productListController)
router.get("/search-product/:keyword",searchProductController)
router.get("/similar-product/:pId/:cId",similarProductController)
//get category wise product
router.get("/category-wise-product/:slug",categoryWiseProductController)



module.exports  =   router;