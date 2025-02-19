const { default: slugify } = require("slugify");
const fs = require("fs");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");



const dotenv = require("dotenv")

dotenv.config();

//payment gateway


const createProductController= async(req,res)=>{
     try {
        const {name ,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        switch (true) {
            case !name:
                return res.status(500).send({msg:"Name is required!"});
            case !description:
                return res.status(500).send({msg:"Decription is required!"});
            case !price:
                return res.status(500).send({msg:"price is required!"});
            case !category:
                return res.status(500).send({msg:"Category is required!"});
            case !quantity:
                return res.status(500).send({msg:"Quantity is required!"});
            // 
            case photo && photo.size > 1000000:
            return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });

            // if (!photo) {
            //     return res.status(500).send({ msg: "Photo is required!" });
            // } else if (photo.size > 1000000) {
            //     return res.status(500).send({ msg: "Photo size should be less than 1mb!" });
            // }
            
        }
        const products = new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(200).send({
            success:true,
            message:"products created successfully!",
            products    
        })
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "something went wrong while creating a products!"
        });
     }
}

const getAllProductController= async(req,res)=>{
      try {
         const  products =await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1});
         res.status(200).send({
            success:true,
            countTotal : products.length,
            message:"get All the Products!",
            products
         })
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wet wrong while a GETTING all products !"
        })
      }
}
const getSingleProductController= async(req,res)=>{
    try {
        const products = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            countTotal : products.length,
            message:"successfully get single  Products!",
            products
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wet wrong while a GETTING single products"
        }) 
    }
};

const getProductPhotoController=async(req,res)=>{
    try {
        const product =await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
             res.set("content-type",product.photo.contentType);
             return res.status(200).send(product.photo.data)
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wet wrong while a GETTING  products  PHOTO",
            
        }) 
    }
}
const deleteProductController=async(req,res)=>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:"successfully deleted the product!",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something wet wrong while a DELETING  products",
            
        }) 
    }
}
const updateProductController=async(req,res)=>{
    try {
        const {name ,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        
        switch (true) {
            case !name:
                return res.status(500).send({msg:"Name is required!"});
            case !description:
                return res.status(500).send({msg:"Decription is required!"});
            case !price:
                return res.status(500).send({msg:"price is required!"});
            case !category:
                return res.status(500).send({msg:"Category is required!"});
            case !quantity:
                return res.status(500).send({msg:"Quantity is required!"});
            case photo && photo.size > 1000000:
                return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new : true}
        );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(200).send({
            success:true,
            message:"products UPDATED successfully!",
            products    
        })
     } catch (error) {
        console.log(error);
        res.status(501).send({
            success:false,
            message: "something went wrong while UPDATING a products!"
        });
     }
}
const filterProductController=async(req,res)=>{
      try {
      const {radio,checked}=req.body;
      let args ={}
      if(checked.length > 0)  args.category= checked
      if(radio.length) args.price={$gte : radio[0],$lte: radio[1]};
  
      const products = await productModel.find(args);
      res.status(200).send({
        success:true,
        products
      })
      } catch (error) {
        console.log(error);
        res.status(403).send({
            success:false,
            message: "something went wrong while filtering the  products!",
            error
        });
      }
}
const productCountController=async(req,res)=>{
    try {
        const total =await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            message:"count  given successfully!",
            total
        })
    } catch (error) {
        console.log(error);
    }
}
const productListController=async(req,res)=>{
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
          .find({})
          .select("-photo")
          .skip((page - 1) * perPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        res.status(200).send({
          success: true,
          products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error in per page ctrl",
          error,
        });
    }
}
const  searchProductController=async(req,res)=>{
    try {
        const {keyword} = req.params;
        const results =  await productModel.find({
            $or:[
                  { name:{ $regex:keyword,$options:"i"}},
                  { description:{ $regex:keyword,$options:"i"}},

            ]  
        }).select("-photo");
        res.json(results); 
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "errr while searching for product!!!",
            error,
          });
    }

}
const similarProductController=async(req,res)=>{
    try {
        const {pId,cId}=req.params;
        const products = await productModel.find({
            category:cId,
            _id: {$ne:pId}
        }).select("-photo").limit(4).populate("category")
        res.status(200).send({
            success: true,
            products,
          });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error while searching  for related/similar product!",
            error,
          });  
    }

}
const categoryWiseProductController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        const products = await productModel.find({category}).populate("category")
        
        res.status(200).send({
            success: true,
            category,
            products,
           
          });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error while getting category wise product!",
            error,
          });    
    }
}

module.exports = { createProductController , getAllProductController ,
                getSingleProductController, getProductPhotoController,
                     deleteProductController , updateProductController,
                 filterProductController,productCountController,
                 productListController,searchProductController,
                 similarProductController,categoryWiseProductController,
                
               }