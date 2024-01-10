import { NextRequest, NextResponse } from "next/server";
import connectDB from '@/lib/db'
import { ProductsModel } from "@/models/Products";
export const GET = async ( request: Request, { params }: { params: { id: number } }) => {

  await connectDB()
  const id = params.id
  try{
    const result = await ProductsModel.findById(id)
    return NextResponse.json({data: result},{status:200})
  }
  catch(error){
    return NextResponse.json({data: null},{status:500})
  }

}

export const DELETE = async ( request: Request, { params }: { params: { id: number } }) => {

  await connectDB()
  const id = params.id
  try{
    const result = await ProductsModel.findByIdAndDelete(id)
    return NextResponse.json({data: result},{status:200})
  }
  catch(error){
    return NextResponse.json({data: null},{status:500})
  }

}

export const PUT = async ( request: Request, { params }: { params: { id: number } }) => {

  await connectDB()
  const id = params.id
  const body = await request.json()
  try{
    const result = await ProductsModel.findByIdAndUpdate(id, {$set:{...body}},{new:true})
    
    return NextResponse.json({data: result},{status:200})
  }
  catch(error){
    return NextResponse.json({data: null},{status:500})
  }

}