import 'server-only';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { Auth, SessionCookieOptions, UserRecord, getAuth } from 'firebase-admin/auth';

/**
 * 
 * Exported services
 */

const firebaseApp = getApps()
  .find(it => it.name === "suwat-93c8") || 
  initializeApp({
    credential: cert(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SERVICE_ACCOUNT || 'mock')
  }, 
    "suwat-93c8"
  );

const auth: Auth = getAuth(firebaseApp);

const getSessionToken = async (token:string) => {
  try {
    console.log({getSessionToken: token})
    return await auth.verifySessionCookie(token, true);
  } catch(e) {
    console.error({getSessionTokenException: e});
  }
}

const getSessionUser = async (token: string): Promise<UserRecord|undefined> => {

  try {
    const decoded = await getSessionToken(token);
    if (decoded)
      return await auth.getUser(decoded.uid);
  } catch (e) {
    console.error({getSessionUserException: e});
  }
}

const createSessionCookie = async (
  idToken: string, 
  sessionCookieOptions: SessionCookieOptions
): Promise<string> => {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

const revokeAllSessions = async (token:string): Promise<void>  => {
  const decoded = await getSessionToken(token);
  if (decoded)
    await auth.revokeRefreshTokens(decoded.sub);
}

export {
  revokeAllSessions,
  createSessionCookie,
  getSessionUser,
  getSessionToken,
  //auth,
  //firebaseApp
}






