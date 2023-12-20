'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export const SignIn = async (
  provider: string,
) => {
  try {
    await signIn(provider);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
          break;
        default:
          return 'Something went wrong.'
      }
    }
    throw error;
  }
}

export const SignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    return error;
  }
}


