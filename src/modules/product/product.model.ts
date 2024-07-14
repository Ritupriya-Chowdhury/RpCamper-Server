import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';


const productSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    price:{ 
        type: Number, 
        required: true 
    },
    stockQuantity: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true
     },
    ratings: { 
        type: Number, 
        required: true 
    },
    images: { 
        type: [String], 
        required: true
     },
     isDeleted: {
        type: Boolean,
        default: false,
      },
});

export const Product = model<TProduct>('Product', productSchema);