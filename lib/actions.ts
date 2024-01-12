'use server';

import { revalidatePath } from "next/cache";
import { addUser, findUser, validateUserAccount } from "./prisma/data";
import {
  AppResponse, 
  DbError, 
  DbResponse, 
  DbStatusCode, 
  ServerErrorResponse, 
  StatusCode, 
  User 
} from "./types"
import z from 'zod';
import { redirect } from "next/navigation";
import { saveSessionCookie } from "./server/auth";

/**
 * Reset password request form 
 * 
 * Server action on React Server Component
 * @param prev 
 * @param formData 
 * @returns 
 */
const passwordResetRequest = async (
  prev: any,
  formData: FormData
): Promise<{
  success: boolean,
  result?: User,
  errors?: any | {message: string, code: StatusCode}
}> => {
  console.log({passwordResetRequest: formData.get('email')})
  const PasswordResetFormSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email"
      })
      .email("Please enter a valid email")
      .max(50, "Email exceeds limit of 50 characters"),
  });

  const email = formData.get('email')?.toString() ??  '';

  // validate form input
  const validator = PasswordResetFormSchema.safeParse({email});
  if (!validator.success) {
    return {success: false, errors: validator.error.flatten().fieldErrors}
  }
  // Fetch email from DB
  const resp: DbResponse = await findUser(email);
  if (resp.status === DbStatusCode.SUCCESS) {
    /**
     * TODO: Send password reset email to user here.
     *   const user = resp.result as User;
     *  sendPasswordResetEmail({
     *    username: user.userName,
     *    email: user.email
     *  })
     */
    revalidatePath("/forgot");
    redirect("/forgot/confirmation");
  }
  // else - something is wrong
  throw "Password reset failed."
}

/**
 * Sign in email password
 * 
 * Server action on React Server Component
 * @param prev 
 * @param formData 
 * @returns 
 */
const emailPasswordSignIn = async (
  prev: any,
  formData: FormData
): Promise<{
  success: boolean,
  errors?: any | {message: string, code: StatusCode}
}> => {

  const SignInFormSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Invalid email"
      })
      .email("Please enter a valid email")
      .max(50, "Email exceeds limit of 50 characters"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Invalid password"
      })
      .min(8, "Password too short")
      .max(50, "Password length too long"),
  });

  const email = formData.get('email')?.toString() ??  '';
  const password = formData.get('password')?.toString() ?? '';

  // validate form input
  const validator = SignInFormSchema.safeParse({email, password});
  if (!validator.success) {
    return {success: false, errors: validator.error.flatten().fieldErrors}
  }

  // Validate user account
  const resp: AppResponse =  await validateUserAccount(email, password);
  if (resp.status === StatusCode.SUCCESS) {
    // Save User info in session
    console.log({emailPasswordLogin: resp})
    await saveSessionCookie('internal', resp.data);
    // Show authenticated landing page 
    revalidatePath("/dashboard")
    // Validation passed
    return {success: true};
  } else {
    // failed with details
    return {success: false, errors: {message: resp.message, code: resp.status}} 
  }
}

/**
 * 
 * @param user 
 * @returns 
 */
const newAccount = async (user: User): Promise<AppResponse> => {

  const dbResponse: DbResponse = await addUser(user);

  if (dbResponse.status === DbStatusCode.SUCCESS) {

    return {status: StatusCode.SUCCESS}

  } else {

    const dbErr:DbError|undefined = dbResponse.error as DbError;

    if (dbErr) {
      if (dbErr.code && dbErr.code === DbStatusCode.UNIQUE_ENTRY_VIOLATION) {

        return {
          status: StatusCode.ACCOUNT_EXISTS,
          message: "You already have an account. Please sign in to your account."
        };

      } else {

        return {
          status: StatusCode.FAILED,
          message: dbErr.message
        }

      }
    }
    return ServerErrorResponse.UNKNOWN_ERROR;
  }
}

export {
  newAccount,
  emailPasswordSignIn,
  passwordResetRequest
}