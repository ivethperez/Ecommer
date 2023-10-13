
import DB from '../../../../../src/database/db';
import { NextResponse } from "next/server";
//Traer un producto
export const GET = async (request, {params}) => {

  const db = new DB()
  //const avoId =  searchParams.values as string;//router.query.id as string
  const id = params.id
  const result = await db.getById(`${id}`)

    return NextResponse.json({data: result})
}