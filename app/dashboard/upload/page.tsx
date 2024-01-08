import { redirect } from 'next/navigation';
import { Suspense } from 'react'
import FileDrop from '@/components/file-drop'
import { getCurrentUser } from '@/lib/firebase/firebase-admin';

export default async function UploadPage() {

  const currUser = await getCurrentUser();
  console.log({layout_dashboard: currUser})

  if (!currUser) redirect("/sign-in");

  return (
    <Suspense>
      <FileDrop/>
    </Suspense>
  )
}