const categoryModel = require("../models/categoryModel");

const slugify = require("slugify");
const userModel = require("../models/userModel");


const  createCategoryController=async(req,res)=>{
   try {
    const {name} =req.body;
    if(!name){
     return res.status(401).send({msg:"Name is Required!"});
    }
    const existingCategory = await categoryModel.findOne({name});
    if(existingCategory){
        return res.status(200).send({
            success: true,
            message:"catogory Already exist"
        });
    }
    const category = await new categoryModel({
        name,slug:slugify(name)
    }).save();  
    res.status(201).send({
        success:true,
        message:"new category Created!",
        category
    });

   } catch (error) {
     res.status(500).send({
        success:false,
        message:"something went wrong please try again!"
     })
   }

}

const updateCategoryController = async(req,res)=>{
  try {
     const {name}=req.body;
     const {id}=req.params;

     if (!name) {
        return res.status(400).send({
          success: false,
          message: "Category ID is required."
        });
    }   
     if (!id) {
        return res.status(400).send({
          success: false,
          message: "Category ID is required."
        });
      }
     const category  = await categoryModel.findByIdAndUpdate(
        id,
        {name,slug: slugify(name)},
        {new:true}
    );
    if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category not found."
        });
      }
    res.status(200).send({
        success:true,
        message:"Catogory Updated Successfully!",
        category:category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
        msg:"something went wrong while Updating please try again"
    })
  }
}

const getAllCategoryController=async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"successfully got all category!",
            category
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message: "something went wrong while getting all category!"
        })
    }

}
const getSingleCategoryController=async(req,res)=>{
    try {
       
    const category = await  categoryModel.findOne({slug:req.params.slug});
    res.status(200).send({
        success:true,
        message:" Successfully  Get The Single Category!",
        category
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something went wrong while a getting a single category!"
        })
    }
}
const deleteCategoryController = async(req,res)=>{
     try {
        const {id}=req.params;
        const category =await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
           success:true,
           message:"successfully Deleted category!",
           category
     })
     } catch (error) {
        console.log(error);
         res.status(500).send({
            success:false,
            message:"something went wrong while deleting a category"
         })
     }
}
module.exports={ createCategoryController , updateCategoryController ,
                getAllCategoryController , getSingleCategoryController ,
                deleteCategoryController };