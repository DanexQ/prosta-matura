import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import app, { auth, db } from "@firebase";
import { Adapter } from "next-auth/adapters";
import { authOptions } from "@lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
