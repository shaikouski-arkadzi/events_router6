import { redirect } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const action = async({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw JSON.parse(JSON.stringify({ message: 'Unsupported mode.' }))
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    await createUserWithEmailAndPassword(auth, authData.email, authData.password);
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }

  // TODO: manage that token
  return redirect('/');
}
