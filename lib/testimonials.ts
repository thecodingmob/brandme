import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
  avatar?: string;
  order?: number;
  createdAt?: Timestamp | Date;
}

const COLLECTION_NAME = "testimonials";

// Fetch all testimonials in display order.
export async function getTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      name: data.name ?? "",
      role: data.role ?? "",
      company: data.company,
      quote: data.quote ?? "",
      rating: data.rating ?? 5,
      avatar: data.avatar,
      order: data.order ?? 0,
      createdAt: data.createdAt?.toDate?.() ?? data.createdAt,
    };
  });
}

// Add a new testimonial
export async function addTestimonial(data: Omit<Testimonial, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// Update an existing testimonial
export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a testimonial
export async function deleteTestimonial(id: string) {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
}
