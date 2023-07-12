"use client";
import { db } from "@firebase";
import { CompletedTasksList } from "@customTypes/completedTasksTypes";
import { doc, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ExamType, ExamYear } from "@customTypes/examTypes";

type ExamTasksCounterHook = {
  examType: ExamType;
  examYear: ExamYear;
};

export const useExamTasksCounter = ({
  examType,
  examYear,
}: ExamTasksCounterHook) => {
  const [tasksCounter, setTasksCounter] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    const id = session?.user.id;
    if (!id) return;
    const unsub = onSnapshot(doc(db, "completedTasks", id), (doc) => {
      const { completedTasks } = doc.data() as {
        completedTasks: CompletedTasksList;
      };
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
