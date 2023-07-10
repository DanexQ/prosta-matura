import { TaskProps } from "@customTypes/taskTypes";
import { db, storage } from "@firebase";
import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addTask = async (task: TaskProps, image?: File) => {
  try {
    const jsonTask = !!image ? sendTaskWithImage(task, image) : sendTask(task);
    const typeRef = doc(db, "taskTypes", task.taskType);
    await updateDoc(typeRef, { quantity: increment(1) });
    alert("Task uploaded successfully");
    return jsonTask;
  } catch (err) {
    alert(err);
  }
};

async function sendTaskWithImage(task: TaskProps, image: File) {
  const taskImageRef = ref(storage, `taskImages/${v4()}`);
  const snapshot = await uploadBytes(taskImageRef, image);
  const imageUrl = await getDownloadURL(snapshot.ref);
  const modifiedTask = sendTask({ ...task, imageUrl });
  return modifiedTask;
}

async function sendTask(task: TaskProps) {
  const newTaskRef = doc(collection(db, "tasks"));
  const newTask = { ...task, taskId: newTaskRef.id };
  await setDoc(newTaskRef, newTask);
  return newTask;
}
