import { findUser } from "@/lib/prisma/data";
import { ApiResponse, DbError, DbResponse, DbStatusCode } from "@/lib/types";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams
    const email = params.get('email')

    let dbResponse: DbResponse = {} as DbResponse;
    if (email)
      dbResponse = await findUser(email as string);

    if (dbResponse.status === DbStatusCode.SUCCESS) {
      return NextResponse.json<ApiResponse<string>>({
        success: true, 
        data: dbResponse.result
      });

    } else {

      return NextResponse.json<ApiResponse<DbError|undefined>>({
        success: false, 
        error: dbResponse.error
      }, {
        status: 400
      })

    }
    
  } catch (e: any) {

    return NextResponse.json<ApiResponse<string>>({
      success: false, 
      error: e
    }, {
      status: 400
    })
  }

}

export { 
  GET
}