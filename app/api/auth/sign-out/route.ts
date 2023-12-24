import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ApiResponse } from "@/lib/types";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";

const GET = async () => {

  const cookie = cookies().get("__session")?.value

  if (cookie) {
    cookies().delete("__session");
    await revokeAllSessions(cookie);
  }

  return NextResponse.json<ApiResponse<string>>({
    success: true,
    data: "Signed out successfully."
  })

}

export { GET };