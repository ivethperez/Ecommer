import { IncomingMessage, ServerResponse } from 'http'
import DB from '@database'
import { NextResponse } from "next/server";

const allAvos = async () => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'
    const db = new DB()
    const allEntries = await db.getAll()
    const length = allEntries.length

    // Notice: We're manually setting the response object
    // However Next.JS offers Express-like helpers :)
    // https://nextjs.org/docs/api-routes/response-helpers


    NextResponse.json({data:allEntries})
  } catch (e) {
    console.error(e)

  }
}

export default allAvos