import { redirect } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const action = async({ request, params }) => {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  try {
    const collectionRef = collection(db, 'events')
    await addDoc(collectionRef, eventData);
    return redirect('/events');
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}