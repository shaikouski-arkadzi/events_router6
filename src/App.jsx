import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import {loader as eventsLoader} from './pages/Events.loader';
import {loader as eventDetailLoader} from './pages/EventDetail.loader';
import {action as eventDetailAction} from './pages/EventDetail.action';
import {action as formAction} from './components/EventForm.action';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
                action: formAction 
              },
            ],
          },
          { 
            path: 'new',
            element: <NewEventPage />,
            action: formAction
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;