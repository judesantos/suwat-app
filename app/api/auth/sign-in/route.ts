import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/lib/types";
import { saveSessionCookie } from "@/lib/server/auth";

const POST = async (req: NextRequest) => {

  try {

    const body = await req.json() as { type: 'external'|'external', idToken: string, user_id: number};
    const idToken = body.idToken;
    const type = body.type;
    const user_id = body.user_id;

    await saveSessionCookie(type, idToken, user_id)
    
  } catch(e) {

    return NextResponse.json<ApiResponse<string>>({
      success: false, 
      error: JSON.stringify(e)
    }, {
      status: 400
    })
  }

  return NextResponse.json<ApiResponse<string>>({
    success: true, 
    data: "Signed in successfully."
  });


}

export { POST };