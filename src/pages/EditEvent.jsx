import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  //данные с какого loader по данному id мы хотим забрать
  const data = useRouteLoaderData('event-detail');

  return <EventForm method='patch' event={data} />;
}

export default EditEventPage;