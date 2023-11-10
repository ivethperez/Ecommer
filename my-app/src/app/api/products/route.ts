import {type NextRequest, NextResponse } from "next/server";
export const GET = async () =>{
    try{

        const response = await fetch('https://api-product-5iv7.onrender.com/products')
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

          const products =  await response.json()
          return NextResponse.json({data:products})
    }
    catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }  
}