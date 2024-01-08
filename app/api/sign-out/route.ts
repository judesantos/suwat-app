import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ApiResponse } from "@/lib/types";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

const GET = async () => {

  try {
    const cookie = cookies().get("__session")?.value;

    console.log('sign-out: ' + cookie)
    if (cookie) {
      cookies().delete("__session");
      await revokeAllSessions(cookie);
      console.log('cookie deleted.')
    }

    return NextResponse.json<ApiResponse<string>>({
      success: true,
      data: "Signed out successfully."
    })

  } catch (e) {

    return NextResponse.json<ApiResponse<string>>({
      success: false,
      error: "Sign out failed."
    })
  }

}

export { GET };