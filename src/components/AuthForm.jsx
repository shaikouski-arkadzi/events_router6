import { Form, Link, useSearchParams, useNavigation } from 'react-router-dom';

import { GoogleIcon } from '../assets'
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"  />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password"  />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button name='signIn' value='emailPassword' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Sign In'}
          </button>
          <button name='signIn' value='google' className={classes.googleButton}>
            <GoogleIcon className={classes.googleIcon} />
            Sign In with Google
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;