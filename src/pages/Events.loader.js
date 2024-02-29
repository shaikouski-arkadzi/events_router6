import { defer } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const loadEvents = async() => {
  try {
    const collectionRef = collection(db, 'events')
    const response = await getDocs(collectionRef);
    const filteredData = response.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
    return filteredData;
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};