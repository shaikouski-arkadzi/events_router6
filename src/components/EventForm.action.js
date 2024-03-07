import { redirect } from 'react-router-dom';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../firebase';

export const action = async({ request, params }) => {
  const data = await request.formData();
  console.log(data.get('file'), data.get('image'));
  const file = data.get('file');
  
  const eventData = {
    title: data.get('title'),
    date: data.get('date'),
    description: data.get('description'),
    userId: auth?.currentUser?.uid
  };

  try {
    const method = request.method;
    if(method === 'POST') {
      const fileRef = ref(storage, `events/${file.name}`);
      const uploadFile = await uploadBytes(fileRef, file);
      const collectionRef = collection(db, 'events');
      const newData = {...eventData, image: uploadFile.metadata.fullPath};
      await addDoc(collectionRef, newData);
      return redirect('/events');
    }
    if(method === 'PATCH') {
      let newData;
      if(file.name === '') {
        newData = {...eventData, image: data.get('image')};
      } else {
        const fileRef = ref(storage, `events/${file.name}`);
        const uploadFile = await uploadBytes(fileRef, file);
        newData = {...eventData, image: uploadFile.metadata.fullPath};
        console.log(newData);
      }
      const docRef = doc(db, 'events', params.eventId);
      await updateDoc(docRef, newData);
      return redirect('..');
    }
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}