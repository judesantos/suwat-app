import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { auth } from "./firebase"

const authenticate = async (
  provider: AuthProvider
): Promise<{
  success: boolean,
  credential?: UserCredential
}> => {

  let _success = false;
  let cred: UserCredential|undefined = undefined;
  try {

    cred = await signInWithPopup(auth, provider);
    _success = true;

  } catch (e: any) {

    if (e.email && e.credential && e.code === "auth/account-exists-with-different-credential") {
      /**
       * TODO: handle the case where user is using an email enrolled in multiple providers (google, github)
       * Moot if not implementing multiple provider login. As of now, we only accept Google as external provider.
       */
      const methods: string[] = await fetchSignInMethodsForEmail(auth, e.email)
      const providerKey = methods[0].split('.')[0]

      if (providerKey === 'google') {

        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);

      }

    } else {

      console.log(e);

    }

  }

  return {success: _success, credential: cred};
}

const signInWithGithub = async () => {
  return authenticate(new GithubAuthProvider());
}

const signInWithGoogle = async () => {
  return authenticate(new GoogleAuthProvider());
}

export {
  signInWithGithub,
  signInWithGoogle
}
