import { useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';

function EventDetailPage() {
  //данные с какого loader по данному id мы хотим забрать
  const data = useRouteLoaderData('event-detail');

  return (
    <EventItem event={data} />
  );
}

export default EventDetailPage;