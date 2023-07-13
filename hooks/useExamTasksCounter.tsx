"use client";
import { db } from "@firebase";
import { CompletedTasksData } from "@customTypes/completedTasksTypes";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Exam } from "@customTypes/examTypes";
/**
 * Returns number of completed tasks from particular Exam in [examYear]>page
 */
export const useExamTasksCounter = ({ examType, examYear }: Exam) => {
  const [tasksCounter, setTasksCounter] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    const id = session?.user.id;
    if (!id) return;
    const unsub = onSnapshot(doc(db, "completedTasks", id), (doc) => {
      const { completedTasks } = doc.data() as CompletedTasksData;
      const completedTasksCounter = completedTasks.filter(
        (completedTask) =>
          completedTask.examYear === examYear &&
          completedTask.examType === examType
      ).length;
      setTasksCounter(completedTasksCounter);
    });

    return () => {
      unsub();
    };
  }, [session?.user.id, examType, examYear]);

  return { tasksCounter };
};
