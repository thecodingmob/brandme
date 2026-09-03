import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  writeBatch, 
  serverTimestamp 
} from "firebase/firestore";

export interface Project {
  id?: string;
  title: string;
  category: 'Business' | 'E-Learning' | 'Industrial' | string;
  description: string;
  image: string; // Cloudinary secure URL or local fallback path
  codeUrl: string;
  liveUrl: string;
  tags: string[];
  order: number;
}

/**
 * Uploads an image file directly to Cloudinary using an unsigned upload preset.
 * Returns the public HTTPS URL to store in Firestore.
 */
export async function uploadImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary environment variables missing. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
}

/**
 * Fetches all projects from Firestore sorted by their display order.
 */
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  })) as Project[];
}

/**
 * Creates a new project document in Firestore.
 */
export async function addProject(project: Omit<Project, "id">) {
  return await addDoc(collection(db, "projects"), {
    ...project,
    createdAt: serverTimestamp(),
  });
}

/**
 * Updates an existing project document in Firestore.
 */
export async function updateProject(id: string, data: Partial<Project>) {
  const docRef = doc(db, "projects", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a project document from Firestore.
 */
export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projects", id));
}

/**
 * Atomically updates the order field of multiple projects in a single batch operation.
 */
export async function reorderProjects(projects: { id: string; order: number }[]) {
  const batch = writeBatch(db);
  projects.forEach(({ id, order }) => {
    const docRef = doc(db, "projects", id);
    batch.update(docRef, { order });
  });
  await batch.commit();
}