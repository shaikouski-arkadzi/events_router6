import { redirect } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
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
    const method = request.method;
    if(method === 'POST') {
      const collectionRef = collection(db, 'events')
      await addDoc(collectionRef, eventData);
      return redirect('/events');
    }
    if(method === 'PATCH') {
      const docRef = doc(db, 'events', params.eventId);
      await updateDoc(docRef, eventData)
      return redirect('..');
    }
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}