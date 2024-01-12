import { ApiResponse, User } from "../types";

const findUser = async (email:string): Promise<User|boolean> => {

  try {

    const resp = await fetch('/api/account/user?email='+email);

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;
    return (resp.ok && respBody.success) ? true : false

  } catch(e) {
    console.error(e);
  }

  return false;
}

export {
  findUser
}