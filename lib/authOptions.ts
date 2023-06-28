import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextAuthOptions } from "next-auth";
import app, { auth } from "@firebase";
import { Adapter } from "next-auth/adapters";

const firestore = initFirestore(app);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) return null;
        const { user } = await signInWithEmailAndPassword(
          auth,
          credentials?.email!,
          credentials?.password!
        );
        const { uid: id, ...currentUser } = user;
        if (user) return { id, ...currentUser };
        return null;
      },
    }),
  ],
  //   adapter: FirestoreAdapter(firestore) as Adapter,
};
