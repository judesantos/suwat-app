
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse, DbError, DbResponse, DbStatusCode, User } from "@/lib/types";
import { addUser } from "@/lib/prisma/data";

const PUT = async (req: NextRequest) => {

  try {

    const body = await req.json() as { user: User};
    const user = body.user;

    const dbResponse: DbResponse = await addUser(user);

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
    
  } catch(e: any) {

    return NextResponse.json<ApiResponse<string>>({
      success: false, 
      error: e
    }, {
      status: 400
    })
  }



}

export { PUT };