import { NextResponse } from "next/server";
import DB from '../../../database/db';
export const GET = async () =>{
     try{
      const db = new DB()
    const allEntries = await db.getAll()
    const length = allEntries.length
        const response = await fetch(process.env.API_URL!,{
          headers:{
            'Content-type': 'application/json'
          }
        })
        if (!response.ok) {
             throw new Error(`Error! status: ${response.status}`);
           }
           
           const products =  await response.json()
           return NextResponse.json({data:allEntries})
     }
     catch (err) {
         return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
       }  
}