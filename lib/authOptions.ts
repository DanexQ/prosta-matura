import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextAuthOptions } from "next-auth";
import app, { firebaseConfig } from "@firebase";
import { initializeApp } from "firebase/app";

// const firestore = initFirestore(app);

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
        const { uid: id, ...currentUser } = user;
        if (user) return { id, ...currentUser };
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  //   adapter: FirestoreAdapter(firestore) as Adapter,
};
