'use client'
import React from "react";
import { useRouter } from 'next/navigation'
const ProductItem =({params}) =>{
  
    return (
        
        <div>
            producto {params.id}
        </div>
    )
}

export default ProductItem