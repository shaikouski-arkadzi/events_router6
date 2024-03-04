import { redirect } from "react-router-dom";

export const loader = () => {
  const user = localStorage.getItem('user');

  if (!user) {
    return redirect('/auth');
  } else return null;
};
