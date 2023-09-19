"use server";
import { revalidatePath } from "next/cache";

export const revPath = (path: string) => {
  revalidatePath(process.env.BASE_URL + path);
};
