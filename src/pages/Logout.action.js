import { signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { auth } from '../firebase';

export const action = async() => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
    return redirect('/');
  } catch (error) {
    throw JSON.parse(JSON.stringify(error));
  }
}