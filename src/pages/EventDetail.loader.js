import { getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const loader = async({request, params}) => {
  const id = params.eventId;
  try {
    const docRef = doc(db, 'events', id)
    const response = await getDoc(docRef);
    const data = response.data();
    const imageRef = ref(storage, data.image);
    const image = await getDownloadURL(imageRef)
    
    return { 
      ...response.data(),
      id: response.id, 
      image
    }
  } catch (err) {
    throw JSON.parse(JSON.stringify(err))
  }
}