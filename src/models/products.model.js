import mongoose from 'mongoose';

const product = mongoose.Schema(
    {
        name: {
            type: String
        },
        qty: {
            type: Number
        },
        description: { 
            type: String
        }
    },
    { collection: "Products" }
);

export const Product = mongoose.model("products", product);