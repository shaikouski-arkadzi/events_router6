import axios from 'axios';

export const loader = async() => {
  const response = await axios.get('https://advance-react-max-default-rtdb.europe-west1.firebasedatabase.app/events');

  if (!response.ok) {
    // ...
  } else {
    return response.data.events;
  }
}
