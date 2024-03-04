import { auth } from "../firebase";

export const loader = () => {
  return auth?.currentUser;
};
