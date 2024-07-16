import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Product } from "./product.model";

//create meeting room
const createProductIntoDB = async (payload: TProduct) => {

  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const [result] = await Product.create([payload],{session});

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Product');
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }

};

  //Get single Product
  const getSingleProductFromDB = async (id: string) => {
 

    const session=await mongoose.startSession();
    
   
     try{
       session.startTransaction();
   
      
       const result = await Product.findById(id);
   
       if (!result) {
         throw new AppError(httpStatus.NOT_FOUND, 'No Data Found')
       }
   
       await session.commitTransaction();
       await session.endSession();
   
       return result;
   
    }catch(err:any){
     await session.abortTransaction();
     await session.endSession();
     throw new Error(err);
   
    }
     
    
   };
   
   // Get all Products
   const getAllProductsFromDB = async (query: Record<string, unknown>) => {
   
     const session=await mongoose.startSession();
     const { search, category, minPrice, maxPrice, sortByPrice } = query;
   
     try{
       session.startTransaction();
   
      
       
  let filter: any = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string );
  }

  let sort: any = {};
  if (sortByPrice) {
    sort.price = sortByPrice === 'asc' ? 1 : -1;
  }

  const result =await Product.find(filter).sort(sort);

       await session.commitTransaction();
       await session.endSession();
   
       return result;
   
    }catch(err:any){
     await session.abortTransaction();
     await session.endSession();
     throw new Error(err);
   
    }
     
    
   };
   
   
   
   
   
   // Delete room
   const deleteProductFromDB = async (id: string) => {
     // console.log(id);
     const session=await mongoose.startSession();
   
     try{
       session.startTransaction();
   
      
       const result = await Product.findOneAndUpdate(
         {_id:id},
         {isDeleted:true},
         { new: true }
         );
   
       if (!result) {
         throw new AppError(httpStatus.NOT_FOUND, 'No Data Found')
       }
   
       await session.commitTransaction();
       await session.endSession();
   
       return result;
   
    }catch(err:any){
     await session.abortTransaction();
     await session.endSession();
     throw new Error(err);
   
    }
    
   };
   
    //update Product
 const updateProductIntoDB = async ( id: string, payload: Partial<TProduct>) => {
 
  const session=await mongoose.startSession();

  try{
    session.startTransaction();

   
    const result = await Product.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found')
    }

    await session.commitTransaction();
    await session.endSession();

    return result;

 }catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err);

 }
  
};

  



export const ProductServices = {
    createProductIntoDB,
    getSingleProductFromDB,
    getAllProductsFromDB,
    deleteProductFromDB,
    updateProductIntoDB

    
    
};
