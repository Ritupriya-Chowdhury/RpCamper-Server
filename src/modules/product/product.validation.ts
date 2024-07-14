import { z } from 'zod';

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number().positive('Price must be a positive number'),
    stockQuantity: z
      .number()
      .int()
      .min(0, 'Stock quantity must be a non-negative integer'),
    description: z.string(),
    category: z.string(),
    ratings: z.number().min(0).max(5, 'Ratings must be between 0 and 5'),
    images: z.array(z.string()),
    isDeleted: z.boolean().optional(),
  }),
});
export const updateProductValidationSchema = z.object({
  body: z.object({
   
    price: z.number().optional(),
    stockQuantity: z
      .number().optional(),
    ratings: z.number().optional(),
    images: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidationSchema = {
    productValidationSchema,
    updateProductValidationSchema
};
