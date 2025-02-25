import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (nickname: string) => {
  const userInfo = await signInAnonymously(auth);
  const user = userInfo.user;

  if (!nickname) {
    throw new Error("Enter a nickname first");
  }

  await updateProfile(user, {
    displayName: nickname,
  });
};
