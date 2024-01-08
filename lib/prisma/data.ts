import { DbResponse, DbStatusCode, StatusCode, User } from "../types";
import prisma, { marshallError } from "./prisma";


/** Helper method - converts BigInt to JSON friendly type (string) */
const preProcessResult = (result: any): any => {
  if (result?.id) {
    result.id = result.id.toString()
  }
  return result;
}

/** Helper method - handle DB errors */

/**
 * Db operation - find user by id or email 
 * @param id 
 * @param email 
 * @returns Db entry, user details
 */
const findUser = async (
  id: number | undefined, 
  email: string | undefined
): Promise<DbResponse> => {

  let result = undefined;

  try {

    const where = {
      where: {
        OR: [{
          id
        }, {
          email
        }],
      }
    }

    result = await prisma.user.findFirst(where);

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
  
  try{ 

    result = await prisma.user.create({data: user})
  
  } catch (e: any) { 

    return { status: DbStatusCode.FAILED, error: marshallError(e)};
  }

  result = preProcessResult(result);
  return {status: DbStatusCode.SUCCESS, result};
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
  updateUser
}
