import { useNavigate, useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = error.name || 'An error occurred!';
  let message = error.message || 'Something went wrong!';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  if (error?.name === 'FirebaseError'){
    title = error.name;
    message = error.code;
  }

  const handleBack = () => {
    navigate('..')
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
      <button onClick={handleBack}>Назад</button>
    </PageContent>
  );
}

export default ErrorPage;