import NextAuth from "next-auth"

import Apple from "next-auth/providers/apple"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"
import Pinterest from "next-auth/providers/pinterest"
import type { NextAuthConfig } from "next-auth"

export const providers = [
  Google,
  Facebook,
  Apple,
  LinkedIn,
  GitHub,
  Pinterest,
];

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    //logo: "http://localhost//logo/logo-sm.png",
  },
  providers,
  pages: {
    //signIn: '/auth/signin',
    //signOut: '/auth/signout',
    //newUser: '/auth/signup',
    //error: '/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  callbacks: {
    
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut, } = NextAuth(config);
export default config;
