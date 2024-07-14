import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchema } from './product.validation';
import { ProductControllers } from './product.controller';


const router = express.Router();

// create product route
router.post(
    '/create-product',
    validateRequest(ProductValidationSchema. productValidationSchema),
   ProductControllers. createProducts
  );

  // Get single Product route
router.get('/:id', ProductControllers.getSingleProduct);


// get all Product route
router.get('', ProductControllers.getAllProduct);


//delete Product route
router.delete('/:id', ProductControllers.deleteProduct);

// update Product route
router.put(
  '/:id',
  validateRequest(ProductValidationSchema.updateProductValidationSchema),
  ProductControllers.updateProduct
);




  export const ProductRoutes = router;