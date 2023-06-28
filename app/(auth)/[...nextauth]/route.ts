import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import firebase_app, { auth, db } from "@firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firestore } from "@firebase";
import { cert } from "firebase-admin/app";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Logowanie",
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
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),
};
