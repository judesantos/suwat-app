'use server'; 

import { AppResponse, DbResponse, DbStatusCode, StatusCode, User } from "../types";
import { hashString } from "../utils";
import prisma, { marshallError, marshallDbData } from "./prisma";

/** Helper method - converts BigInt to JSON friendly type (string) */
const preProcessResult = (result: any): any => {
  return marshallDbData(result);
}

/** Helper method - handle DB errors */

const validateUserAccount = async (
  email: string,
  password: string
): Promise<AppResponse> => {

  try {

    const q = {where: {email}};

    const result = await prisma.user.findFirst(q);
    
    if (result) {
      if (result?.password !== hashString(password)) {
        // password match failed
        return {status: StatusCode.INVALID_VALUE, message: "Invalid email or password"};
      } else {
        return {status: StatusCode.SUCCESS, data: preProcessResult(result)};
      }
    } else {
      return {status: StatusCode.NOT_FOUND, message: "Invalid email or password"};
    }

  } catch (e) {

    console.error({validateUserAccountError: e})
    return {status: StatusCode.FAILED, message: "Login failed"};

  }

}

/**
 * Db operation - find user by id or email 
 * @param id 
 * @param email 
 * @returns Db entry, user details
 */
const findUser = async (
  email: string,
  id?: number
): Promise<DbResponse> => {

  let result = undefined;

  try {

    let q = id ? {where: {OR: [{id}, {email}]}} : {where: {email}};
    // fetch!
    result = await prisma.user.findFirst(q as any);
    if (!result) {
      return {status: DbStatusCode.RECORD_NOT_FOUND}
    }

  } catch (e: any) {

    return {status: DbStatusCode.FAILED, error: e}

  }

  result = preProcessResult(result);
  return {status: DbStatusCode.SUCCESS, result}

}

/**
 * Db operation - get all users
 * TODO: pagination
 *  
 * @returns 
 */
const fetchUsers = async (): Promise<DbResponse> => {
  let result = undefined;
  
  try {

    result = await prisma.user.findMany();

  } catch (e: any) {

    return {status: DbStatusCode.FAILED, error: marshallError(e)}

  }

  result = preProcessResult(result);
  return { status: DbStatusCode.SUCCESS, result}
}

/**
 * Db operation - create new user account with User details
 *  
 * @param user 
 * @returns 
 */
const addUser = async (user: User): Promise<DbResponse> => {
  let result = undefined;
  try { 
    // Set data for User table
    let data: any = {
      email: user.email,
      userName: user.userName,
      fullName: user.fullName,
      password: user.password,
      phone: user.phone
    };
    // Include auth_providers, if any
    if (user?.providers?.length) {
      const auth_providers: any = {create: []};
      user.providers.forEach(p => auth_providers.create.push({provider: p.provider}));
      data.auth_provider = auth_providers;
    }
    // Insert into User table.
    // Return User try, including it's fk - auth_provider
    result = await prisma.user.create({
      data,
      include: { 
        auth_provider: true
      }
    });

    return {status: DbStatusCode.SUCCESS, result: preProcessResult(result)};

  } catch (e: any) { 

    console.log({addUserException: e})
    return { status: DbStatusCode.FAILED, error: marshallError(e)};
  }
}

/**
 * Db operation - Update user details 
 * @param user 
 * @returns 
 */
const updateUser = async (user: User): Promise<DbResponse> => {
  
  let result = undefined;

  try{ 

    result = await prisma.user.update({
      where: {id: user.id},
      data: user
    })
  
  } catch (e:any) { 

    return { status: DbStatusCode.FAILED, error: marshallError(e)};
  }

  result = preProcessResult(result);
  return {status: DbStatusCode.SUCCESS, result};
}


export {
  fetchUsers,
  findUser,
  addUser,
  updateUser,
  validateUserAccount
}
