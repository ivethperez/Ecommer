import { IncomingMessage, ServerResponse } from 'http'
import DB from '@database'
import { NextResponse } from 'next/server'
//import enablePublicAccess from '@cors'

const allAvos = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    // Generally, you would not want this in your apps.
    // See more in 'cors.js'
    //await enablePublicAccess(req, res)

    const db = new DB()
    const allEntries = await db.getAll()
    console.log(allEntries)
    const length = allEntries.length

    // Notice: We're manually setting the response object
    // However Next.JS offers Express-like helpers :)
    // https://nextjs.org/docs/api-routes/response-helpers
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET')
    response.end(JSON.stringify({ length, data: allEntries }))
  } catch (e) {
    console.error(e)
   // response.statusCode = 500
    //response.end(
      //JSON.stringify({ length: 0, data: [], error: 'Something went wrong' })
    //)
  }
}

export default allAvos