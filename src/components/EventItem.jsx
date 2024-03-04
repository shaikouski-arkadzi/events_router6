/* eslint-disable react/prop-types */
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();
  const userData = useRouteLoaderData('root');

  const startDeleteHandler = () => {
    submit(null, { method: 'delete' });
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {event.userId === userData?.uid && 
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      }
    </article>
  );
}

export default EventItem;