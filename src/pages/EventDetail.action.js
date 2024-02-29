import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { redirect } from 'react-router-dom';

export const action = async({params}) => {
  const id = params.eventId;
  try {
    const docRef = doc(db, 'events', id)
    await deleteDoc(docRef);
    return redirect('/events')
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}