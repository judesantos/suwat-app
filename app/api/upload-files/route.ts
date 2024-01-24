import { ApiResponse, UserSession } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs';
import { getCurrentUser } from '@/lib/server/auth';
import { addFile } from '@/lib/prisma/data';
import { File as UserFile } from '@/lib/types';

export async function POST(request: NextRequest) {

  try {

    let filesCount = 0;
    const data = await request.formData()
    const formValues = Array.from(data.values());

    const user:UserSession|undefined = await getCurrentUser();
    if (!user) {
      return NextResponse.json<ApiResponse<string>>({
        success: false, 
        data: "Session is invalid."
      });
    }

    for (const formValue of formValues) {

      if (typeof formValue === "object" && "arrayBuffer" in formValue) {

        const file: File = formValue as unknown as File;
        const buffer = Buffer.from(await file.arrayBuffer())

        fs.writeFileSync(`/tmp/${file.name}`, buffer)

        await addFile({
          user_id: user.id,
          filename: file.name
        } as UserFile);

        filesCount++;
      }
    }

    if (!filesCount) {

      return NextResponse.json<ApiResponse<string>>({
        success: false, 
        error: 'Failed to save files.'
      }, {
        status: 400
      });

    } else {

      return NextResponse.json<ApiResponse<string>>({
        success: true, 
        data: "Files saved successfully."
      });
    }

  } catch (e) {

    console.error(e);
  }

  return NextResponse.json<ApiResponse<string>>({
    success: false, 
    error: 'Something went wrong.'
  }, {
    status: 400
  });

}