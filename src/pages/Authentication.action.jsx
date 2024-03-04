import { redirect } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const action = async({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw JSON.parse(JSON.stringify({ message: 'Unsupported mode.' }))
  }

  const data = await request.formData();
  let signInMethod = data.get("signIn");
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    if (mode === 'login') {
      if (signInMethod==='emailPassword') {
        const userData = await signInWithEmailAndPassword(auth, authData.email, authData.password);
        localStorage.setItem('user', JSON.stringify(userData.user))
        return redirect('/')
      } else if (signInMethod==='google') {
        const userData = await signInWithPopup(auth, googleProvider)
        localStorage.setItem('user', JSON.stringify(userData.user))
        return redirect('/')
      }
    } else if (mode === 'signup') {
      await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      return redirect('/')
    }
  } catch (err) {
    const errorObject = JSON.parse(JSON.stringify(err));
    if(errorObject.code === 'auth/popup-closed-by-user'){
      console.log(errorObject);
    } else {
      throw errorObject;
    }
  }

  return null;
}
