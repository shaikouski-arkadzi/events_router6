import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import NewsletterPage from './pages/Newsletter';
//import AuthenticationPage from './pages/Authentication';
import { loader as eventsLoader } from './pages/Events.loader';
import { loader as eventDetailLoader } from './pages/EventDetail.loader';
import { loader as rootLoader } from './pages/Root.loader';
import { loader as eventFormLoader } from './components/EventForm.loader';
import { action as eventDetailAction } from './pages/EventDetail.action';
import { action as formAction } from './components/EventForm.action';
import { action as newsletterAction } from './pages/NewsletterPage.action';
//import { action as authenticationAction } from './pages/Authentication.action';
import { action as logoutAction } from './pages/Logout.action';

const AuthenticationPage = lazy(() => import('./pages/Authentication'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader,
    id: 'root',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            //используется чтоб дочерние route могли использовать родительский loader
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailAction
              },
              { 
                path: 'edit',
                element: <EditEventPage />,
                action: formAction,
                loader: eventFormLoader
              },
            ],
          },
          { 
            path: 'new',
            element: <NewEventPage />,
            action: formAction,
            loader: eventFormLoader
          },
        ],
      },
      {
        path: 'auth',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AuthenticationPage />
          </Suspense>
        ),
        action: (param) =>
          import('./pages/Authentication.action').then((module) => module.loader(param)),
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;