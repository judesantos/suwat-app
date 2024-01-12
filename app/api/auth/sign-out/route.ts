import { NextResponse, NextRequest } from "next/server";
import { deleteSessionCookie, revokeSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const GET = async (req: NextRequest, res: NextResponse) => {

  let success = false;
  try {

    await revokeSession();
    success = true;

  } catch (e) {

    console.error({signOutFailed: e})

  } finally {

    deleteSessionCookie();

  }

  revalidatePath("/");
  redirect("/sign-in");
}

export { GET };