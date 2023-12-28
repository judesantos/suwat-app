import 'server-only';

import { cookies } from 'next/headers';

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { Auth, SessionCookieOptions, UserRecord, getAuth } from 'firebase-admin/auth';

const getSession = async (): Promise<string | undefined> => {
  try {

    return cookies().get("__session")?.value;

    console.log('getSession: ' + cookies)
  } catch (error) {
    return undefined;
  }
}

/**
 * 
 * Exported services
 */

const firebaseApp = 
  getApps().find(it => it.name === "suwat-93c8") ||
  initializeApp(
    {
      credential: cert(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SERVICE_ACCOUNT || 'mock')
    }, 
    "suwat-93c8"
  );

const auth: Auth = getAuth(firebaseApp);

const isUserAuthenticated = async (session: string | undefined = undefined): Promise<boolean> => {

  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = await auth.verifySessionCookie(_session, true);
    return !isRevoked;
  } catch (e) {
    console.error(e);
    return false;
  }
}

const getCurrentUser = async () => {

  const session = await getSession();
  if (!session) return false;

  if (await !isUserAuthenticated(session)) {
    return false;
  }

  const decodedIdToken = await auth.verifySessionCookie(session);
  const currentUser: UserRecord = await auth.getUser(decodedIdToken.uid);
  
  return currentUser;
}

const createSessionCookie = async (
  idToken: string, 
  sessionCookieOptions: SessionCookieOptions
): Promise<string> => {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

const revokeAllSessions = async (session: string): Promise<void>  => {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}

export {
  revokeAllSessions,
  createSessionCookie,
  isUserAuthenticated,
  getCurrentUser,
  auth,
  firebaseApp
}






