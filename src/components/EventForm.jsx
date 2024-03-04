/* eslint-disable react/prop-types */
import { Form, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';

function EventForm({ method, event }) {
  console.log(event);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState('');

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate('..');
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form method={method} className={classes.form} encType="multipart/form-data">
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
        />
        <img width={100} src={imageUrl || event?.image} alt={event?.title} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
