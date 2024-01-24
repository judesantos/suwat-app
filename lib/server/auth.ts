import 'server-only';
import { cookies } from 'next/headers';
import {
  createSessionCookie,
  revokeAllSessions,
  getSessionUser,
  getSessionToken
} from '../firebase/firebase-admin';
import * as jwt from 'jsonwebtoken';
import { SessionCookie, User, UserSession } from '../types';
import { UserRecord } from 'firebase-admin/auth';

const jwt_key = process.env.NEXTAUTH_SECRET;

const getSession = async (): Promise<SessionCookie|undefined> => {

  let session_cookie = cookies().get("__session")?.value;
  if (session_cookie) {
    const decoded = JSON.parse(session_cookie);
    return decoded;
  }
}

const deleteSessionCookie = () => {
  const cookie = cookies().get("__session")?.value;
      if (cookie) {
        cookies().delete("__session");
      }
}

const getCurrentUser = async (): Promise<UserSession|undefined> => {

  const session: SessionCookie|undefined = await getSession();
  if (!session)
    return;
  let user:UserSession|undefined = undefined;
  const {type, user_id, token} = session;
  if (type === 'external') {
    const ext_user:UserRecord|undefined =  await getSessionUser(token);
    user = {...ext_user, id: user_id } as UserSession;
  } else {
    user = jwt.verify(token, jwt_key as jwt.Secret) as UserSession;
  }

  return user;
}

const isSessionAlive = async (): Promise<boolean> => {

  const session = await getSession();
  if (!session)
    return false;

  const {type, token} = session;
  if (type === 'external') {
    const decoded = await getSessionToken(token);
    if (!decoded) {
      revokeSession(session);
    }
    return decoded ? true : false;
  }

  // internal validation
  const decoded = jwt.verify(token, jwt_key as jwt.Secret);
  return decoded ? true : false;
}

const getLoggedInUser = async () => {

  const session = await getSession();
  if (!session)
    return false;

  const {type} = session;
  if (type === 'external') {
    return getCurrentUser();
  }

  // internal validation

  return false;
}

const saveSessionCookie = async (
  type: 'external'|'internal',
  data: string,
  user_id?: number,
): Promise<void> => {

  let token:string = '';
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  if (type === 'external') {
    token = await createSessionCookie(data, {expiresIn});
  } else {
    // internal cookie generator
    const key = process?.env?.NEXTAUTH_SECRET ?? '';
    token = jwt.sign(data, key, {expiresIn});
  }

  cookies().set(
    "__session", 
    JSON.stringify({type, user_id, token} as SessionCookie), 
    {
      maxAge: expiresIn, 
      httpOnly: true
    }
  );
}

const revokeSession = async (_session:SessionCookie|undefined = undefined) => {

  let session;
  if (_session) {
    session = await getSession();
    if (!session)
      return;
  } else {
    session = _session;
  }

  if (session) {
    const {type, token} = session;
    if (type === 'external') {
      await revokeAllSessions(token);
    }
  }

  // internal validation
  // - No need to revoke internal auth. token, cookie delete revokes token.
}


export {
  getSession,
  isSessionAlive,
  getLoggedInUser,
  saveSessionCookie,
  revokeSession,
  getCurrentUser,
  deleteSessionCookie
}