import { ApiResponse, User } from "../types";

const findUser = async (email:string): Promise<User|undefined> => {

  try {

    const resp = await fetch('/api/account/user?email='+email);

    const respBody = (await resp.json()) as unknown as ApiResponse<string>;

    if (resp?.ok && respBody?.success) {
      return respBody.data as User | undefined; 
    }

  } catch(e) {
    console.error(e);
  }

}

export {
  findUser
}