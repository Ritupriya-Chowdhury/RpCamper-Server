import httpStatus, { OK } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProducts = catchAsync(async (req, res) => {

    const result = await ProductServices.createProductIntoDB(req.body);
    // console.log({result})

    sendResponse(res, {
      success: true,
      statusCode:httpStatus.OK,
      message: 'Product created successfully',
      data: result,
    });
 
});

//Get a Product
const getSingleProduct = catchAsync(async (req, res,next) => {
 
  const { id } = req.params;

  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Product retrieved successfully',
    data: result,
  });

});



// Get All Product 
const getAllProduct = catchAsync(async (req, res,next) => {
 
    const result = await ProductServices.getAllProductsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
 
});


// Update Product
const updateProduct = catchAsync(async (req, res) => {
 
    const { id } = req.params;
    const result = await ProductServices.updateProductIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
 
});


const deleteProduct = catchAsync(async (req, res,next) => {
  const {id}  = req.params;

  // console.log(id);

  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProducts,
  getSingleProduct,
  getAllProduct,
  deleteProduct,
  updateProduct
};