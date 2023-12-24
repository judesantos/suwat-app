import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/lib/types";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";

const POST = async (req: NextRequest) => {

  try {

    const body = await req.json() as { idToken: string};
    const idToken = body.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const cookie = await createSessionCookie(idToken, { expiresIn })
    cookies().set("__session", cookie, { maxAge: expiresIn, httpOnly: true});

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