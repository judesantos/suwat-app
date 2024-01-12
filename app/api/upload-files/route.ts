import { ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs';

export async function POST(request: NextRequest) {

  try {

    let filesCount = 0;
    const data = await request.formData()
    const formValues = Array.from(data.values());


    for (const formValue of formValues) {

      if (typeof formValue === "object" && "arrayBuffer" in formValue) {

        const file: File = formValue as unknown as File;
        const buffer = Buffer.from(await file.arrayBuffer())

        fs.writeFileSync(`/tmp/${file.name}`, buffer)

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