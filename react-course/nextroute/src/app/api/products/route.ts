import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ProductsModel } from "@/models/Products";
export const GET = async () =>
{
    await connectDB()
    try{
        const result = await ProductsModel.find({})
        return (NextResponse.json({data:result},{status:200}))
    }
    catch(error){
        return NextResponse.json({data:null},{status:500})
        }
 
}

export const POST = async(req: Request,res:Response) =>{
try{
const body = await req.json()
const newProduct = await ProductsModel.create(body)
return NextResponse.json({data: newProduct},{status:201})
}
catch(error){
return NextResponse.json({data:error},{status:500})
}

}

