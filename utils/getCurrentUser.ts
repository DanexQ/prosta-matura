import { auth } from "@firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export const getCurrentUser = () => {
  let currentUser: User | null = null;
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
  });
  console.log(currentUser);
  return currentUser;
};
