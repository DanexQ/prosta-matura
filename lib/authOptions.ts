import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextAuthOptions } from "next-auth";
import { firebaseConfig } from "@firebase";
import { initializeApp } from "firebase/app";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null;
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials?.email as string,
          credentials?.password as string
        );
        const { uid: id, displayName: name, ...currentUser } = user;
        if (user) return { id, name, ...currentUser };
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.userId;
      return session;
    },
  },
};
