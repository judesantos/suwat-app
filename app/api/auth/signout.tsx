
import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

const logout = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn()
      }}
    >
        <Button
          className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
        >
          Sign Out
        </Button>
    </form>
  )
}

export default logout;