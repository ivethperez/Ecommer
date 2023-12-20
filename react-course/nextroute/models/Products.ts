import mongoose from "mongoose";
import { Inter } from "next/font/google";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'']
    },
    description:{
        type: String,
        required: [true,'']
    },
    images:{
        type: String,
        required: [false,'']
    },
    priceKilo:{
        type: Number,
        required: [true,'']
    },
    priceMedio:{
        type: Number,
        required: [true,'']
    },
    priceCuarto:{
        type: Number,
        required: [true,'']
    },
    isKilo:{
        type: Boolean,
        required: [true,'']
    },
    isMedio:{
        type: Boolean,
        required: [true,'']
    },
    isCuarto:{
        type: Boolean,
        required: [true,'']
    },
    price:{
        type: Number,
        required: [false,'']
    }
})

export const ProductsModel = mongoose?.models?.Product || mongoose.model('Product',productsSchema)