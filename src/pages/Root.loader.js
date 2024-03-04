import { auth } from "../firebase";

export const loader = () => {
  return JSON.parse(localStorage.getItem('user'));
};
