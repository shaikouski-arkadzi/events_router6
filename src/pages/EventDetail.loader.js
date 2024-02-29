import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const loader = async({request, params}) => {
  const id = params.eventId;
  try {
    const docRef = doc(db, 'events', id)
    const response = await getDoc(docRef);
    return { 
      id: response.id, 
      ...response.data() 
    }
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}